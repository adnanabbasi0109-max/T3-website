"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { CaseStudyDoc } from "../../lib/utils";

const ease: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

export default function WorkstoryPreview({
  items,
}: {
  items: CaseStudyDoc[];
}) {
  const [active, setActive] = useState(0);
  const current = items[active];

  if (items.length === 0) return null;

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
      {/* Left — editorial list */}
      <div className="flex flex-col">
        {items.map((cs, i) => (
          <Link
            key={cs.slug}
            href={`/work/${cs.slug}`}
            className="group block"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <div
              className={`flex items-baseline gap-5 border-b border-border py-6 transition-all duration-500 sm:py-7 ${
                active === i ? "opacity-100" : "opacity-40 hover:opacity-70"
              }`}
            >
              <span className="shrink-0 text-[12px] font-medium tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <h3 className="font-display text-[clamp(1.15rem,2vw,1.5rem)] tracking-[-0.02em] transition-colors duration-500 group-hover:text-accent">
                  {cs.title}
                </h3>
                <p className="mt-1 text-[12px] text-muted-light">
                  {cs.client || ""}
                  {cs.client && cs.year ? " · " : ""}
                  {cs.year || ""}
                </p>
              </div>
              <span className="hidden text-[12px] text-muted-light transition-transform duration-500 group-hover:translate-x-1 sm:inline">
                &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Right — preview panel */}
      <div className="hidden lg:block">
        <div className="sticky top-[120px]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[0.5rem] bg-paper-dim">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.4, ease }}
                className="absolute inset-0"
              >
                {current.heroImage ? (
                  <img
                    src={current.heroImage}
                    alt={current.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-display text-[6rem] text-ink/[0.03]">
                      {current.title.charAt(0)}
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.slug + "-meta"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="mt-6"
            >
              {current.domains && current.domains.length > 0 && (
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-light">
                  {current.domains.slice(0, 3).join(" · ")}
                </p>
              )}
              {current.outcomes && current.outcomes.length > 0 && (
                <p className="mt-3 text-[14px] leading-[1.7] text-muted">
                  {current.outcomes[0]}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
