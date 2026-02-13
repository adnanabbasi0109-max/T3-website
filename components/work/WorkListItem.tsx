"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { CaseStudyDoc } from "../../lib/utils";

export default function WorkListItem({ cs }: { cs: CaseStudyDoc }) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  return (
    <Link
      href={`/work/${cs.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <article className="relative grid items-start gap-4 py-10 sm:grid-cols-[1fr_auto] sm:gap-8 lg:grid-cols-[1fr_280px]">
        {/* Left: title + meta */}
        <div className="min-w-0">
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
            <span>{cs.client || "Client"}</span>
            <span className="h-px w-4 bg-neutral-300" />
            <span>{cs.year || ""}</span>
          </div>

          <h3 className="mt-3 text-[clamp(1.25rem,3vw,2rem)] font-bold leading-[1.15] tracking-[-0.02em] transition-colors duration-300 group-hover:text-gold">
            {cs.title}
          </h3>

          {/* Tags */}
          {cs.domains && cs.domains.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {cs.domains.slice(0, 2).map((d) => (
                <span
                  key={d}
                  className="text-[11px] font-medium uppercase tracking-[0.1em] text-neutral-400"
                >
                  {d}
                </span>
              ))}
            </div>
          )}

          {/* Hover-reveal: outcomes preview */}
          <AnimatePresence>
            {hovered && !reduced && cs.outcomes && cs.outcomes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-4 flex flex-col gap-1">
                  {cs.outcomes.slice(0, 2).map((o, i) => (
                    <p key={i} className="text-[13px] leading-relaxed text-neutral-500">
                      &mdash; {o}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: image thumbnail on hover (desktop) */}
        <div className="hidden overflow-hidden rounded-lg lg:block">
          {cs.heroImage ? (
            <div className="relative aspect-[4/3] w-[280px] overflow-hidden rounded-lg bg-neutral-100">
              <img
                src={cs.heroImage}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="flex aspect-[4/3] w-[280px] items-center justify-center rounded-lg bg-neutral-50">
              <span className="text-4xl font-bold text-neutral-200">
                {cs.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Featured dot */}
        {cs.featured && (
          <div className="absolute right-0 top-10 hidden sm:block lg:hidden">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
          </div>
        )}
      </article>

      {/* Hairline divider */}
      <div className="h-px bg-neutral-200/70 transition-colors duration-300 group-hover:bg-gold/30" />
    </Link>
  );
}
