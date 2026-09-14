"use client";

import { motion } from "motion/react";
import { useMediaQuery } from "@/lib/useMediaQuery";

export function Aurora() {
  const still = useMediaQuery("(pointer: coarse)");
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="blob"
        style={{
          width: 720,
          height: 720,
          left: "-14%",
          top: "-22%",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 26%, transparent), transparent 68%)",
        }}
        animate={still ? { x: 0, y: 0, scale: 1 } : { x: [0, 90, -30, 0], y: [0, 60, 110, 0], scale: [1, 1.12, 0.95, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="blob"
        style={{
          width: 640,
          height: 640,
          right: "-12%",
          top: "4%",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--violet) 34%, transparent), transparent 68%)",
        }}
        animate={still ? { x: 0, y: 0, scale: 1 } : { x: [0, -80, 40, 0], y: [0, 90, -40, 0], scale: [1, 0.92, 1.14, 1] }}
        transition={{ duration: 31, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="blob"
        style={{
          width: 560,
          height: 560,
          left: "36%",
          bottom: "-24%",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--cyan) 22%, transparent), transparent 70%)",
        }}
        animate={still ? { x: 0, y: 0, scale: 1 } : { x: [0, 60, -70, 0], y: [0, -50, 30, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
