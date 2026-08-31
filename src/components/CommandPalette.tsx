"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { navLinks, person, projects } from "@/lib/data";
import { IconCheck, IconSearch } from "./ui/Icons";

type Item = {
  id: string;
  label: string;
  hint: string;
  group: string;
  run: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openPalette = useCallback(() => {
    setQuery("");
    setActive(0);
    setOpen(true);
  }, []);

  const go = useCallback((hash: string) => {
    setOpen(false);
    requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  const items = useMemo<Item[]>(() => {
    const nav: Item[] = navLinks.map((l) => ({
      id: `nav-${l.href}`,
      label: l.label,
      hint: "Jump to section",
      group: "Navigate",
      run: () => go(l.href),
    }));

    const live: Item[] = projects.map((p) => ({
      id: `live-${p.name}`,
      label: `${p.name}, live demo`,
      hint: p.liveLabel,
      group: "Projects",
      run: () => {
        window.open(p.live, "_blank", "noopener,noreferrer");
        setOpen(false);
      },
    }));

    const actions: Item[] = [
      {
        id: "copy-email",
        label: "Copy email address",
        hint: person.email,
        group: "Contact",
        run: async () => {
          try {
            await navigator.clipboard.writeText(person.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          } catch {
            window.location.href = `mailto:${person.email}`;
          }
        },
      },
      {
        id: "email",
        label: "Send an email",
        hint: person.email,
        group: "Contact",
        run: () => {
          window.location.href = `mailto:${person.email}`;
          setOpen(false);
        },
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "ankitkumarmishra",
        group: "Contact",
        run: () => {
          window.open(person.linkedin, "_blank", "noopener,noreferrer");
          setOpen(false);
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "AnkitKumarMishra5",
        group: "Contact",
        run: () => {
          window.open(person.github, "_blank", "noopener,noreferrer");
          setOpen(false);
        },
      },
      {
        id: "resume",
        label: "Download resume",
        hint: "PDF",
        group: "Contact",
        run: () => {
          window.open(person.resume, "_blank", "noopener,noreferrer");
          setOpen(false);
        },
      },
      {
        id: "theme",
        label: "Toggle light and dark theme",
        hint: "Appearance",
        group: "Settings",
        run: () => {
          const el = document.documentElement;
          const next = el.dataset.theme === "light" ? "dark" : "light";
          el.dataset.theme = next;
          try {
            localStorage.setItem("theme", next);
          } catch {
          }
          setOpen(false);
        },
      },
    ];

    return [...nav, ...live, ...actions];
  }, [go]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.hint.toLowerCase().includes(q) ||
        i.group.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((wasOpen) => {
          if (!wasOpen) {
            setQuery("");
            setActive(0);
          }
          return !wasOpen;
        });
        return;
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 40);
    return () => clearTimeout(t);
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    }
  };

  let lastGroup = "";

  return (
    <>
      <button
        onClick={openPalette}
        aria-label="Open command menu"
        className="hidden items-center gap-2 rounded-full border border-line-2 bg-surface/50 px-3 py-2 text-[12px] text-ink-3 backdrop-blur-md transition-colors hover:border-line-3 hover:text-ink-2 lg:inline-flex"
      >
        <IconSearch className="size-3.5" />
        <span>Quick nav</span>
        <kbd className="mono rounded border border-line-2 bg-surface-3/70 px-1.5 py-0.5 text-[10px] text-ink-3">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[14vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-bg-deep/70 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              initial={{ opacity: 0, y: -14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="glass relative w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <IconSearch className="size-4 shrink-0 text-ink-3" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={onKeyDown}
                  placeholder="Search sections, projects, contact"
                  className="w-full bg-transparent py-4 text-[15px] text-ink outline-none placeholder:text-ink-4"
                />
                <kbd className="mono hidden rounded border border-line-2 px-1.5 py-0.5 text-[10px] text-ink-4 sm:block">
                  esc
                </kbd>
              </div>

              <div className="max-h-[52vh] overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <p className="px-3 py-8 text-center text-sm text-ink-3">
                    Nothing matches that.
                  </p>
                )}
                {filtered.map((item, i) => {
                  const showGroup = item.group !== lastGroup;
                  lastGroup = item.group;
                  return (
                    <div key={item.id}>
                      {showGroup && (
                        <p className="label px-3 pb-1.5 pt-3">{item.group}</p>
                      )}
                      <button
                        onMouseEnter={() => setActive(i)}
                        onClick={() => item.run()}
                        className={`flex w-full items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-left transition-colors ${
                          i === active ? "bg-surface-3/80" : "hover:bg-surface-2/60"
                        }`}
                      >
                        <span className="text-[14px] text-ink">{item.label}</span>
                        <span className="mono shrink-0 text-[11px] text-ink-4">
                          {item.id === "copy-email" && copied ? (
                            <span className="flex items-center gap-1 text-accent-ink">
                              <IconCheck className="size-3" /> copied
                            </span>
                          ) : (
                            item.hint
                          )}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
