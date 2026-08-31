"use client";

import { motion } from "motion/react";
import { skillGroups } from "@/lib/data";
import { iconFor } from "@/lib/iconFor";
import { BrandMark } from "../ui/BrandMark";
import { SkillGlyph } from "../ui/SkillGlyph";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { SpotlightCard } from "../ui/Spotlight";
import { SectionTexture } from "../ui/SectionTexture";

const EASE = [0.16, 1, 0.3, 1] as const;

const glyphKinds = [
  "languages",
  "frontend",
  "backend",
  "databases",
  "cloud",
  "ai",
  "architecture",
  "leadership",
  "design",
  "projects",
];

const spans: Record<number, string> = {
  0: "md:col-span-2",
  1: "md:col-span-4",
  2: "md:col-span-3",
  3: "md:col-span-3",
  4: "md:col-span-3",
  5: "md:col-span-3",
  6: "md:col-span-2",
  7: "md:col-span-2",
  8: "md:col-span-2",
  9: "md:col-span-6",
};

export function Skills() {
  return (
    <Section id="skills">
      <SectionTexture
        variant="grid"
        fade="center"
        opacity={0.55}
        glows={[{ className: "left-[6%] bottom-[-12%] h-[420px] w-[52%]", color: "var(--glow-c)" }]}
      />
      <SectionHeading
        index="09"
        kicker="Skills"
        title="The tools I reach for,"
        accent="grouped honestly."
      />

      <div className="mt-14 grid grid-cols-1 gap-3 md:grid-cols-6">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.name}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: (gi % 3) * 0.06, ease: EASE }}
            className={spans[gi] ?? "md:col-span-3"}
          >
            <SpotlightCard className="group/skill card-hair h-full p-5" radius={300}>
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-line bg-surface-2/70 text-ink-2 transition-colors duration-300 group-hover/skill:border-accent/40 group-hover/skill:text-accent-ink">
                  <SkillGlyph kind={glyphKinds[gi] ?? "projects"} />
                </span>
                <span className="min-w-0">
                  <span className="mono block text-[10px] text-accent-ink">
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[13.5px] font-medium tracking-[-0.01em] text-ink">
                    {group.name}
                  </h3>
                </span>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => {
                  const icon = iconFor(item);
                  return (
                    <li
                      key={item}
                      className="group/chip flex cursor-default items-center gap-1.5 rounded-md border border-line bg-surface-2/50 px-2.5 py-1 text-[12px] text-ink-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-dim hover:text-ink"
                    >
                      {icon?.path ? (
                        <span
                          className="text-ink-4 transition-colors duration-300 group-hover/chip:[color:var(--brand)]"
                          style={{
                            ["--brand" as string]: icon.hex ?? "var(--accent-ink)",
                          }}
                        >
                          <BrandMark icon={icon} className="size-[13px]" />
                        </span>
                      ) : null}
                      {item}
                    </li>
                  );
                })}
              </ul>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
