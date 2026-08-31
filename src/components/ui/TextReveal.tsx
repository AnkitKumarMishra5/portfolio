"use client";

import { motion } from "motion/react";
import { Fragment, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

// The in-view trigger must stay on the unclipped parent. On the translated word
// it deadlocks: zero intersection, so the reveal never fires.
export function WordsUp({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.028,
  once = true,
  duration = 0.62,
  amount = 0.12,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  duration?: number;
  amount?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            className="word-mask inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
          >
            <motion.span
              className={`inline-block ${wordClassName ?? ""}`}
              variants={{
                hidden: { y: "112%" },
                show: { y: "0%", transition: { duration, ease: EASE } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {/* Real space, outside the mask: keeps find-on-page and copy intact. */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}

export function LineUp({
  children,
  delay = 0,
  duration = 1.05,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <span
      className="word-mask block overflow-hidden"
      style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
    >
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "112%" }}
        animate={{ y: "0%" }}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}
