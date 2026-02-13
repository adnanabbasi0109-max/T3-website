"use client";

import Link from "next/link";
import type { CaseStudyDoc } from "../../lib/utils";

export default function WorkListItem({ cs }: { cs: CaseStudyDoc }) {
  return (
    <Link href={`/work/${cs.slug}`} className="group block">
      {/* Image */}
      <div className="aspect-[3/2] overflow-hidden rounded-sm bg-paper-warm">
        {cs.heroImage ? (
          <img
            src={cs.heroImage}
            alt={cs.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-[3rem] text-border/30">
              {cs.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="mt-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
          {cs.client || "Client"}
          {cs.year && ` · ${cs.year}`}
        </p>
        <h3 className="mt-1.5 font-display text-[17px] tracking-[-0.02em] transition-colors duration-300 group-hover:text-gold">
          {cs.title}
        </h3>
        {cs.domains && cs.domains.length > 0 && (
          <p className="mt-2 text-[11px] text-muted-light">
            {cs.domains.slice(0, 2).join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
}
