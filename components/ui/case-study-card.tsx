"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CaseStudyCard({ cs, size = "default" }: Props) {
  const reduced = useReducedMotion();

  return (
    <Link href={`/work/${cs.slug}`} className="group block">
      {/* Image with clip-path reveal */}
      <div className={`overflow-hidden rounded-lg bg-paper-warm ${ASPECT[size]}`}>
        {cs.heroImage ? (
          <motion.div
            className="h-full w-full"
            initial={reduced ? {} : { clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0 0 0 0)" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease }}
          >
            <img
              src={cs.heroImage}
              alt={cs.title}
              className="h-full w-full object-cover transition-all duration-700 ease-out grayscale group-hover:scale-[1.04] group-hover:grayscale-0"
              loading="lazy"
            />
          </motion.div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-[4rem] text-border/40">
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
        <h3
          className={`mt-3 font-display tracking-[-0.02em] transition-colors duration-300 group-hover:text-gold ${
            size === "compact"
              ? "text-[16px]"
              : size === "large"
                ? "text-[clamp(1.1rem,2vw,1.5rem)]"
                : "text-[19px]"
          }`}
        >
          {cs.title}
        </h3>
      </div>
    </Link>
  );
}
