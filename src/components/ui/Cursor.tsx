"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.25 });
  const enabled = useMediaQuery("(pointer: fine)");
  const [hot, setHot] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHot(
        !!el?.closest?.('a, button, [role="button"], input, textarea, [data-hot]')
      );
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{ x, y }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200"
          style={{
            width: hot ? 6 : 5,
            height: hot ? 6 : 5,
            background: "var(--accent)",
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border"
          animate={{
            width: hot ? 46 : 26,
            height: hot ? 46 : 26,
            borderColor: hot ? "var(--accent)" : "var(--line-3)",
            backgroundColor: hot ? "var(--accent-dim)" : "rgba(0, 0, 0, 0)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </motion.div>
    </>
  );
}
