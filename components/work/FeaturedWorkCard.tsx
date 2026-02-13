"use client";

import Link from "next/link";
import type { CaseStudyDoc } from "../../lib/utils";
import ParallaxImage from "../motion/ParallaxImage";

export default function FeaturedWorkCard({ cs }: { cs: CaseStudyDoc }) {
  return (
    <Link
      href={`/work/${cs.slug}`}
      className="group relative block overflow-hidden rounded-lg"
    >
      {cs.heroImage ? (
        <ParallaxImage
          src={cs.heroImage}
          alt={cs.title}
          aspect="aspect-[21/9]"
          grayscale
        />
      ) : (
        <div className="flex aspect-[21/9] items-center justify-center bg-paper-warm">
          <span className="font-display text-[8rem] text-border/30">
            {cs.title.charAt(0)}
          </span>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent transition-opacity duration-500 group-hover:from-ink/70" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 sm:p-10 lg:p-14">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-paper/60">
          {cs.client || "Client"}
          {cs.year && ` · ${cs.year}`}
        </p>
        <h3 className="mt-4 font-display text-[clamp(1.5rem,3vw,2.5rem)] tracking-[-0.02em] text-paper transition-transform duration-500 group-hover:-translate-y-1">
          {cs.title}
        </h3>
        {cs.domains && cs.domains.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {cs.domains.slice(0, 3).map((d) => (
              <span
                key={d}
                className="rounded-full border border-paper/20 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-paper/50"
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
