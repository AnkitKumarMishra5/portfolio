"use client";

import { motion } from "motion/react";
import { about, domains, education, person, positioning } from "@/lib/data";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { SpotlightCard } from "../ui/Spotlight";
import { IconArrowUpRight } from "../ui/Icons";

const EASE = [0.16, 1, 0.3, 1] as const;

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line py-3.5 first:border-t-0 first:pt-0">
      <p className="label mb-1.5 text-[9.5px]">{label}</p>
      <p className="text-[14px] leading-snug text-ink">{value}</p>
    </div>
  );
}

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        index="01"
        kicker="About"
        title="How I work,"
        accent="and what I take on."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <div className="space-y-6">
            {about.map((para, i) => (
              <Reveal key={i} delay={i * 0.06} y={22}>
                <p
                  className={`text-pretty leading-[1.72] ${
                    i === 0
                      ? "text-[19px] text-ink"
                      : "text-[16.5px] text-ink-2"
                  }`}
                >
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.08}>
            <blockquote className="relative mt-9 border-l-2 border-accent pl-6">
              <p className="text-pretty text-[17px] leading-[1.65] text-ink">
                {positioning}
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={`mailto:${person.email}`}
                className="group inline-flex items-center gap-2 text-[15px] text-ink"
              >
                <span className="link-sweep">
                  Payments, compliance, AI, or something else entirely? Get in
                  touch.
                </span>
                <IconArrowUpRight className="size-4 shrink-0 text-accent-ink transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {domains.map((d, i) => (
              <Reveal key={d.name} delay={0.06 * i}>
                <div className="h-full rounded-2xl border border-line bg-surface/40 p-4">
                  <p className="label mb-3 text-[9.5px]">{d.name}</p>
                  <ul className="space-y-1.5">
                    {d.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-[13px] leading-snug text-ink-2"
                      >
                        <span className="mt-[7px] size-1 shrink-0 rounded-full bg-accent-ink/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="lg:sticky lg:top-28"
          >
            <SpotlightCard className="card-hair p-6">
              <div className="mb-5 flex items-center justify-between">
                <p className="label text-[9.5px]">Profile</p>
                <span className="flex items-center gap-1.5">
                  <span className="live-dot size-1.5 rounded-full bg-accent" />
                  <span className="mono text-[10.5px] text-ink-3">open</span>
                </span>
              </div>

              <Fact label="Most recent" value={`${person.role}, ${person.company} (${person.companyLocation})`} />
              <Fact label="Based" value={person.locationLong} />
              <Fact label="Experience" value="7+ years across FinTech, RegTech, EdTech, and MediaTech" />
              <Fact
                label="Core stack"
                value="JavaScript, TypeScript, React, Next.js, Node.js, PostgreSQL, MongoDB, AWS"
              />
              <Fact
                label="Specialties"
                value="Payments, billing and subscriptions, KYC and compliance, API performance, LLM applications"
              />
              <Fact
                label="Education"
                value={`${education.degree}, ${education.school}, ${education.year} (${education.grade})`}
              />
            </SpotlightCard>

          </motion.div>
        </div>
      </div>
    </Section>
  );
}
