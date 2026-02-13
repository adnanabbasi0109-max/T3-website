"use client";

import Link from "next/link";
import type { CaseStudyDoc } from "../../lib/utils";

export default function CaseStudyCard({ cs }: { cs: CaseStudyDoc }) {
  return (
    <Link href={`/work/${cs.slug}`} className="group block">
      {/* Image */}
      {cs.heroImage ? (
        <div className="aspect-[3/2] overflow-hidden rounded-lg bg-neutral-100">
          <img
            src={cs.heroImage}
            alt={cs.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex aspect-[3/2] items-center justify-center rounded-lg bg-neutral-50">
          <span className="text-5xl font-bold text-neutral-200">
            {cs.title.charAt(0)}
          </span>
        </div>
      )}

      <div className="mt-5">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-neutral-400">
          <span>{cs.client || "Client"}</span>
          {cs.year && (
            <>
              <span className="h-px w-3 bg-neutral-300" />
              <span>{cs.year}</span>
            </>
          )}
        </div>
        <h3 className="mt-2 text-[18px] font-semibold leading-snug tracking-tight transition-colors duration-200 group-hover:text-gold">
          {cs.title}
        </h3>
      </div>
    </Link>
  );
}
