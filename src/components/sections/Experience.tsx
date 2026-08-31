"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { experience } from "@/lib/data";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { SectionTexture } from "../ui/SectionTexture";
import { LogStream } from "../ui/LogStream";

const EASE = [0.16, 1, 0.3, 1] as const;

function Entry({ job }: { job: (typeof experience)[number] }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="group relative pl-10 sm:pl-16"
    >
      <span className="absolute left-[9px] top-[10px] z-10 grid size-3.5 place-items-center rounded-full border-2 border-line-3 bg-bg transition-colors duration-500 group-hover:border-accent sm:left-[25px]" />

      <div className="pb-14">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
          <h3 className="text-[21px] font-medium tracking-[-0.02em] text-ink sm:text-[23px]">
            {job.company}
          </h3>
          <span className="mono rounded-md border border-accent/30 bg-accent-dim px-2 py-0.5 text-[11px] text-accent-ink">
            {job.tenure}
          </span>
        </div>

        <p className="mono mt-1.5 text-[12.5px] text-ink-4">
          {job.span} · {job.location}
        </p>

        <div className="mt-6 space-y-7">
          {job.roles.map((role, ri) => (
            <div
              key={role.title}
              className={ri > 0 ? "border-l border-line pl-5" : ""}
            >
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h4 className="text-[16px] font-medium tracking-[-0.01em] text-ink">
                  {role.title}
                </h4>
                <span className="mono text-[11.5px] text-ink-4">
                  {role.period}
                </span>
              </div>

              <ul className="mt-3.5 max-w-3xl space-y-2.5">
                {role.points.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.55, delay: 0.06 + i * 0.045, ease: EASE }}
                    className="flex gap-3 text-[14.5px] leading-[1.65] text-ink-2"
                  >
                    <span className="mt-[9px] size-1 shrink-0 rounded-full bg-accent-ink/60" />
                    <span className="text-pretty">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {job.stack.map((s) => (
            <li
              key={s}
              className="mono rounded-md border border-line bg-surface/40 px-2 py-0.5 text-[10.5px] text-ink-4 transition-colors duration-300 group-hover:text-ink-3"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="experience">
      <SectionTexture
        variant="dots"
        fade="right"
        opacity={0.45}
        glows={[{ className: "right-[-14%] top-[6%] h-[520px] w-[44%]", color: "var(--glow-a)" }]}
      />
      <SectionHeading
        index="08"
        kicker="Experience"
        title="Where I have shipped,"
        accent="and for how long."
        intro="Three years and four months at TechPassport. Two at Vested Finance, with two promotions inside twelve months."
      />

      <div className="mt-14 grid gap-10 xl:grid-cols-[1fr_300px]">
        <div ref={ref} className="relative">
        <div className="absolute bottom-0 left-[15px] top-2 w-px bg-line sm:left-[31px]">
          <motion.div
            className="w-px origin-top"
            style={{
              height,
              background:
                "linear-gradient(to bottom, var(--accent), color-mix(in oklab, var(--accent) 30%, transparent))",
            }}
          />
        </div>

          {experience.map((job) => (
            <Entry key={job.company} job={job} />
          ))}
        </div>

        <div className="relative hidden xl:block">
          <LogStream
            variant="profile"
            className="inset-0 h-full"
            duration={62}
          />
        </div>
      </div>
    </Section>
  );
}
