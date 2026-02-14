"use client";

import Link from "next/link";
import type { CaseStudyDoc } from "../../lib/utils";

type Props = {
  cs: CaseStudyDoc;
  size?: "default" | "large" | "compact";
};

const ASPECT: Record<string, string> = {
  default: "aspect-[16/10]",
  large: "aspect-[16/10]",
  compact: "aspect-[4/3]",
};

export default function CaseStudyCard({ cs, size = "default" }: Props) {
  return (
    <Link href={`/work/${cs.slug}`} className="group block">
      <div
        className={`overflow-hidden rounded-[0.5rem] bg-paper-dim transition-shadow duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:shadow-card-hover ${ASPECT[size]}`}
      >
        {cs.heroImage ? (
          <img
            src={cs.heroImage}
            alt={cs.title}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-paper-dim">
            <span className="font-display text-[4rem] text-ink/[0.03]">
              {cs.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h3
            className={`font-sans font-semibold tracking-[-0.02em] transition-colors duration-500 group-hover:text-accent ${
              size === "compact" ? "text-[15px]" : "text-[17px] sm:text-[19px]"
            }`}
          >
            {cs.title}
          </h3>
          {cs.domains && cs.domains.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              {cs.domains.slice(0, 2).map((d) => (
                <span key={d} className="text-[11px] text-muted-light">
                  {d}
                </span>
              ))}
            </div>
          )}
        </div>
        {cs.year && (
          <span className="shrink-0 pt-0.5 text-[11px] font-medium tabular-nums text-muted-light">
            {cs.year}
          </span>
        )}
      </div>
    </Link>
  );
}
