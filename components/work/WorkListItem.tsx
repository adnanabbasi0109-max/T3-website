"use client";

import Link from "next/link";
import type { CaseStudyDoc } from "../../lib/utils";

export default function WorkListItem({ cs }: { cs: CaseStudyDoc }) {
  const firstOutcome = cs.outcomes?.[0];

  return (
    <Link href={`/work/${cs.slug}`} className="group block">
      <div className="grid items-center gap-6 py-9 sm:grid-cols-[1fr_auto] sm:gap-10 sm:py-11 lg:grid-cols-[1fr_200px] lg:py-14">
        {/* Text content */}
        <div>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="font-display text-[clamp(1.25rem,2.5vw,2rem)] tracking-[-0.025em] transition-colors duration-500 group-hover:text-accent">
              {cs.title}
            </h3>
            {cs.year && (
              <span className="text-[12px] font-medium tabular-nums text-muted-light">
                {cs.year}
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            {cs.client && (
              <span className="text-[13px] text-muted">{cs.client}</span>
            )}
            {cs.domains && cs.domains.length > 0 && (
              <>
                {cs.client && <span className="text-[11px] text-border-strong">·</span>}
                <span className="text-[12px] text-muted-light">
                  {cs.domains.slice(0, 2).join(", ")}
                </span>
              </>
            )}
          </div>

          {/* Hover teaser */}
          {firstOutcome && (
            <p className="mt-3 max-h-0 overflow-hidden text-[13px] leading-[1.75] text-muted-light opacity-0 transition-all duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:max-h-20 group-hover:opacity-100">
              {firstOutcome}
            </p>
          )}
        </div>

        {/* Small thumbnail */}
        {cs.heroImage && (
          <div className="hidden overflow-hidden rounded-[0.375rem] bg-paper-dim sm:block">
            <img
              src={cs.heroImage}
              alt=""
              className="aspect-[3/2] w-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.05]"
              loading="lazy"
            />
          </div>
        )}
      </div>

      <div className="divider-fade" />
    </Link>
  );
}
