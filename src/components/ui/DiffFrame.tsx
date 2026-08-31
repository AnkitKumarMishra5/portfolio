"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { reviewDiff } from "@/lib/data";
import { useMediaQuery } from "@/lib/useMediaQuery";

const EASE = [0.16, 1, 0.3, 1] as const;

const tone: Record<string, string> = {
  add: "bg-success-dim text-success-ink",
  del: "bg-[color-mix(in_oklab,#f0616d_16%,transparent)] text-[#f0929a]",
  ctx: "text-ink-3",
  note: "text-ink-4",
};

const sign: Record<string, string> = { add: "+", del: "-", ctx: " ", note: " " };

export function DiffFrame({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <div
      ref={ref}
      className={`term-shell card card-hair overflow-hidden ${className}`}
      role="img"
      aria-label={`Illustrative code review of ${reviewDiff.file}`}
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface-2/70 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-ink-4/45" />
          <span className="size-2.5 rounded-full bg-ink-4/45" />
          <span className="size-2.5 rounded-full bg-ink-4/45" />
        </span>
        <span className="mono ml-2 truncate text-[11px] text-ink-3">
          {reviewDiff.file}
        </span>
        <span className="ml-auto flex items-center gap-2">
          <span className="mono hidden rounded border border-line-2 px-1.5 py-0.5 text-[9.5px] text-ink-4 sm:block">
            {reviewDiff.branch}
          </span>
          <span className="mono rounded border border-line-2 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.14em] text-ink-4">
            illustrative
          </span>
        </span>
      </div>

      <div className="mono space-y-[3px] p-4 text-[11.5px] leading-[1.7] sm:text-[12px]">
        {reviewDiff.lines.map((line, i) => (
          <motion.div
            key={i}
            initial={reduced ? false : { opacity: 0, x: -6 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.35, delay: 0.25 + i * 0.075, ease: EASE }}
            className={`flex gap-2 rounded px-2 ${tone[line.kind]} ${
              line.kind === "note" ? "mt-2 border-t border-line pt-2.5" : ""
            }`}
          >
            {line.kind === "note" ? (
              <span className="flex items-start gap-2">
                <span className="mt-[3px] grid size-4 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent-dim text-[8px] text-accent-ink">
                  AK
                </span>
                <span className="text-ink-2">{line.text}</span>
              </span>
            ) : (
              <>
                <span aria-hidden className="w-2 shrink-0 opacity-60">
                  {sign[line.kind]}
                </span>
                <span className="whitespace-pre">{line.text || " "}</span>
              </>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-line bg-surface-2/50 px-4 py-2.5">
        <motion.span
          initial={reduced ? false : { scale: 0.85, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.4, delay: 1.15, ease: EASE }}
          className="mono rounded-md border border-accent/40 bg-accent-dim px-2 py-0.5 text-[10px] text-accent-ink"
        >
          changes requested
        </motion.span>
        <span className="mono text-[10.5px] text-ink-4">
          reviewed by a human before merge
        </span>
      </div>
    </div>
  );
}
