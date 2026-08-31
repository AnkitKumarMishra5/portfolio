"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  pathLength: 100,
};

const glyphs: Record<string, React.ReactNode> = {
  languages: (
    <>
      <path className="g-draw" {...S} d="M9 6 3.5 12 9 18" />
      <path className="g-draw" {...S} d="M15 6l5.5 6L15 18" />
      <path className="g-pulse" stroke="var(--accent-ink)" strokeWidth="1.6" strokeLinecap="round" d="M12 8v8" />
    </>
  ),
  frontend: (
    <>
      <rect className="g-draw" {...S} x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path className="g-draw" {...S} d="M3 9h18" />
      <path className="g-draw" {...S} d="M8.5 13h4" />
      <circle className="g-pulse" fill="var(--accent-ink)" cx="5.8" cy="6.8" r="0.9" stroke="none" />
    </>
  ),
  backend: (
    <>
      <rect className="g-draw" {...S} x="3.5" y="4" width="17" height="5" rx="1.6" />
      <rect className="g-draw" {...S} x="3.5" y="15" width="17" height="5" rx="1.6" />
      <path className="g-draw" {...S} d="M12 9v6" />
      <circle className="g-travel" fill="var(--accent-ink)" cx="12" cy="9" r="1.1" stroke="none" />
    </>
  ),
  databases: (
    <>
      <ellipse className="g-draw" {...S} cx="12" cy="6" rx="7.5" ry="2.8" />
      <path className="g-draw" {...S} d="M4.5 6v12c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8V6" />
      <path className="g-pulse" stroke="var(--accent-ink)" strokeWidth="1.6" strokeLinecap="round" d="M4.5 12c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8" />
    </>
  ),
  cloud: (
    <>
      <path className="g-draw" {...S} d="M7 17.5a4.2 4.2 0 0 1-.3-8.4 5.3 5.3 0 0 1 10.2-1.2A3.9 3.9 0 0 1 17.5 17.5z" />
      <circle className="g-travel" fill="var(--accent-ink)" cx="9" cy="20.5" r="1.1" stroke="none" />
      <path className="g-draw" {...S} d="M8 20.5h8" />
    </>
  ),
  ai: (
    <>
      <circle className="g-draw" {...S} cx="12" cy="5.5" r="2.2" />
      <circle className="g-draw" {...S} cx="5.5" cy="16" r="2.2" />
      <circle className="g-draw" {...S} cx="18.5" cy="16" r="2.2" />
      <path className="g-draw" {...S} d="M10.4 7.3 7 13.9M13.6 7.3 17 13.9M7.7 16h8.6" />
      <circle className="g-pulse" fill="var(--accent-ink)" cx="12" cy="5.5" r="1" stroke="none" />
    </>
  ),
  architecture: (
    <>
      <rect className="g-draw" {...S} x="9" y="3.5" width="6" height="5" rx="1.4" />
      <rect className="g-draw" {...S} x="2.5" y="15.5" width="6" height="5" rx="1.4" />
      <rect className="g-draw" {...S} x="15.5" y="15.5" width="6" height="5" rx="1.4" />
      <path className="g-draw" {...S} d="M12 8.5v3.5M5.5 15.5V12h13v3.5" />
      <circle className="g-travel" fill="var(--accent-ink)" cx="12" cy="12" r="1.1" stroke="none" />
    </>
  ),
  leadership: (
    <>
      <circle className="g-draw" {...S} cx="12" cy="5.5" r="2.4" />
      <path className="g-draw" {...S} d="M12 7.9v3.6M6 17.5V13h12v4.5" />
      <path className="g-draw" {...S} d="M12 11.5V22" />
      <circle className="g-pulse" fill="var(--accent-ink)" cx="6" cy="19.5" r="1.5" stroke="none" />
      <circle className="g-pulse" fill="var(--accent-ink)" cx="18" cy="19.5" r="1.5" stroke="none" />
    </>
  ),
  design: (
    <>
      <path className="g-draw" {...S} d="M7 3.5h10M7 20.5h10M3.5 7v10M20.5 7v10" />
      <rect className="g-draw" {...S} x="8.5" y="8.5" width="7" height="7" rx="1.4" />
      <circle className="g-pulse" fill="var(--accent-ink)" cx="12" cy="12" r="1.2" stroke="none" />
    </>
  ),
  projects: (
    <>
      <path className="g-draw" {...S} d="M10.5 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 0 0-5.7-5.7L11.7 6.6" />
      <path className="g-draw" {...S} d="M13.5 10.5a4 4 0 0 0-5.7 0L5 13.3a4 4 0 0 0 5.7 5.7l1.6-1.6" />
      <circle className="g-pulse" fill="var(--accent-ink)" cx="12" cy="12" r="1" stroke="none" />
    </>
  ),
};

export function SkillGlyph({
  kind,
  className = "size-[22px]",
}: {
  kind: string;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const art = glyphs[kind] ?? glyphs.projects;

  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      className={`${className} ${inView ? "glyph-in" : ""}`}
      aria-hidden
    >
      {art}
    </svg>
  );
}
