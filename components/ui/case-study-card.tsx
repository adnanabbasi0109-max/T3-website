"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CaseStudyDoc } from "../../lib/utils";

export default function CaseStudyCard({ cs }: { cs: CaseStudyDoc }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Link
        href={`/work/${cs.slug}`}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-500 hover:border-neutral-300 hover:shadow-xl hover:shadow-black/[0.04] dark:border-border-dark dark:bg-neutral-900 dark:hover:border-neutral-600 dark:hover:shadow-black/20"
      >
        {/* Image */}
        {cs.heroImage ? (
          <div className="aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <img
              src={cs.heroImage}
              alt={cs.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="flex aspect-[16/10] items-center justify-center bg-neutral-50 dark:bg-neutral-800/50">
            <span className="font-editorial text-6xl font-bold text-neutral-200/80 dark:text-neutral-700">
              {cs.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              {cs.client || "Client"}
            </span>
            <span className="font-mono text-[10px] text-muted">
              {cs.year || ""}
            </span>
          </div>

          <h3 className="mt-3 text-[17px] font-semibold leading-snug tracking-tight transition-colors group-hover:text-gold">
            {cs.title}
          </h3>

          {cs.domains && cs.domains.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {cs.domains.slice(0, 3).map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-medium text-muted transition-colors group-hover:border-gold/20 group-hover:text-gold dark:border-border-dark"
                >
                  {d}
                </span>
              ))}
            </div>
          )}

          {cs.featured && (
            <div className="mt-auto pt-4">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-gold">
                <span className="inline-block h-1 w-1 rounded-full bg-gold" />
                Featured
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
