"use client";

import Link from "next/link";
import type { CaseStudyDoc } from "../../lib/utils";

type Props = {
  cs: CaseStudyDoc;
  size?: "default" | "large" | "compact";
};

const ASPECT: Record<string, string> = {
  default: "aspect-[3/2]",
  large: "aspect-[4/5]",
  compact: "aspect-[1/1]",
};

export default function CaseStudyCard({ cs, size = "default" }: Props) {
  return (
    <Link href={`/work/${cs.slug}`} className="group block">
      {/* Image */}
      <div className={`overflow-hidden rounded-sm bg-paper-warm ${ASPECT[size]}`}>
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
        <h3
          className={`mt-1.5 font-display tracking-[-0.02em] transition-colors duration-300 group-hover:text-gold ${
            size === "compact"
              ? "text-[15px]"
              : size === "large"
                ? "text-[clamp(1rem,1.8vw,1.35rem)]"
                : "text-[17px]"
          }`}
        >
          {cs.title}
        </h3>
      </div>
    </Link>
  );
}
