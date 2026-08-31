"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { availability, person } from "@/lib/data";
import { Section } from "../ui/SectionHeading";
import { Aurora } from "../ui/Aurora";
import { Magnetic } from "../ui/Magnetic";
import { Reveal } from "../ui/Reveal";
import { WordsUp } from "../ui/TextReveal";
import {
  IconArrowUpRight,
  IconCheck,
  IconCopy,
  IconDownload,
  IconGitHub,
  IconLinkedIn,
  IconMail,
} from "../ui/Icons";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  return (
    <Section id="contact" className="!pb-16">
      <div className="card card-hair relative overflow-hidden px-6 py-16 sm:px-12 sm:py-24">
        <Aurora />
        <div aria-hidden className="absolute inset-0 grid-bg opacity-60" />

        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line-2 bg-surface/50 py-1.5 pl-2 pr-4 backdrop-blur-md"
          >
            <span className="live-dot size-1.5 rounded-full bg-accent" />
            <span className="text-[12.5px] text-ink-2">{availability.status}</span>
          </motion.div>

          <h2 className="h-display text-[clamp(2.4rem,6.4vw,4.6rem)] text-ink">
            <WordsUp text="Building something where" />{" "}
            <span className="font-display text-accent-ink">
              <WordsUp text="getting it wrong" delay={0.1} />
            </span>{" "}
            <WordsUp text="is expensive?" delay={0.2} />
          </h2>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-7 max-w-xl text-pretty text-[16.5px] leading-[1.65] text-ink-2">
              {availability.line} Tell me what you are building and where it is
              stuck, and I will tell you straight whether I am the right person
              for it.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mx-auto mt-10 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
              {availability.modes.map((mode) => (
                <div
                  key={mode.label}
                  className="rounded-2xl border border-line bg-surface/40 p-5 backdrop-blur-sm"
                >
                  <dt className="mb-2 flex items-center gap-2 text-[13.5px] font-medium text-ink">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {mode.label}
                  </dt>
                  <dd className="text-[13px] leading-relaxed text-ink-3">
                    {mode.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mono mx-auto mt-5 text-[12px] text-ink-4">
              {availability.location}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-col items-center gap-3">
              <Magnetic strength={0.18}>
                <a
                  href={`mailto:${person.email}`}
                  className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-[15px] font-medium text-on-accent transition-shadow duration-300 hover:shadow-[0_0_54px_-8px_var(--accent-glow)]"
                >
                  <IconMail className="size-4.5" />
                  <span>{person.email}</span>
                  <IconArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>

              <button
                onClick={copy}
                className="mono inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] text-ink-3 transition-colors duration-300 hover:text-ink"
              >
                {copied ? (
                  <>
                    <IconCheck className="size-3.5 text-accent-ink" />
                    copied to clipboard
                  </>
                ) : (
                  <>
                    <IconCopy className="size-3.5" />
                    copy address
                  </>
                )}
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Magnetic strength={0.16}>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-line-2 bg-surface/50 px-5 py-3 text-[14px] text-ink backdrop-blur-md transition-colors duration-300 hover:border-line-3 hover:bg-surface-2/70"
                >
                  <IconLinkedIn className="size-4 text-ink-2" />
                  LinkedIn
                </a>
              </Magnetic>
              <Magnetic strength={0.16}>
                <a
                  href={person.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-line-2 bg-surface/50 px-5 py-3 text-[14px] text-ink backdrop-blur-md transition-colors duration-300 hover:border-line-3 hover:bg-surface-2/70"
                >
                  <IconGitHub className="size-4 text-ink-2" />
                  GitHub
                </a>
              </Magnetic>
              <Magnetic strength={0.16}>
                <a
                  href={person.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-line-2 bg-surface/50 px-5 py-3 text-[14px] text-ink backdrop-blur-md transition-colors duration-300 hover:border-line-3 hover:bg-surface-2/70"
                >
                  <IconDownload className="size-4 text-ink-2 transition-transform duration-300 group-hover:translate-y-0.5" />
                  Resume
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
