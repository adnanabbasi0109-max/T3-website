"use client";

import Link from "next/link";
import type { CaseStudyDoc } from "../../lib/utils";

export default function WorkListItem({ cs }: { cs: CaseStudyDoc }) {
  return (
    <Link href={`/work/${cs.slug}`} className="group block">
      {/* Image */}
      <div className="aspect-[3/2] overflow-hidden rounded-lg bg-paper-warm">
        {cs.heroImage ? (
          <img
            src={cs.heroImage}
            alt={cs.title}
            className="h-full w-full object-cover transition-all duration-700 ease-out grayscale group-hover:scale-[1.06] group-hover:grayscale-0"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-[4rem] text-border/30">
              {cs.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="mt-6">
        <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.15em] text-muted">
          <span>{cs.client || "Client"}</span>
          {cs.year && (
            <>
              <span className="h-px w-3 bg-border" />
              <span>{cs.year}</span>
            </>
          )}
        </div>

        <h3 className="mt-3 font-display text-[clamp(1.1rem,2vw,1.4rem)] tracking-[-0.02em] transition-colors duration-300 group-hover:text-gold">
          {cs.title}
        </h3>

        {/* Tags */}
        {cs.domains && cs.domains.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
            {cs.domains.slice(0, 2).map((d) => (
              <span
                key={d}
                className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted/60"
              >
                {d}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
