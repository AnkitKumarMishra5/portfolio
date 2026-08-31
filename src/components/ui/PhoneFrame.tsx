"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function PhoneFrame({
  src,
  alt,
  label,
  className = "",
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: -3 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE }}
      whileHover={{ rotate: 0, y: -6 }}
      className={`group/phone ${className}`}
    >
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[3rem] opacity-0 blur-3xl transition-opacity duration-700 group-hover/phone:opacity-70"
        style={{
          background:
            "radial-gradient(55% 55% at 50% 50%, var(--accent-dim), transparent 70%)",
        }}
      />

      <div className="relative rounded-[2.2rem] border border-line-2 bg-surface-3 p-[7px] shadow-[0_40px_80px_-45px_rgba(2,6,20,0.95)]">
        <div className="relative overflow-hidden rounded-[1.8rem] bg-bg-deep">
          <span
            aria-hidden
            className="absolute left-1/2 top-2 z-10 h-[18px] w-[86px] -translate-x-1/2 rounded-full bg-bg-deep"
          />
          <Image
            src={src}
            alt={alt}
            width={416}
            height={900}
            sizes="(max-width: 1024px) 60vw, 260px"
            className="h-auto w-full"
          />
        </div>
      </div>

      {label ? (
        <span className="mono absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line-2 bg-surface px-3 py-1 text-[10px] text-ink-3">
          {label}
        </span>
      ) : null}
    </motion.div>
  );
}
