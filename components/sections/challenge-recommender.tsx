"use client";

import Link from "next/link";
import { useState } from "react";
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
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
              selected === cat.domain
                ? "border-gold bg-gold text-white"
                : "border-neutral-200 bg-white text-neutral-700 hover:border-gold hover:text-gold dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-gold"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {selected && matches.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {matches.map((cs) => (
            <Link
              key={cs.slug}
              href={`/work/${cs.slug}`}
              className="group rounded-2xl border border-neutral-100 bg-white p-5 transition-all hover:border-neutral-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
            >
              <p className="text-xs text-neutral-400">{cs.client}</p>
              <h4 className="mt-1 font-semibold transition-colors group-hover:text-gold">
                {cs.title}
              </h4>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(cs.domains || []).slice(0, 2).map((d) => (
                  <span
                    key={d}
                    className="rounded-full bg-neutral-50 px-2 py-0.5 text-[11px] text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}

      {selected && matches.length === 0 && (
        <p className="mt-6 text-sm text-neutral-500">
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
