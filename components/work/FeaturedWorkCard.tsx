"use client";

import Link from "next/link";
import type { CaseStudyDoc } from "../../lib/utils";

export default function FeaturedWorkCard({ cs }: { cs: CaseStudyDoc }) {
  return (
    <Link href={`/work/${cs.slug}`} className="group block">
      {/* Image */}
      <div className="overflow-hidden rounded-sm bg-paper-warm">
        {cs.heroImage ? (
          <img
            src={cs.heroImage}
            alt={cs.title}
            className="aspect-[2.2/1] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="flex aspect-[2.2/1] items-center justify-center">
            <span className="font-display text-[6rem] text-border/20">
              {cs.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="mt-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
          {cs.client || "Client"}
          {cs.year && ` · ${cs.year}`}
        </p>
        <h3 className="mt-2 font-display text-[clamp(1.25rem,2.5vw,2rem)] tracking-[-0.02em] transition-colors duration-300 group-hover:text-gold">
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
