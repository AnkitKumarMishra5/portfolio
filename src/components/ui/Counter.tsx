"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function Counter({
  to,
  from = 0,
  duration = 1.9,
  prefix = "",
  suffix = "",
  className,
  format = true,
}: {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  format?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, from, to, duration]);

  const rounded = Math.round(value);
  const display = format ? rounded.toLocaleString("en-US") : String(rounded);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
