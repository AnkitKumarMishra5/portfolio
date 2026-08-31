"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";

export function SpotlightCard({
  children,
  className = "",
  radius = 380,
  tilt = false,
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  const bg = useMotionTemplate`radial-gradient(${radius}px circle at ${mx}px ${my}px, var(--accent-dim), transparent 68%)`;
  const border = useMotionTemplate`radial-gradient(${radius * 0.8}px circle at ${mx}px ${my}px, color-mix(in oklab, var(--accent) 55%, transparent), transparent 72%)`;

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = e.clientX - r.left;
        const py = e.clientY - r.top;
        mx.set(px);
        my.set(py);
        if (tilt && !window.matchMedia("(pointer: coarse)").matches) {
          ry.set(((px - r.width / 2) / r.width) * 9);
          rx.set(-((py - r.height / 2) / r.height) * 9);
        }
      }}
      onPointerLeave={() => {
        mx.set(-9999);
        my.set(-9999);
        rx.set(0);
        ry.set(0);
      }}
      style={
        tilt
          ? { rotateX: rx, rotateY: ry, transformPerspective: 1200 }
          : undefined
      }
      className={`group card relative ${className}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: bg }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: border,
          padding: "1px",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
