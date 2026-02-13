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
      <article className="relative grid items-start gap-4 py-9 sm:grid-cols-[1fr_auto] sm:gap-8 lg:grid-cols-[1fr_260px] lg:py-12">
        {/* Left: title + meta */}
        <div className="min-w-0">
          <div className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
            <span>{cs.client || "Client"}</span>
            <span className="h-px w-4 bg-border" />
            <span>{cs.year || ""}</span>
            {cs.featured && (
              <>
                <span className="h-px w-4 bg-border" />
                <span className="text-gold">Featured</span>
              </>
            )}
          </div>

          <h3 className="mt-3 text-[clamp(1.2rem,2.5vw,1.75rem)] font-bold leading-[1.2] tracking-[-0.02em] transition-colors duration-300 group-hover:text-gold">
            {cs.title}
          </h3>

          {/* Tags */}
          {cs.domains && cs.domains.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {cs.domains.slice(0, 3).map((d) => (
                <span
                  key={d}
                  className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted/70"
                >
                  {d}
                </span>
              ))}
            </div>
          )}

          {/* Hover-reveal: outcomes */}
          <AnimatePresence>
            {hovered &&
              !reduced &&
              cs.outcomes &&
              cs.outcomes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 flex flex-col gap-1.5">
                    {cs.outcomes.slice(0, 2).map((o, i) => (
                      <p
                        key={i}
                        className="text-[13px] leading-relaxed text-muted"
                      >
                        &mdash;&ensp;{o}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
          </AnimatePresence>
        </div>

        {/* Right: image thumbnail (desktop) */}
        <div className="hidden overflow-hidden rounded-md lg:block">
          {cs.heroImage ? (
            <div className="relative aspect-[4/3] w-[260px] overflow-hidden rounded-md bg-neutral-100">
              <img
                src={cs.heroImage}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="flex aspect-[4/3] w-[260px] items-center justify-center rounded-md bg-neutral-100">
              <span className="text-4xl font-extrabold text-neutral-200/70">
                {cs.title.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </article>

      {/* Hairline divider */}
      <div className="h-px bg-border transition-colors duration-500 group-hover:bg-gold/25" />
    </Link>
  );
}
