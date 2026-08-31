"use client";

import { awards, education } from "@/lib/data";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { SpotlightCard } from "../ui/Spotlight";

export function Recognition() {
  return (
    <Section>
      <SectionHeading
        index="11"
        kicker="Education and awards"
        title="Where I trained,"
        accent="and what stuck."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <SpotlightCard className="card-hair h-full p-7">
              <p className="label mb-6 text-[9.5px]">Education</p>
              <p className="mono mb-3 text-[13px] text-accent-ink">
                {education.year}
              </p>
              <h3 className="text-[19px] font-medium leading-snug tracking-[-0.02em] text-ink">
                {education.degree}
              </h3>
              <p className="mt-2 text-[14.5px] text-ink-2">{education.school}</p>
              <p className="text-[13px] text-ink-4">{education.location}</p>
              <p className="mono mt-6 inline-block rounded-md border border-line bg-surface-2/60 px-3 py-1.5 text-[12.5px] text-ink">
                {education.grade}
              </p>
            </SpotlightCard>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <div className="flex h-full flex-col gap-3">
            {awards.map((award, i) => (
              <Reveal key={award.title} delay={i * 0.07} className="flex-1">
                <SpotlightCard
                  className="card-hair flex h-full items-start gap-5 p-6"
                  radius={280}
                >
                  <span className="mono mt-0.5 shrink-0 text-[11px] text-accent-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-pretty text-[15.5px] font-medium leading-snug tracking-[-0.01em] text-ink">
                      {award.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] text-ink-3">
                      {award.org}
                      <span className="text-ink-4"> · {award.date}</span>
                    </p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
