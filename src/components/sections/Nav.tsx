"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { navLinks, person } from "@/lib/data";
import { CommandPalette } from "../CommandPalette";
import { ThemeToggle } from "../ThemeToggle";
import { IconArrowUpRight } from "../ui/Icons";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.6] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        className="no-print fixed inset-x-0 top-0 z-[80] flex justify-center px-4 pt-4"
      >
        <nav
          className={`flex w-full max-w-6xl items-center gap-3 rounded-full px-3 py-2.5 transition-all duration-500 sm:px-4 ${
            scrolled
              ? "glass shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)]"
              : "border border-transparent bg-transparent"
          }`}
        >
          <a
            href="#top"
            className="group flex shrink-0 items-center gap-2.5 pl-1.5"
            aria-label="Back to top"
          >
            <span className="relative grid size-8 shrink-0 place-items-center overflow-hidden rounded-lg border border-line-2 bg-surface-2">
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent), transparent 70%)",
                }}
              />
              <span className="mono relative text-[11px] font-semibold tracking-tight text-ink group-hover:text-on-accent">
                AK
              </span>
            </span>
            <span className="hidden text-[14px] font-medium tracking-[-0.01em] text-ink sm:block">
              Ankit Kumar Mishra
            </span>
          </a>

          <ul className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <li key={link.href} className={link.priority ? "" : "hidden xl:block"}>
                  <a
                    href={link.href}
                    className={`relative block whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] transition-colors duration-300 ${
                      isActive ? "text-ink" : "text-ink-3 hover:text-ink-2"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-surface-3/90"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <CommandPalette />
            <ThemeToggle />
            <a
              href={`mailto:${person.email}`}
              className="group hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[13px] font-medium text-on-accent transition-shadow duration-300 hover:shadow-[0_0_30px_-6px_var(--accent-glow)] sm:inline-flex"
            >
              Get in touch
              <IconArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="grid size-9 place-items-center rounded-full border border-line-2 text-ink-2 lg:hidden"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 8h16M4 16h16" />
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[95] bg-bg-deep/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <span className="label">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full border border-line-2 text-ink"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav className="mt-10 flex flex-col px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.055, duration: 0.6, ease: EASE }}
                  className="h-display border-b border-line py-5 text-[36px] text-ink"
                >
                  <span className="mono mr-3 align-super text-[11px] text-ink-4">
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={`mailto:${person.email}`}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.6, ease: EASE }}
                className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-[15px] font-medium text-on-accent"
              >
                Get in touch
                <IconArrowUpRight className="size-4" />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
