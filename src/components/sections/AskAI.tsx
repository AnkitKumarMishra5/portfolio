"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { aiSuggestions, faqs, person } from "@/lib/data";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { IconArrowUpRight, IconMail } from "../ui/Icons";

const EASE = [0.16, 1, 0.3, 1] as const;

const STAGES = [
  "reading the facts on this page",
  "grounding the answer",
  "writing",
];

function Stages({ stage }: { stage: number }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {STAGES.map((label, i) => {
        const done = i < stage;
        const current = i === stage;
        return (
          <motion.span
            key={label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: done || current ? 1 : 0.32, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05, ease: EASE }}
            className={`mono inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] ${
              done
                ? "border-success/35 bg-success-dim text-success-ink"
                : current
                  ? "border-accent/40 bg-accent-dim text-accent-ink"
                  : "border-line text-ink-4"
            }`}
          >
            {done ? (
              <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m4.5 12.5 5 5 10-11" />
              </svg>
            ) : current ? (
              <svg className="spinner size-3" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            ) : (
              <span className="size-1.5 rounded-full bg-current" />
            )}
            {label}
          </motion.span>
        );
      })}
    </div>
  );
}

export function AskAI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState(-1);
  const [asked, setAsked] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const stageTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(
    () => () => {
      abortRef.current?.abort();
      stageTimers.current.forEach(clearTimeout);
    },
    []
  );

  const ask = async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed || busy) return;

    abortRef.current?.abort();
    stageTimers.current.forEach(clearTimeout);
    const controller = new AbortController();
    abortRef.current = controller;

    setAsked(trimmed);
    setQuestion("");
    setAnswer("");
    setBusy(true);
    setStage(0);
    stageTimers.current = [
      setTimeout(() => setStage(1), 420),
      setTimeout(() => setStage(2), 900),
    ];

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-akm-source": "ask" },
        body: JSON.stringify({ question: trimmed }),
        signal: controller.signal,
      });

      if (!res.body) {
        setAnswer(await res.text());
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let first = true;

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        if (first) {
          stageTimers.current.forEach(clearTimeout);
          setStage(3);
          first = false;
        }
        setAnswer((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setAnswer(
          `Something went wrong reaching the assistant. Email me at ${person.email} and I will answer it myself.`
        );
      }
    } finally {
      stageTimers.current.forEach(clearTimeout);
      setStage(3);
      setBusy(false);
    }
  };

  return (
    <Section id="ask">
      <SectionHeading
        index="06"
        kicker="Ask"
        title="Skip the scrolling."
        accent="Ask the page."
        intro="An assistant grounded in the facts on this page, built the way I build them: it answers from a fixed source, it will not invent a number, and when it does not know, it says so."
      />

      <Reveal y={28} className="mt-12">
        <div className="card card-hair relative overflow-hidden">
          <div
            aria-hidden
            className="breathe pointer-events-none absolute -top-24 left-1/2 h-56 w-[60%] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, var(--accent-dim), transparent 70%)",
            }}
          />

          <div className="relative p-6 sm:p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(question);
              }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="ask-input" className="sr-only">
                Ask a question about Ankit&apos;s work
              </label>
              <input
                id="ask-input"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                maxLength={300}
                placeholder="What has he shipped in payments?"
                className="flex-1 rounded-full border border-line-2 bg-surface-2/60 px-5 py-3.5 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-4 focus:border-accent/50"
              />
              <button
                type="submit"
                disabled={busy || !question.trim()}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[14px] font-medium text-on-accent transition-all duration-300 hover:shadow-[0_0_40px_-8px_var(--accent-glow)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
              >
                {busy ? "Thinking" : "Ask"}
                <IconArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </form>

            <div className="mt-4 flex flex-wrap gap-2">
              {aiSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  disabled={busy}
                  className="rounded-full border border-line bg-surface/50 px-3.5 py-1.5 text-[12.5px] text-ink-3 transition-colors duration-300 hover:border-line-3 hover:text-ink disabled:opacity-40"
                >
                  {s}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {stage >= 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="mt-7 border-t border-line pt-6">
                    <p className="mono mb-4 text-[11.5px] text-ink-4">
                      <span className="text-ink-3">asked</span> {asked}
                    </p>

                    {stage < 3 ? <Stages stage={stage} /> : null}

                    {answer ? (
                      <p className="mt-4 max-w-2xl whitespace-pre-wrap text-pretty text-[15.5px] leading-[1.7] text-ink">
                        {answer}
                        {busy ? <span className="stream-caret" /> : null}
                      </p>
                    ) : null}

                    {!busy && answer ? (
                      <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-line pt-4">
                        <span className="mono text-[11px] text-ink-4">
                          grounded in this page, not the open web
                        </span>
                        <a
                          href={`mailto:${person.email}`}
                          className="group inline-flex items-center gap-1.5 text-[13px] text-accent-ink"
                        >
                          <IconMail className="size-3.5" />
                          <span className="link-sweep">Ask me directly</span>
                        </a>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>

      <Reveal y={24} className="mt-14">
        <div className="mb-6 flex items-baseline gap-3">
          <span className="label">Answered already</span>
          <span className="h-px flex-1 bg-line" />
        </div>
        <div className="grid gap-x-12 sm:grid-cols-2">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-4 text-[15px] text-ink transition-colors hover:text-accent-ink [&::-webkit-details-marker]:hidden">
                <span className="text-pretty">{f.q}</span>
                <span
                  aria-hidden
                  className="relative grid size-5 shrink-0 place-items-center rounded-full border border-line-2 text-ink-3 transition-colors group-open:border-accent group-open:text-accent-ink"
                >
                  <span className="absolute h-px w-2 bg-current" />
                  <span className="absolute h-2 w-px bg-current transition-opacity group-open:opacity-0" />
                </span>
              </summary>
              <p className="max-w-prose pb-5 text-pretty text-[14.5px] leading-[1.7] text-ink-3">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
