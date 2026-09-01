"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { scenarios } from "@/lib/data";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { Terminal } from "../ui/Terminal";
import { Reveal } from "../ui/Reveal";
import { SectionTexture } from "../ui/SectionTexture";

const EASE = [0.16, 1, 0.3, 1] as const;
const DWELL_MS = 9500;

export function LiveSystems() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!auto) return;
    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setInterval> | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timer) {
          timer = setInterval(
            () => setActive((i) => (i + 1) % scenarios.length),
            DWELL_MS
          );
        } else if (!entry.isIntersecting && timer) {
          clearInterval(timer);
          timer = null;
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [auto]);

  const scenario = scenarios[active];

  return (
    <Section id="systems">
      <SectionTexture
        variant="grid"
        fade="right"
        glows={[
          { className: "right-[-8%] top-[-14%] h-[520px] w-[46%]", color: "var(--glow-a)" },
          { className: "right-[18%] bottom-[-18%] h-[380px] w-[34%]", color: "var(--glow-c)", delay: "-8s" },
        ]}
      />
      <SectionHeading
        index="02"
        kicker="How the work looks"
        title="Different domains,"
        accent="same discipline."
        intro="Four system walkthroughs. Signature verification, idempotency keys, double-entry posting, region routing, on-chain settlement, and deterministic compute. Illustrative sequences, not live systems."
      />

      <div ref={ref} className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div
            role="tablist"
            aria-label="System walkthroughs"
            className="grid grid-cols-2 gap-2 lg:flex lg:flex-col lg:gap-3"
          >
            {scenarios.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActive(i);
                    setAuto(false);
                  }}
                  className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-colors duration-300 lg:p-5 ${
                    isActive
                      ? "border-accent/45 bg-accent-dim"
                      : "border-line bg-surface/40 hover:border-line-2 hover:bg-surface-2/50"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`mono text-[10.5px] ${
                        isActive ? "text-accent-ink" : "text-ink-4"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`text-[14px] font-medium tracking-[-0.01em] ${
                        isActive ? "text-ink" : "text-ink-2"
                      }`}
                    >
                      {s.tab}
                    </span>
                  </span>
                  <span className="mt-2 hidden text-[13px] leading-snug text-ink-3 lg:block">
                    {s.title}
                  </span>

                  {isActive && auto ? (
                    <motion.span
                      key={`${s.id}-bar`}
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: DWELL_MS / 1000, ease: "linear" }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <motion.p
            key={scenario.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-6 max-w-sm text-pretty text-[14.5px] leading-relaxed text-ink-2"
          >
            {scenario.blurb}
          </motion.p>
        </div>

        <div className="lg:col-span-7">
          <Reveal y={26}>
            <Terminal key={scenario.id} scenario={scenario} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
