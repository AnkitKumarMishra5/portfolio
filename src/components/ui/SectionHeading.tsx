"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { WordsUp } from "./TextReveal";
import { Scramble } from "./Scramble";

const EASE = [0.16, 1, 0.3, 1] as const;

export function SectionHeading({
  index,
  kicker,
  title,
  accent,
  intro,
  align = "left",
  className = "",
}: {
  index: string;
  kicker: string;
  title: string;
  accent?: string;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-3xl"} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`mb-5 flex items-center gap-3 ${centered ? "justify-center" : ""}`}
      >
        <span className="mono text-[11px] text-accent-ink">{index}</span>
        <span className="h-px w-8 bg-line-2" />
        <Scramble text={kicker} className="label" />
      </motion.div>

      <h2 className="h-display text-[clamp(2.1rem,5vw,3.6rem)] text-ink">
            reads headings without seeing them: search engines building anchor
        <span className="sr-only">{kicker}: </span>
        <WordsUp text={title} />
        {accent ? (
          <>
            {" "}
            <span className="font-display text-accent-ink">
              <WordsUp text={accent} delay={0.12} />
            </span>
          </>
        ) : null}
      </h2>

      {intro ? (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
          className="mt-6 text-pretty text-[16.5px] leading-[1.65] text-ink-2"
        >
          {intro}
        </motion.div>
      ) : null}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 px-6 py-24 sm:py-32 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
