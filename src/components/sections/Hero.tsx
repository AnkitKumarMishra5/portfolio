"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { availability, heroRotator, heroStats, heroTags, person } from "@/lib/data";
import { Aurora } from "../ui/Aurora";
import { ParticleField } from "../ui/ParticleField";
import { LineUp } from "../ui/TextReveal";
import { Magnetic } from "../ui/Magnetic";
import {
  IconArrowUpRight,
  IconDownload,
  IconGitHub,
  IconLinkedIn,
  IconMail,
} from "../ui/Icons";

const EASE = [0.16, 1, 0.3, 1] as const;

function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setI((v) => (v + 1) % heroRotator.length),
      2400,
    );
    return () => clearInterval(t);
  }, []);
  return (
    <span className="word-mask relative inline-flex h-[1.4em] min-w-[168px] items-center overflow-hidden align-middle">
      <AnimatePresence mode="wait">
        <motion.span
          key={heroRotator[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="text-accent-ink"
        >
          {heroRotator[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-32 sm:pt-36"
    >
      <div aria-hidden className="absolute inset-0 grid-bg" />
      <Aurora />
      <ParticleField className="opacity-70" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--bg))",
        }}
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-12 lg:gap-10"
      >
        <div className="lg:col-span-7">
          <h1 className="h-display text-[clamp(2.9rem,8.4vw,6.1rem)] text-ink">
            <LineUp delay={0.18}>Ankit Kumar</LineUp>{" "}
            <LineUp delay={0.3}>
              <span className="font-display pr-2 text-accent-ink">Mishra</span>
            </LineUp>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className="mt-7 max-w-[38ch] text-pretty text-[clamp(1.05rem,2.1vw,1.32rem)] leading-[1.45] text-ink"
          >
            {person.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.62, ease: EASE }}
            className="mt-3.5 max-w-[46ch] text-pretty text-[15px] leading-[1.6] text-ink-3"
          >
            {person.taglineSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.72, ease: EASE }}
            className="mono mt-5 flex items-center gap-2 text-[12.5px] text-ink-3"
          >
            <span className="text-ink-4">focus</span>
            <span className="text-ink-4">/</span>
            <Rotator />
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.78, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-2.5"
          >
            {heroStats.map((s) => (
              <li
                key={s.label}
                className="flex items-baseline gap-2 rounded-full border border-line bg-surface/40 px-4 py-2 backdrop-blur-sm"
              >
                <span className="mono text-[14px] font-semibold text-accent-ink">
                  {s.value}
                </span>
                <span className="text-[12.5px] text-ink-3">{s.label}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.88, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.2}>
              <a
                href={`mailto:${person.email}`}
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-accent px-6 py-3.5 text-[14px] font-medium text-on-accent transition-shadow duration-300 hover:shadow-[0_0_44px_-8px_var(--accent-glow)]"
              >
                <IconMail className="size-4" />
                <span>Email me</span>
                <IconArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.16}>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-line-2 bg-surface/40 px-6 py-3.5 text-[14px] font-medium text-ink backdrop-blur-md transition-colors duration-300 hover:border-line-3 hover:bg-surface-2/70"
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
                className="group inline-flex items-center gap-2.5 rounded-full border border-line-2 bg-surface/40 px-6 py-3.5 text-[14px] font-medium text-ink backdrop-blur-md transition-colors duration-300 hover:border-line-3 hover:bg-surface-2/70"
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
                className="group inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-[14px] text-ink-2 transition-colors duration-300 hover:text-ink"
              >
                <IconDownload className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                <span className="link-sweep">Download resume</span>
              </a>
            </Magnetic>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
            className="mt-7 flex items-center gap-2.5 text-[13px] text-ink-3"
          >
            <span className="live-dot size-1.5 shrink-0 rounded-full bg-accent" />
            <span>
              <span className="text-ink-2">{availability.status}.</span>{" "}
              Full-time, contract, or fractional.
            </span>
          </motion.p>
        </div>

        <motion.div
          style={{ y: photoY }}
          className="relative mx-auto w-full max-w-[330px] lg:col-span-5 lg:max-w-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, filter: "blur(16px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.3, delay: 0.35, ease: EASE }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[30px] p-[1.5px]">
              <div
                aria-hidden
                className="spin-slow absolute left-1/2 top-1/2 aspect-square w-[170%] -translate-x-1/2 -translate-y-1/2 opacity-50"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent, var(--accent), transparent 30%, var(--violet), transparent 60%)",
                }}
              />
              <div className="group relative overflow-hidden rounded-[28px] border border-line-2 bg-surface-2">
                <Image
                  src={person.photo}
                  alt="Ankit Kumar Mishra, Engineering Lead and Full-Stack Engineer"
                  width={1000}
                  height={1000}
                  priority
                  sizes="(max-width: 1024px) 330px, 420px"
                  className="portrait-img h-auto w-full object-cover transition-transform duration-[1.4s] ease-out will-change-transform group-hover:scale-[1.04]"
                />
                <div aria-hidden className="portrait-veil absolute inset-0" />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, color-mix(in oklab, var(--bg) 78%, transparent) 2%, transparent 46%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                  <div>
                    <p className="text-[13px] font-medium text-ink">
                      {person.location}
                    </p>
                    <p className="mono text-[11px] text-ink-3">
                      {person.locationShort}
                    </p>
                  </div>
                  <span className="mono rounded-full border border-line-2 bg-bg/60 px-2.5 py-1 text-[10px] text-ink-2 backdrop-blur-md">
                    7+ yrs
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
            className="mt-5 space-y-3"
          >
            {heroTags.map((group) => (
              <div key={group.label} className="flex items-start gap-2">
                <span className="label w-[62px] shrink-0 pt-1.5 text-[9.5px]">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="mono rounded-md border border-line bg-surface/50 px-2 py-1 text-[11px] text-ink-3 backdrop-blur-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-label="Scroll to about"
      >
        <span className="label text-[9.5px]">Scroll</span>
        <span className="relative h-9 w-[1px] overflow-hidden bg-line-2">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-accent"
            animate={{ y: [-12, 36] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
