"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { agentTranscript, person, sourceFiles } from "@/lib/data";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

type AgentLine = {
  role: "user" | "think" | "tool" | "agent" | "done";
  text: string;
  streaming?: boolean;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-3 shrink-0 text-ink-4 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function JsonLine({ line }: { line: string }) {
  const parts = line.split(/("(?:[^"\\]|\\.)*")/g);
  return (
    <>
      {parts.map((part, i) => {
        if (!part.startsWith('"')) {
          return (
            <span key={i} className="text-ink-4">
              {part}
            </span>
          );
        }
        const isKey = (parts[i + 1] ?? "").trimStart().startsWith(":");
        return (
          <span key={i} className={isKey ? "text-accent-ink" : "text-success-ink"}>
            {part}
          </span>
        );
      })}
    </>
  );
}

function AgentMessage({ line }: { line: AgentLine }) {
  if (line.role === "user") {
    return (
      <p className="text-ink">
        <span className="text-accent-ink">❯ </span>
        {line.text}
      </p>
    );
  }
  if (line.role === "tool") {
    return <p className="text-success-ink">· {line.text}</p>;
  }
  if (line.role === "done") {
    return <p className="text-ink-4">{line.text}</p>;
  }
  return (
    <p className="whitespace-pre-wrap text-ink-3">
      {line.text}
      {line.streaming ? <span className="caret text-accent-ink">▍</span> : null}
    </p>
  );
}

function AgentPanel({ className = "" }: { className?: string }) {
  const [lines, setLines] = useState<AgentLine[]>(() => [...agentTranscript] as AgentLine[]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const interacted = useRef(false);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    if (!interacted.current) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const ask = async (q: string) => {
    const trimmed = q.trim().slice(0, 300);
    if (!trimmed || busy) return;
    interacted.current = true;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setDraft("");
    setBusy(true);
    setLines((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      { role: "think", text: "Grounding in the facts on this page ..." },
    ]);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
        signal: controller.signal,
      });

      // swap the thinking line for a tool line, then stream the answer in
      setLines((prev) => [
        ...prev.slice(0, -1),
        { role: "tool", text: "read src/lib/data.ts" },
        { role: "agent", text: "", streaming: true },
      ]);

      if (!res.body) {
        const text = await res.text();
        setLines((prev) => [
          ...prev.slice(0, -1),
          { role: "agent", text },
          { role: "done", text: "Done." },
        ]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setLines((prev) => {
          const last = prev[prev.length - 1];
          return [
            ...prev.slice(0, -1),
            { ...last, text: last.text + chunk, streaming: true },
          ];
        });
      }
      setLines((prev) => {
        const last = prev[prev.length - 1];
        return [
          ...prev.slice(0, -1),
          { ...last, streaming: false },
          { role: "done", text: "Done. Grounded in this page." },
        ];
      });
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setLines((prev) => {
          const last = prev[prev.length - 1];
          const base =
            last?.role === "think" || last?.streaming ? prev.slice(0, -1) : prev;
          return [
            ...base,
            {
              role: "agent",
              text: `I could not reach the assistant just now. Email me at ${person.email} and I will answer it myself.`,
            },
          ];
        });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`min-w-0 flex-col ${className}`}>
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="live-dot size-1.5 rounded-full bg-accent" />
        <span className="mono text-[10.5px] text-ink-3">agent</span>
        <span className="mono ml-auto rounded border border-line-2 px-1.5 py-0.5 text-[9px] text-ink-4">
          live
        </span>
      </div>
      <div
        ref={scrollRef}
        className="max-h-[420px] min-h-0 flex-1 space-y-3 overflow-y-auto p-3 lg:max-h-none"
      >
        {lines.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, delay: interacted.current ? 0 : Math.min(i * 0.09, 1.1), ease: EASE }}
            className="mono text-[10.5px] leading-[1.6]"
          >
            <AgentMessage line={t as AgentLine} />
          </motion.div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(draft);
        }}
        className="flex items-center gap-2 border-t border-line px-3 py-2"
      >
        <span className="mono text-[11px] text-accent-ink" aria-hidden>
          ❯
        </span>
        <label htmlFor="agent-input" className="sr-only">
          Ask the agent about Ankit&apos;s work
        </label>
        <input
          id="agent-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={300}
          placeholder={busy ? "thinking ..." : "ask about the work ..."}
          disabled={busy}
          className="mono min-w-0 flex-1 bg-transparent text-[11px] text-ink outline-none placeholder:text-ink-4 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={busy || !draft.trim()}
          className="mono rounded border border-line-2 px-2 py-1 text-[9.5px] uppercase tracking-wider text-ink-3 transition-colors hover:border-line-3 hover:text-ink disabled:opacity-40"
        >
          run
        </button>
      </form>
    </div>
  );
}

export function SourceExplorer() {
  const [active, setActive] = useState(0);
  const [pane, setPane] = useState<"code" | "agent">("code");
  const [open, setOpen] = useState<Record<string, boolean>>({
    profile: true,
    work: true,
    projects: true,
    teaching: true,
    stack: true,
  });

  const folders = useMemo(() => {
    const map = new Map<string, typeof sourceFiles>();
    const root: typeof sourceFiles = [];
    sourceFiles.forEach((f) => {
      if (!f.folder) return root.push(f);
      if (!map.has(f.folder)) map.set(f.folder, []);
      map.get(f.folder)!.push(f);
    });
    return { map, root };
  }, []);

  const file = sourceFiles[active];
  const lines = file.code.split("\n");
  const path = file.folder ? `${file.folder}/${file.name}` : file.name;
  const showCode = pane === "code";

  const FileRow = ({ f, nested }: { f: (typeof sourceFiles)[number]; nested: boolean }) => {
    const i = sourceFiles.indexOf(f);
    const isActive = i === active;
    return (
      <button
        onClick={() => {
          setActive(i);
          setPane("code");
        }}
        aria-current={isActive ? "true" : undefined}
        className={`mono flex min-h-[34px] w-full items-center gap-2 rounded-md px-2 text-left text-[11.5px] transition-colors duration-200 ${
          nested ? "lg:pl-6" : ""
        } ${isActive ? "bg-surface-3/85 text-ink" : "text-ink-3 hover:bg-surface-3/40 hover:text-ink-2"}`}
      >
        <span className="text-[8px] text-success-ink">{"{ }"}</span>
        {f.name}
      </button>
    );
  };

  return (
    <Section id="source">
      <SectionHeading
        index="05"
        kicker="Source"
        title="If you would rather read"
        accent="the JSON."
        intro="Everything on this page, as the JSON I keep it in. Click around the tree, watch the terminal, and if you want to ask something, the agent panel is live."
      />

      <Reveal y={28} className="mt-12">
        <div className="term-shell card card-hair overflow-hidden">
          <div className="flex items-center gap-2 border-b border-line bg-surface-2/70 px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-ink-4/45" />
              <span className="size-2.5 rounded-full bg-ink-4/45" />
              <span className="size-2.5 rounded-full bg-ink-4/45" />
            </span>
            <span className="mono mx-auto hidden truncate text-[11px] text-ink-3 sm:block">
              ankitkumarmishra
            </span>
            {/* mobile pane switch; on lg both panes are visible side by side */}
            <div className="ml-auto flex gap-1 sm:ml-0 lg:hidden">
              {(["code", "agent"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPane(p)}
                  className={`mono rounded border px-1.5 py-0.5 text-[9px] uppercase tracking-wider transition-colors ${
                    pane === p
                      ? "border-accent/40 bg-accent-dim text-accent-ink"
                      : "border-line-2 text-ink-4"
                  }`}
                >
                  {p === "code" ? "Editor" : "Agent"}
                </button>
              ))}
            </div>
            <span className="mono hidden rounded border border-line-2 px-1.5 py-0.5 text-[9px] text-ink-4 lg:inline">
              Agent
            </span>
          </div>

          <div className="grid lg:grid-cols-[190px_1fr_280px]">
            {/* explorer */}
            <div
              className={`min-w-0 border-b border-line p-2 lg:border-b-0 lg:border-r ${showCode ? "" : "hidden lg:block"}`}
            >
              <p className="label px-2 pb-2 pt-1 text-[9px]">Explorer</p>
              <div className="flex min-w-0 gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
                {[...folders.map.entries()].map(([name, files]) => (
                  <div key={name} className="flex shrink-0 gap-1 lg:block lg:shrink">
                    <button
                      onClick={() => setOpen((o) => ({ ...o, [name]: !o[name] }))}
                      className="mono hidden min-h-[34px] w-full items-center gap-1.5 rounded-md px-2 text-[11.5px] text-ink-2 transition-colors hover:bg-surface-3/40 lg:flex"
                    >
                      <Chevron open={!!open[name]} />
                      <span className="text-[10px] text-accent-ink">▸</span>
                      {name}
                    </button>
                    {files.map((f) => (
                      <span key={f.name} className={`shrink-0 lg:block ${open[name] ? "" : "lg:hidden"}`}>
                        <FileRow f={f} nested />
                      </span>
                    ))}
                  </div>
                ))}
                {folders.root.map((f) => (
                  <span key={f.name} className="shrink-0 lg:block">
                    <FileRow f={f} nested={false} />
                  </span>
                ))}
              </div>
            </div>

            {/* editor group: code on top, terminal docked below, like an IDE */}
            <div className={`min-w-0 flex-col ${showCode ? "flex" : "hidden lg:flex"}`}>
              <div className="flex items-center gap-2 border-b border-line px-4 py-2">
                <span className="mono truncate text-[11px] text-ink-3">{path}</span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={path}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.26, ease: EASE }}
                  className="flex-1"
                >
                  <div className="mono flex min-h-[240px] gap-4 overflow-x-auto p-4 text-[11.5px] leading-[1.75] sm:text-[12.5px]">
                    <div className="select-none text-right text-ink-4/50">
                      {lines.map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                    <div className="min-w-0">
                      {lines.map((line, i) => (
                        <div key={i} className="whitespace-pre">
                          {line ? <JsonLine line={line} /> : " "}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="border-t border-line px-4 py-3 text-[13px] text-ink-3">
                    {file.blurb}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="border-t border-line">
                <div className="flex items-center gap-4 border-b border-line px-4 py-2">
                  <span className="mono text-[10px] uppercase tracking-[0.14em] text-ink">
                    Terminal
                  </span>
                  <span className="mono hidden text-[10px] uppercase tracking-[0.14em] text-ink-4 sm:inline">
                    Problems
                  </span>
                  <span className="mono hidden text-[10px] uppercase tracking-[0.14em] text-ink-4 sm:inline">
                    Output
                  </span>
                  <span className="mono ml-auto text-[10px] text-ink-4">zsh</span>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`term-${path}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="mono max-h-[190px] overflow-y-auto p-4 text-[11px] leading-[1.7] sm:text-[11.5px]"
                  >
                <p className="mb-1 break-words">
                  <span className="text-success-ink">ankit@macbook</span>
                  <span className="text-ink-4"> % </span>
                  <span className="text-ink">{file.cmd}</span>
                </p>
                {file.out.map((line, i) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.12 + i * 0.07 }}
                    className="whitespace-pre-wrap text-ink-3"
                  >
                    {line}
                  </motion.p>
                ))}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.12 + file.out.length * 0.07 }}
                  className="mt-1"
                >
                  <span className="text-success-ink">ankit@macbook</span>
                  <span className="text-ink-4"> % </span>
                  <span className="caret text-accent-ink">▍</span>
                </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* agent panel: a pane on mobile, a sidebar on lg+ */}
            <AgentPanel
              className={`${showCode ? "hidden" : "flex"} lg:flex lg:border-l lg:border-line`}
            />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
