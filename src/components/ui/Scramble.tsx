"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>*#";

export function Scramble({
  text,
  className,
  speed = 32,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [shown, setShown] = useState(text);
  const started = useRef(false);

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let timer: ReturnType<typeof setInterval> | null = null;

    const run = () => {
      timer = setInterval(() => {
        frame += 1;
        const settled = Math.floor(frame / 2);
        setShown(
          text
            .split("")
            .map((char, i) => {
              if (i < settled || char === " ") return char;
              return GLYPHS[Math.floor((frame * 7 + i * 13) % GLYPHS.length)];
            })
            .join("")
        );
        if (settled >= text.length && timer) {
          clearInterval(timer);
          timer = null;
          setShown(text);
        }
      }, speed);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          run();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(node);

    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [text, speed, reduced]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{reduced ? text : shown}</span>
    </span>
  );
}
