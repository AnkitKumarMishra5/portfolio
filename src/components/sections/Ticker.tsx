"use client";

import { brandIcons } from "@/lib/brandIcons";
import { BrandMark } from "../ui/BrandMark";
import { Marquee } from "../ui/Marquee";

export function Ticker() {
  return (
    <div className="relative border-y border-line bg-surface/30 py-5 backdrop-blur-sm">
      <Marquee duration={64}>
        {brandIcons.map((icon) => (
          <span
            key={icon.slug}
            className="group flex shrink-0 items-center gap-2.5 px-6"
          >
            <span
              className="text-ink-4 transition-colors duration-300 group-hover:[color:var(--brand)]"
              style={{ ["--brand" as string]: icon.hex ?? "var(--accent-ink)" }}
            >
              <BrandMark icon={icon} />
            </span>
            <span className="mono whitespace-nowrap text-[12.5px] tracking-tight text-ink-3 transition-colors duration-300 group-hover:text-ink">
              {icon.title}
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
