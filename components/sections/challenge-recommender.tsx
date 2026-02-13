"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CHALLENGE_CATEGORIES } from "../../lib/utils";
import type { CaseStudyDoc } from "../../lib/utils";

export default function ChallengeRecommender({
  allItems,
}: {
  allItems: CaseStudyDoc[];
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const matches = selected
    ? allItems
        .filter((cs) => (cs.domains || []).some((d) => d === selected))
        .slice(0, 3)
    : [];

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {CHALLENGE_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() =>
              setSelected(selected === cat.domain ? null : cat.domain)
            }
            className={`rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all duration-300 ${
              selected === cat.domain
                ? "border-gold bg-gold text-white"
                : "border-border bg-white text-neutral-600 hover:border-gold hover:text-gold dark:border-border-dark dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-gold"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selected && matches.length > 0 && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-8 grid gap-4 sm:grid-cols-3"
          >
            {matches.map((cs) => (
              <Link
                key={cs.slug}
                href={`/work/${cs.slug}`}
                className="group rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:border-neutral-300 hover:shadow-lg hover:shadow-black/[0.03] dark:border-border-dark dark:bg-neutral-900 dark:hover:border-neutral-600"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {cs.client}
                </p>
                <h4 className="mt-2 text-[15px] font-semibold tracking-tight transition-colors group-hover:text-gold">
                  {cs.title}
                </h4>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(cs.domains || []).slice(0, 2).map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted dark:border-border-dark"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {selected && matches.length === 0 && (
        <p className="mt-6 text-sm text-muted">
          No case studies in this category yet. Explore{" "}
          <Link href="/work" className="text-gold underline">
            all workstories
          </Link>
          .
        </p>
      )}
    </div>
  );
}
