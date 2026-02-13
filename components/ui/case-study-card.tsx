"use client";

import Link from "next/link";
import type { CaseStudyDoc } from "../../lib/utils";

export default function CaseStudyCard({ cs }: { cs: CaseStudyDoc }) {
  return (
    <Link
      href={`/work/${cs.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white transition-all duration-300 hover:border-neutral-200 hover:shadow-lg hover:shadow-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:shadow-neutral-900/50"
    >
      {/* Image */}
      {cs.heroImage ? (
        <div className="aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <img
            src={cs.heroImage}
            alt={cs.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center bg-neutral-50 dark:bg-neutral-800">
          <span className="text-5xl font-bold text-neutral-200 dark:text-neutral-700">
            {cs.title.charAt(0)}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500">
          <span>{cs.client || "Client"}</span>
          <span>{cs.year || ""}</span>
        </div>

        <h3 className="mt-2 text-base font-semibold tracking-tight transition-colors group-hover:text-gold">
          {cs.title}
        </h3>

        {cs.domains && cs.domains.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {cs.domains.slice(0, 3).map((d) => (
              <span
                key={d}
                className="rounded-full bg-neutral-50 px-2.5 py-0.5 text-[11px] text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
              >
                {d}
              </span>
            ))}
          </div>
        )}

        {cs.featured && (
          <div className="mt-auto pt-3">
            <span className="inline-flex items-center gap-1 text-xs text-gold">
              <svg
                className="h-3 w-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
