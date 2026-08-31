"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { guardrails, workflow } from "@/lib/data";
import { DiffFrame } from "../ui/DiffFrame";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { SpotlightCard } from "../ui/Spotlight";
import { SectionTexture } from "../ui/SectionTexture";

const EASE = [0.16, 1, 0.3, 1] as const;

function Connector() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -right-3 top-11 hidden h-px w-6 xl:block"
    >
      <svg width="24" height="1" viewBox="0 0 24 1" className="overflow-visible">
        <line
          x1="0"
          y1="0.5"
          x2="24"
          y2="0.5"
          stroke="var(--line-3)"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="dash-flow"
        />
      </svg>
    </span>
  );
}

export function Workflow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 55%"],
  });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="workflow">
      <SectionTexture
        variant="rays"
        fade="center"
        opacity={0.6}
        glows={[{ className: "right-[-6%] top-[-10%] h-[440px] w-[40%]", color: "var(--glow-b)" }]}
      />
      <SectionHeading
        index="07"
        kicker="How I ship"
        title="Agents move faster."
        accent="I still sign off."
        intro="AI is part of the toolchain, not a substitute for judgement. Agents draft, run passes and automate the repeatable work. The spec, the review, and the calls that are expensive to get wrong stay with me."
      />

      <div ref={ref} className="mt-14">
        <div className="mb-10 h-px w-full bg-line">
          <motion.div
            className="h-px"
            style={{
              width,
              background:
                "linear-gradient(90deg, var(--accent), var(--success))",
            }}
          />
        </div>

        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {workflow.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: i * 0.08, ease: EASE }}
              className="relative"
            >
              <SpotlightCard className="card-hair h-full p-5" radius={280}>
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="mono grid size-7 place-items-center rounded-lg border border-accent/30 bg-accent-dim text-[11px] text-accent-ink">
                    {s.step}
                  </span>
                </div>

                <h3 className="text-[15px] font-medium leading-snug tracking-[-0.01em] text-ink">
                  {s.title}
                </h3>

                <p className="mt-3 text-pretty text-[13.5px] leading-[1.6] text-ink-3">
                  {s.body}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-4">
                  {s.tools.map((t) => (
                    <li
                      key={t}
                      className="mono rounded border border-line bg-surface-2/60 px-1.5 py-0.5 text-[10.5px] text-ink-4"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>

              {i < workflow.length - 1 ? <Connector /> : null}
            </motion.li>
          ))}
        </ol>

        <div className="mt-4 grid gap-4 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: EASE }}
            className="lg:col-span-7"
          >
            <DiffFrame />
          </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
          className="rounded-2xl border border-line bg-surface/40 p-6 sm:p-7 lg:col-span-5"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span
              aria-hidden
              className="grid size-7 place-items-center rounded-lg border border-success/35 bg-success-dim text-success-ink"
            >
              <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
              </svg>
            </span>
            <h3 className="text-[15px] font-medium tracking-[-0.01em] text-ink">
              {guardrails.title}
            </h3>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2">
            {guardrails.items.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.06, ease: EASE }}
                className="rounded-full border border-line-2 bg-surface-2/60 px-3.5 py-1.5 text-[13px] text-ink-2"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
        </div>
      </div>
    </Section>
  );
}
