"use client";

import Link from "next/link";
import type { CaseStudyDoc } from "../../lib/utils";

export default function FeaturedWorkCard({ cs }: { cs: CaseStudyDoc }) {
  return (
    <Link href={`/work/${cs.slug}`} className="group block">
      <div className="overflow-hidden rounded-[0.5rem] bg-paper-dim">
        {cs.heroImage ? (
          <img
            src={cs.heroImage}
            alt={cs.title}
            className="aspect-[16/10] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex aspect-[16/10] items-center justify-center">
            <span className="font-display text-[5rem] text-ink/[0.03]">
              {cs.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="mt-7">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-light">
          {cs.client || "Client"}
          {cs.year && <span className="ml-2 text-muted-light/50">{cs.year}</span>}
        </p>
        <h3 className="mt-2.5 font-display text-[clamp(1.25rem,2.5vw,1.75rem)] tracking-[-0.025em] transition-colors duration-500 group-hover:text-accent">
          {cs.title}
        </h3>
        {cs.domains && cs.domains.length > 0 && (
          <p className="mt-2.5 text-[12px] text-muted-light">
            {cs.domains.slice(0, 3).join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
}
