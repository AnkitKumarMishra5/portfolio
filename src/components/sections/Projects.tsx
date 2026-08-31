"use client";

import Image from "next/image";
import { PhoneFrame } from "../ui/PhoneFrame";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { projects, type Project } from "@/lib/data";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";
import { Magnetic } from "../ui/Magnetic";
import { IconArrowUpRight, IconGitHub } from "../ui/Icons";
import { SectionTexture } from "../ui/SectionTexture";

function BrowserFrame({ project }: { project: Project }) {
  return (
    <div className="group relative">
      <div
        aria-hidden
        className="absolute inset-x-0 -inset-y-6 -z-10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, var(--accent-dim), transparent 70%)",
        }}
      />
      <div className="card card-hair overflow-hidden !rounded-2xl shadow-[0_30px_80px_-40px_rgba(0,0,0,0.95)]">
        <div className="flex items-center gap-2 border-b border-line bg-surface-2/80 px-3.5 py-2.5">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-ink-4/50" />
            <span className="size-2.5 rounded-full bg-ink-4/50" />
            <span className="size-2.5 rounded-full bg-ink-4/50" />
          </span>
          <span className="mono ml-2 flex-1 truncate rounded-md bg-bg/60 px-2.5 py-1 text-[10.5px] text-ink-3">
            {project.liveLabel}
          </span>
          <span className="flex items-center gap-1.5 pr-1">
            <span className="live-dot size-1.5 rounded-full bg-accent" />
            <span className="mono text-[9.5px] uppercase tracking-wider text-ink-4">
              live
            </span>
          </span>
        </div>

        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block overflow-hidden"
          aria-label={`Open ${project.name} live`}
        >
          <Image
            src={project.shot}
            alt={project.shotAlt}
            width={1600}
            height={1000}
            sizes="(max-width: 1024px) 92vw, 620px"
            className="h-auto w-full transition-transform duration-[1.6s] ease-out group-hover:scale-[1.035]"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-bg/10 transition-opacity duration-500 group-hover:opacity-0"
          />
        </a>
      </div>
    </div>
  );
}

function Row({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;
  const roomForPhone = useMediaQuery("(min-width: 1280px)");

  return (
    <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
      <div
        className={`lg:sticky lg:top-28 lg:col-span-6 ${
          flipped ? "lg:order-2 lg:col-start-7" : ""
        }`}
      >
        <Reveal y={30}>
          <div className="relative">
            <BrowserFrame project={project} />
            {project.shotMobile && roomForPhone ? (
              <PhoneFrame
                src={project.shotMobile}
                alt={project.shotMobileAlt ?? ""}
                label="every phone is a seat"
                className="absolute -bottom-12 right-2 w-[150px]"
              />
            ) : null}
          </div>
        </Reveal>
      </div>

      <div className={`lg:col-span-6 ${flipped ? "lg:order-1 lg:row-start-1" : ""}`}>
        <Stagger className="max-w-xl">
          <StaggerItem>
            <div className="mb-4 flex items-center gap-3">
              <span className="mono text-[11px] text-accent-ink">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-7 bg-line-2" />
              <span className="label">{project.year} · side project</span>
            </div>
          </StaggerItem>

          <StaggerItem>
            <h3 className="h-display text-[clamp(1.9rem,3.4vw,2.6rem)] text-ink">
              {project.name}
            </h3>
          </StaggerItem>

          <StaggerItem>
            <p className="font-display mt-1.5 text-[19px] text-accent-ink">
              {project.kicker}
            </p>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-5 text-pretty text-[16px] leading-[1.68] text-ink-2">
              {project.summary}
            </p>
          </StaggerItem>

          {project.detail.map((d, i) => (
            <StaggerItem key={i}>
              <p className="mt-3.5 text-pretty text-[14.5px] leading-[1.7] text-ink-3">
                {d}
              </p>
            </StaggerItem>
          ))}

          <StaggerItem>
            <dl className="mt-7 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-line pt-6">
              {project.highlights.map((h) => (
                <div key={h.label}>
                  <dt className="label mb-1 text-[9.5px]">{h.label}</dt>
                  <dd className="text-[13.5px] leading-snug text-ink">
                    {h.value}
                  </dd>
                </div>
              ))}
            </dl>
          </StaggerItem>

          <StaggerItem>
            <ul className="mt-7 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <li
                  key={s}
                  className="mono rounded-md border border-line bg-surface/50 px-2.5 py-1 text-[11px] text-ink-3"
                >
                  {s}
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.2}>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-[13.5px] font-medium text-on-accent transition-shadow duration-300 hover:shadow-[0_0_36px_-8px_var(--accent-glow)]"
                >
                  View live
                  <IconArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>
              <Magnetic strength={0.16}>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-surface/40 px-5 py-3 text-[13.5px] font-medium text-ink transition-colors duration-300 hover:border-line-3 hover:bg-surface-2/70"
                >
                  <IconGitHub className="size-4 text-ink-2" />
                  Source
                </a>
              </Magnetic>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <Section id="projects">
      <SectionTexture
        variant="grid"
        fade="left"
        opacity={0.7}
        glows={[
          { className: "left-[-12%] top-[10%] h-[460px] w-[42%]", color: "var(--glow-c)" },
          { className: "right-[-10%] bottom-[6%] h-[420px] w-[38%]", color: "var(--glow-a)", delay: "-11s" },
        ]}
      />
      <SectionHeading
        index="04"
        kicker="Side projects"
        title="Things I built"
        accent="on my own time."
        intro="Solo builds, all live and open source. Each one exists to answer a question I could not answer by reading about it."
      />

      <div className="mt-16 flex flex-col gap-24 sm:gap-32">
        {projects.map((p, i) => (
          <Row key={p.name} project={p} index={i} />
        ))}
      </div>

      <Reveal>
        <div className="mt-20 flex justify-center">
          <a
            href="https://github.com/AnkitKumarMishra5"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-line-2 bg-surface/40 px-6 py-3.5 text-[14px] text-ink-2 transition-colors duration-300 hover:border-line-3 hover:text-ink"
          >
            <IconGitHub className="size-4" />
            <span className="link-sweep">More on GitHub</span>
            <IconArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
