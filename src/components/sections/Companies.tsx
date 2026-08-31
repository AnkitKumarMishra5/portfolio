"use client";

import { motion } from "motion/react";
import { companies } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Companies() {
  return (
    <section className="relative px-6 pt-20 sm:pt-24">
      <div className="mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="label mb-7 text-center"
        >
          Production systems shipped at
        </motion.p>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {companies.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
              className="group relative bg-bg px-5 py-7 text-center transition-colors duration-500 hover:bg-surface/70"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-center scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
              />
              <p className="text-[16px] font-medium tracking-[-0.02em] text-ink-2 transition-colors duration-300 group-hover:text-ink sm:text-[17px]">
                {c.name}
              </p>
              <p className="mt-1.5 text-[12px] text-ink-4">{c.detail}</p>
              <p className="mono mt-3 text-[10.5px] text-ink-4/80">{c.years}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
