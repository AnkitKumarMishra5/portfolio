"use client";

import { motion } from "motion/react";
import { person } from "@/lib/data";
import { IconArrowUpRight, IconGitHub, IconLinkedIn, IconMail } from "../ui/Icons";

const links = [
  { label: "Email", href: `mailto:${person.email}`, icon: IconMail, external: false },
  { label: "LinkedIn", href: person.linkedin, icon: IconLinkedIn, external: true },
  { label: "GitHub", href: person.github, icon: IconGitHub, external: true },
];

export function Footer() {
  const year = 2026;

  return (
    <footer className="relative border-t border-line px-6 py-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="h-display text-[26px] text-ink">{person.name}</p>
            <p className="mt-1.5 text-[14px] text-ink-3">{person.headline}</p>
            <p className="mono mt-4 text-[12px] text-ink-4">
              {person.location} · {person.locationShort}
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {links.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center gap-2 py-1 text-[14px] text-ink-2 transition-colors duration-300 hover:text-ink"
              >
                <Icon className="size-4 text-ink-4 transition-colors duration-300 group-hover:text-accent-ink" />
                <span className="link-sweep">{label}</span>
              </a>
            ))}
            <a
              href="/resume"
              className="group flex items-center gap-2 py-1 text-[14px] text-ink-2 transition-colors duration-300 hover:text-ink"
            >
              <span className="link-sweep">Resume</span>
              <IconArrowUpRight className="size-3.5 text-ink-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="mono text-[11.5px] text-ink-4">
            © {year} {person.name}. Built with Next.js and Tailwind.{" "}
            <a href="/privacy" className="link-sweep text-ink-3 hover:text-ink">
              Privacy
            </a>
          </p>

          <motion.a
            href="#top"
            whileHover={{ y: -2 }}
            className="mono group flex items-center gap-2 text-[11.5px] uppercase tracking-[0.16em] text-ink-3 transition-colors hover:text-ink"
          >
            Back to top
            <span className="grid size-7 place-items-center rounded-full border border-line-2 transition-colors group-hover:border-accent group-hover:text-accent-ink">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M6 11l6-6 6 6" />
              </svg>
            </span>
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
