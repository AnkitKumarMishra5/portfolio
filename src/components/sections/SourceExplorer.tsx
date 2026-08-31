"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { agentTranscript, sourceFiles } from "@/lib/data";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-3 shrink-0 text-ink-4 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function JsonLine({ line }: { line: string }) {
  const parts = line.split(/("(?:[^"\\]|\\.)*")/g);
  return (
    <>
      {parts.map((part, i) => {
        if (!part.startsWith('"')) {
          return (
            <span key={i} className="text-ink-4">
              {part}
            </span>
          );
        }
        const isKey = (parts[i + 1] ?? "").trimStart().startsWith(":");
        return (
          <span key={i} className={isKey ? "text-accent-ink" : "text-success-ink"}>
            {part}
          </span>
        );
      })}
    </>
  );
}

export function SourceExplorer() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<Record<string, boolean>>({
    profile: true,
    work: true,
    stack: true,
  });

  const folders = useMemo(() => {
    const map = new Map<string, typeof sourceFiles>();
    const root: typeof sourceFiles = [];
    sourceFiles.forEach((f) => {
      if (!f.folder) return root.push(f);
      if (!map.has(f.folder)) map.set(f.folder, []);
      map.get(f.folder)!.push(f);
    });
    return { map, root };
  }, []);

  const file = sourceFiles[active];
  const lines = file.code.split("\n");
  const path = file.folder ? `${file.folder}/${file.name}` : file.name;

  const FileRow = ({ f, nested }: { f: (typeof sourceFiles)[number]; nested: boolean }) => {
    const i = sourceFiles.indexOf(f);
    const isActive = i === active;
    return (
      <button
        onClick={() => setActive(i)}
        aria-current={isActive ? "true" : undefined}
        className={`mono flex min-h-[34px] w-full items-center gap-2 rounded-md px-2 text-left text-[11.5px] transition-colors duration-200 ${
          nested ? "pl-6" : ""
        } ${isActive ? "bg-surface-3/85 text-ink" : "text-ink-3 hover:bg-surface-3/40 hover:text-ink-2"}`}
      >
        <span className="text-[8px] text-success-ink">{"{ }"}</span>
        {f.name}
      </button>
    );
  };

  return (
    <Section id="source">
      <SectionHeading
        index="05"
        kicker="Source"
        title="If you would rather read"
        accent="the JSON."
        intro="The same facts as the rest of this page, structured. Click through the tree. There are terminal logs and agent transcripts hiding in the quieter sections too, if you go looking."
      />

      <Reveal y={28} className="mt-12">
        <div className="term-shell card card-hair overflow-hidden">
          <div className="flex items-center gap-2 border-b border-line bg-surface-2/70 px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-ink-4/45" />
              <span className="size-2.5 rounded-full bg-ink-4/45" />
              <span className="size-2.5 rounded-full bg-ink-4/45" />
            </span>
            <span className="mono mx-auto hidden truncate text-[11px] text-ink-3 sm:block">
              ankitkumarmishra
            </span>
            <span className="mono rounded border border-line-2 px-1.5 py-0.5 text-[9px] text-ink-4">
              Agent
            </span>
          </div>

          <div className="grid lg:grid-cols-[180px_1fr_260px]">
            {/* explorer */}
            <div className="min-w-0 border-b border-line p-2 lg:border-b-0 lg:border-r">
              <p className="label px-2 pb-2 pt-1 text-[9px]">Explorer</p>
              <div className="flex min-w-0 gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
                {[...folders.map.entries()].map(([name, files]) => (
                  <div key={name} className="shrink-0 lg:shrink">
                    <button
                      onClick={() => setOpen((o) => ({ ...o, [name]: !o[name] }))}
                      className="mono flex min-h-[34px] w-full items-center gap-1.5 rounded-md px-2 text-[11.5px] text-ink-2 transition-colors hover:bg-surface-3/40"
                    >
                      <Chevron open={!!open[name]} />
                      <span className="text-[10px] text-accent-ink">▸</span>
                      {name}
                    </button>
                    {open[name] &&
                      files.map((f) => <FileRow key={f.name} f={f} nested />)}
                  </div>
                ))}
                {folders.root.map((f) => (
                  <FileRow key={f.name} f={f} nested={false} />
                ))}
              </div>
            </div>

            {/* editor */}
            <div className="min-w-0 border-b border-line lg:border-b-0">
              <div className="flex items-center gap-2 border-b border-line px-4 py-2">
                <span className="mono truncate text-[11px] text-ink-3">{path}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={path}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.26, ease: EASE }}
                >
                  <div className="mono flex min-h-[300px] gap-4 overflow-x-auto p-4 text-[11.5px] leading-[1.75] sm:text-[12.5px]">
                    <div className="select-none text-right text-ink-4/50">
                      {lines.map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                    <div className="min-w-0">
                      {lines.map((line, i) => (
                        <div key={i} className="whitespace-pre">
                          {line ? <JsonLine line={line} /> : " "}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="border-t border-line px-4 py-3 text-[13px] text-ink-3">
                    {file.blurb}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* agent panel */}
            <div className="hidden flex-col lg:flex lg:border-l lg:border-line">
              <div className="flex items-center gap-2 border-b border-line px-3 py-2">
                <span className="live-dot size-1.5 rounded-full bg-accent" />
                <span className="mono text-[10.5px] text-ink-3">agent</span>
              </div>
              <div className="space-y-3 p-3">
                {agentTranscript.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: i * 0.09, ease: EASE }}
                    className="mono text-[10.5px] leading-[1.6]"
                  >
                    {t.role === "user" ? (
                      <p className="text-ink">
                        <span className="text-accent-ink">❯ </span>
                        {t.text}
                      </p>
                    ) : t.role === "tool" ? (
                      <p className="text-success-ink">· {t.text}</p>
                    ) : (
                      <p className="text-ink-3">{t.text}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-line">
            <div className="flex items-center gap-4 border-b border-line px-4 py-2">
              <span className="mono text-[10px] uppercase tracking-[0.14em] text-ink">
                Terminal
              </span>
              <span className="mono hidden text-[10px] uppercase tracking-[0.14em] text-ink-4 sm:inline">
                Problems
              </span>
              <span className="mono hidden text-[10px] uppercase tracking-[0.14em] text-ink-4 sm:inline">
                Output
              </span>
              <span className="mono ml-auto text-[10px] text-ink-4">zsh</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`term-${path}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mono max-h-[190px] overflow-y-auto p-4 text-[11.5px] leading-[1.7]"
              >
                <p className="mb-1">
                  <span className="text-success-ink">ankit@macbook</span>
                  <span className="text-accent-ink"> ~/ankitkumarmishra</span>
                  <span className="text-ink-4"> % </span>
                  <span className="text-ink">{file.cmd}</span>
                </p>
                {file.out.map((line, i) => (
                  <p key={i} className="whitespace-pre text-ink-3">
                    {line}
                  </p>
                ))}
                <p className="mt-1">
                  <span className="text-success-ink">ankit@macbook</span>
                  <span className="text-accent-ink"> ~/ankitkumarmishra</span>
                  <span className="text-ink-4"> % </span>
                  <span className="caret text-accent-ink">▍</span>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
