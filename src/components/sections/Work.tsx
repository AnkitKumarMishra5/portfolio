"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { caseStudies, type CaseStudy } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { SpotlightCard } from "../ui/Spotlight";
import { Reveal } from "../ui/Reveal";
import { SectionTexture } from "../ui/SectionTexture";
import { LogStream } from "../ui/LogStream";

const CARD_WIDTH = 440;
const CARD_GAP = 20;
const TRACK_FIXED =
  caseStudies.length * CARD_WIDTH + (caseStudies.length - 1) * CARD_GAP + 96 + 96;

function Card({
  item,
  index,
  widthClass = "w-[86vw] shrink-0 sm:w-[440px]",
}: {
  item: CaseStudy;
  index: number;
  widthClass?: string;
}) {
  return (
    <SpotlightCard
      className={`card-hair flex h-full flex-col justify-between p-7 sm:p-8 ${widthClass}`}
    >
      <div>
        <div className="mb-7 flex items-start justify-between gap-4">
          <span className="rounded-full border border-line-2 bg-surface-2/60 px-3 py-1 text-[11px] text-ink-2">
            {item.tag}
          </span>
          <span className="mono text-[11px] text-ink-4">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {item.metric ? (
          <p className="mono mb-1 text-[clamp(1.8rem,3.4vw,2.5rem)] font-semibold tracking-[-0.03em] text-accent-ink">
            {item.metric}
          </p>
        ) : null}
        {item.metricLabel ? (
          <p className="mb-6 text-[12.5px] text-ink-4">{item.metricLabel}</p>
        ) : null}

        <h3 className="text-[21px] font-medium leading-[1.25] tracking-[-0.02em] text-ink">
          {item.title}
        </h3>
        <p className="mono mt-1.5 text-[12px] text-ink-3">{item.where}</p>

        <div className="mt-6 space-y-3.5">
          {item.context ? (
            <p className="text-[14px] leading-relaxed text-ink-3">
              <span className="label mr-2 text-[9.5px]">Context</span>
              {item.context}
            </p>
          ) : null}
          <p className="text-[14px] leading-relaxed text-ink-2">
            <span className="label mr-2 text-[9.5px]">Did</span>
            {item.did}
          </p>
        </div>
      </div>

      <p className="mt-7 border-t border-line pt-4 text-[14px] leading-relaxed text-ink">
        <span className="label mr-2 text-[9.5px]">Outcome</span>
        {item.outcome}
      </p>
    </SpotlightCard>
  );
}

export function Work() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 96));
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 400);

    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.0005,
  });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const progress = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section id="work" className="relative scroll-mt-24">
      <SectionTexture
        variant="dots"
        fade="top"
        opacity={0.5}
        glows={[{ className: "left-[-10%] top-[-6%] h-[420px] w-[40%]", color: "var(--glow-a)" }]}
      />
      <div className="px-6 pb-4 pt-24 sm:pt-32">
        <div className="mx-auto grid w-full max-w-6xl gap-10 xl:grid-cols-[1fr_320px]">
          <SectionHeading
            index="03"
            kicker="Selected work"
            title="Systems I built and owned,"
            accent="end to end."
            intro="Eight pieces of production work on platforms handling live investor funds and regulated onboarding. Every number here is one I shipped."
          />

          <div className="relative hidden min-h-[380px] xl:block">
            <LogStream
              variant="transcript"
              className="inset-0 h-full"
              duration={58}
            />
          </div>
        </div>
      </div>

      <div
        ref={wrapRef}
        className="relative hidden md:block"
        // One viewport to pin, plus the horizontal distance to travel.
        style={{ height: `calc(100vh + max(0px, max(1.5rem, (100vw - 72rem) / 2) + ${TRACK_FIXED}px - 100vw))` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-5 pl-[max(1.5rem,calc((100vw-72rem)/2))] pr-24"
          >
            {caseStudies.map((item, i) => (
              <Card key={item.id} item={item} index={i} />
            ))}
          </motion.div>

          <div className="pointer-events-none absolute inset-x-0 bottom-12 mx-auto w-full max-w-6xl px-6">
            <div className="flex items-center gap-4">
              <span className="mono text-[11px] text-ink-4">01</span>
              <div className="relative h-px flex-1 bg-line-2">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent"
                  style={{ width: progress }}
                />
              </div>
              <span className="mono text-[11px] text-ink-4">
                {String(caseStudies.length).padStart(2, "0")}
              </span>
            </div>
            <p className="label mt-3 text-[9px]">Scroll to advance</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-20 pt-10 md:hidden">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
          {caseStudies.map((item, i) => (
            <Reveal key={item.id} delay={0.04} amount={0.15}>
              <Card item={item} index={i} widthClass="w-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
