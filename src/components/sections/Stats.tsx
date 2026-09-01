"use client";

import { stats } from "@/lib/data";
import { Counter } from "../ui/Counter";
import { Reveal } from "../ui/Reveal";
import { SpotlightCard } from "../ui/Spotlight";

export function Stats() {
  return (
    <section className="relative px-6 pb-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat, i) => {
            const value = (
              <p
                className={`mono shrink-0 font-semibold tracking-[-0.03em] text-ink ${
                  stat.wide
                    ? "text-[clamp(2.2rem,5.4vw,3.4rem)]"
                    : "text-[clamp(1.7rem,3.6vw,2.3rem)]"
                }`}
              >
                {stat.display ? (
                  stat.display
                ) : stat.prefix ? (
                  <>
                    <span className="text-accent-ink">{stat.prefix}</span>
                    <Counter to={stat.value!} suffix={stat.suffix} format={false} />
                  </>
                ) : (
                  <Counter to={stat.value!} suffix={stat.suffix ?? ""} />
                )}
              </p>
            );

            return (
              <Reveal
                key={stat.label}
                delay={i * 0.05}
                className={stat.wide ? "col-span-2" : undefined}
              >
                <SpotlightCard className="card-hair h-full p-5 sm:p-6">
                  {stat.wide ? (
                    <div className="flex items-center gap-5 sm:gap-8">
                      {value}
                      <p className="max-w-xl text-[14px] leading-snug text-ink-3">
                        {stat.label}
                      </p>
                    </div>
                  ) : (
                    <>
                      {value}
                      <p className="mt-2 text-[13px] leading-snug text-ink-3">
                        {stat.label}
                      </p>
                    </>
                  )}
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
