"use client";

import { motion } from "motion/react";
import { teaching } from "@/lib/data";
import { Section } from "../ui/SectionHeading";
import { Marquee } from "../ui/Marquee";
import { Reveal } from "../ui/Reveal";
import { WordsUp } from "../ui/TextReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Teaching() {
  return (
    <Section className="!py-20">
      <div className="card card-hair relative overflow-hidden p-8 sm:p-12">
        <div
          aria-hidden
          className="absolute inset-0 dot-bg opacity-40"
          style={{
            maskImage: "radial-gradient(70% 60% at 20% 0%, #000, transparent)",
            WebkitMaskImage:
              "radial-gradient(70% 60% at 20% 0%, #000, transparent)",
          }}
        />

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="mono text-[11px] text-accent-ink">10</span>
            <span className="h-px w-8 bg-line-2" />
            <span className="label">{teaching.kicker}</span>
          </motion.div>

          <h2 className="h-display max-w-3xl text-[clamp(1.9rem,4vw,2.9rem)] text-ink">
            <WordsUp text={teaching.title} />{" "}
            <span className="font-display text-accent-ink">
              <WordsUp text={teaching.accent} delay={0.12} />
            </span>
          </h2>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-pretty text-[16.5px] leading-[1.68] text-ink-2">
              {teaching.copy}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
              {teaching.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="mono text-[clamp(1.8rem,4vw,2.6rem)] font-semibold tracking-[-0.03em] text-ink">
                    {stat.value}
                  </dt>
                  <dd className="mt-1.5 text-[13.5px] text-ink-3">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-8 text-[13.5px] text-ink-4">
              {teaching.credential}
            </p>
          </Reveal>
        </div>

        <div className="relative mt-10 border-t border-line pt-8">
          <Marquee duration={30}>
            {teaching.platforms.map((p, i) => (
              <span key={`${p}-${i}`} className="flex items-center">
                <span className="px-7 text-[clamp(1.1rem,2.2vw,1.6rem)] font-medium tracking-[-0.02em] text-ink-3 transition-colors duration-300 hover:text-ink">
                  {p}
                </span>
                <span aria-hidden className="text-[9px] text-accent-ink/50">
                  ◆
                </span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </Section>
  );
}
