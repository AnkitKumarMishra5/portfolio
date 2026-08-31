"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Scenario, TermLine } from "@/lib/data";
import { useMediaQuery } from "@/lib/useMediaQuery";

const TYPE_MS = 34;
const LINE_MS = 320;
const START_MS = 420;

function StepRow({ line }: { line: Extract<TermLine, { kind: "step" }> }) {
  const ok = line.tone === "ok";
  return (
    <div className="flex items-end gap-2">
      <span className="text-ink-3">{line.label}</span>
      <span className="term-leader" aria-hidden />
      <span className={ok ? "text-success-ink" : "text-accent-ink"}>
        {ok ? "✓ " : ""}
        {line.value}
      </span>
    </div>
  );
}

function Row({ line }: { line: TermLine }) {
  if (line.kind === "cmd") {
    return (
      <div className="flex gap-2">
        <span className="shrink-0 select-none text-success-ink">❯</span>
        <span className="text-ink">{line.text}</span>
      </div>
    );
  }
  if (line.kind === "sub") {
    return <div className="pl-4 text-ink-4">{line.text}</div>;
  }
  if (line.kind === "done") {
    return (
      <div className="mt-1 flex items-center gap-2">
        <span className="rounded bg-success-dim px-1.5 py-0.5 text-[10.5px] uppercase tracking-wider text-success-ink">
          done
        </span>
        <span className="text-ink-2">{line.text}</span>
      </div>
    );
  }
  return <StepRow line={line} />;
}

function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg className={`spinner ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Terminal({
  scenario,
  className = "",
}: {
  scenario: Scenario;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { amount: 0.35 });
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  const cmd = scenario.lines[0].kind === "cmd" ? scenario.lines[0].text : "";
  const body = useMemo(() => scenario.lines.slice(1), [scenario.lines]);

  const [typedCount, setTypedCount] = useState(0);
  const [shownCount, setShownCount] = useState(0);
  const [running, setRunning] = useState(false);

  const typed = reduced ? cmd : cmd.slice(0, typedCount);
  const shown = reduced ? body.length : shownCount;
  const stillTyping = !reduced && typedCount < cmd.length;

  useEffect(() => {
    if (reduced || !inView) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 1; i <= cmd.length; i++) {
      timers.push(setTimeout(() => setTypedCount(i), START_MS + i * TYPE_MS));
    }

    const afterCmd = START_MS + cmd.length * TYPE_MS;
    timers.push(setTimeout(() => setRunning(true), afterCmd));

    body.forEach((_, idx) => {
      timers.push(
        setTimeout(() => {
          setShownCount(idx + 1);
          if (idx === body.length - 1) setRunning(false);
        }, afterCmd + 160 + idx * LINE_MS)
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [cmd, body, inView, reduced]);

  return (
    <div
      ref={wrapRef}
      className={`term-shell card card-hair overflow-hidden ${className}`}
      role="img"
      aria-label={`Illustrative terminal walkthrough: ${scenario.title}`}
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface-2/70 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-ink-4/45" />
          <span className="size-2.5 rounded-full bg-ink-4/45" />
          <span className="size-2.5 rounded-full bg-ink-4/45" />
        </span>
        <span className="mono ml-2 truncate text-[11px] text-ink-4">
          {scenario.id}.session
        </span>
        <span className="ml-auto flex items-center gap-2">
          {running ? <Spinner className="size-3 text-accent-ink" /> : null}
          <span className="mono rounded border border-line-2 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.14em] text-ink-4">
            illustrative
          </span>
        </span>
      </div>

      <div className="mono min-h-[286px] space-y-[7px] p-5 text-[12.5px] leading-[1.75] sm:min-h-[300px] sm:text-[13px]">
        <div className="flex gap-2">
          <span className="shrink-0 select-none text-success-ink">❯</span>
          <span className="text-ink">
            {typed}
            {stillTyping ? <span className="caret text-accent-ink">▍</span> : null}
          </span>
        </div>

        <AnimatePresence initial={false}>
          {body.slice(0, shown).map((line, i) => (
            <motion.div
              key={i}
              initial={reduced ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <Row line={line} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
