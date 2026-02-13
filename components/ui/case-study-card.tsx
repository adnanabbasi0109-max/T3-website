"use client";

import Link from "next/link";
import type { CaseStudyDoc } from "../../lib/utils";

type Props = {
  cs: CaseStudyDoc;
  size?: "default" | "large" | "compact";
};

const ASPECT: Record<string, string> = {
  default: "aspect-[14/9]",
  large: "aspect-[14/9]",
  compact: "aspect-[1/1]",
};

const RADIUS: Record<string, string> = {
  default: "rounded-[1.375rem]",
  large: "rounded-[1.375rem]",
  compact: "rounded-[0.875rem]",
};

export default function CaseStudyCard({ cs, size = "default" }: Props) {
  return (
    <Link href={`/work/${cs.slug}`} className="group block">
      {/* Image — Off+Brand 14:9 cinematic + generous radius + scale hover */}
      <div className={`overflow-hidden bg-paper-warm ${ASPECT[size]} ${RADIUS[size]}`}>
        {cs.heroImage ? (
          <img
            src={cs.heroImage}
            alt={cs.title}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.08]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-ink-light">
            <span className="font-display text-[4rem] text-paper/20">
              {cs.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Meta — project name + category symbols */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3
            className={`font-sans font-semibold tracking-[-0.015em] transition-colors duration-500 group-hover:text-accent ${
              size === "compact"
                ? "text-[15px]"
                : "text-[17px] sm:text-[19px]"
            }`}
          >
            {cs.title}
          </h3>
          {cs.domains && cs.domains.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {cs.domains.slice(0, 2).map((d) => (
                <span key={d} className="text-[11px] text-muted">
                  {d}
                </span>
              ))}
            </div>
          )}
        </div>
        {cs.year && (
          <span className="shrink-0 pt-0.5 text-[11px] font-medium text-muted-light">
            {cs.year}
          </span>
        )}
      </div>
    </Link>
  );
}
