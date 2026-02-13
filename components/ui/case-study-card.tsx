"use client";

import Link from "next/link";
import type { CaseStudyDoc } from "../../lib/utils";

export default function CaseStudyCard({ cs }: { cs: CaseStudyDoc }) {
  return (
    <Link href={`/work/${cs.slug}`} className="group block">
      {/* Image */}
      {cs.heroImage ? (
        <div className="aspect-[3/2] overflow-hidden rounded-md bg-neutral-100">
          <img
            src={cs.heroImage}
            alt={cs.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex aspect-[3/2] items-center justify-center rounded-md bg-neutral-100">
          <span className="text-6xl font-extrabold text-neutral-200/70">
            {cs.title.charAt(0)}
          </span>
        </div>
      )}

      {/* Meta */}
      <div className="mt-5">
        <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.15em] text-muted">
          <span>{cs.client || "Client"}</span>
          {cs.year && (
            <>
              <span className="h-px w-3 bg-border" />
              <span>{cs.year}</span>
            </>
          )}
        </div>
        <h3 className="mt-2.5 text-[19px] font-bold leading-[1.25] tracking-[-0.02em] transition-colors duration-300 group-hover:text-gold">
          {cs.title}
        </h3>
      </div>
    </Link>
  );
}
