"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const sections = [
  { id: "top", label: "Top" },
  { id: "about", label: "About" },
  { id: "systems", label: "Systems" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "source", label: "Source" },
  { id: "ask", label: "Ask" },
  { id: "workflow", label: "How I ship" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function SectionRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.6] }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="no-print fixed right-5 top-1/2 z-[70] hidden -translate-y-1/2 flex-col items-end gap-2.5 xl:flex"
    >
      {sections.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            className="group/rail flex items-center gap-2.5"
            aria-label={label}
            aria-current={isActive ? "true" : undefined}
          >
            <span className="mono pointer-events-none translate-x-2 text-[10px] uppercase tracking-[0.14em] text-ink-4 opacity-0 transition-all duration-300 group-hover/rail:translate-x-0 group-hover/rail:opacity-100">
              {label}
            </span>
            <span className="relative flex h-2 w-6 items-center justify-end">
              <motion.span
                className="block h-[2px] rounded-full"
                animate={{
                  width: isActive ? 22 : 10,
                  backgroundColor: isActive
                    ? "var(--accent)"
                    : "var(--line-3)",
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </a>
        );
      })}
    </nav>
  );
}
