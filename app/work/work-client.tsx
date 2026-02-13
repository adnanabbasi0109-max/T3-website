"use client";

import { useMemo, useState } from "react";
import type { CaseStudyDoc } from "../../lib/utils";
import WorkListItem from "../../components/work/WorkListItem";
import Reveal from "../../components/motion/Reveal";

type SortKey = "default" | "year-desc" | "year-asc" | "title";

export default function WorkClient({
  initialItems,
}: {
  initialItems: CaseStudyDoc[];
}) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("All");
  const [industry, setIndustry] = useState("All");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("default");

  const allDomains = useMemo(() => {
    const s = new Set<string>();
    initialItems.forEach((i) => (i.domains || []).forEach((d) => s.add(d)));
    return ["All", ...Array.from(s).sort()];
  }, [initialItems]);

  const allIndustries = useMemo(() => {
    const s = new Set<string>();
    initialItems.forEach((i) => (i.industries || []).forEach((d) => s.add(d)));
    return ["All", ...Array.from(s).sort()];
  }, [initialItems]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = initialItems
      .filter((i) => domain === "All" || (i.domains || []).includes(domain))
      .filter(
        (i) => industry === "All" || (i.industries || []).includes(industry)
      )
      .filter((i) => !featuredOnly || i.featured)
      .filter((i) => {
        if (!q) return true;
        const hay =
          `${i.title} ${i.client || ""} ${(i.domains || []).join(" ")} ${(i.industries || []).join(" ")}`.toLowerCase();
        return hay.includes(q);
      });

    switch (sortBy) {
      case "year-desc":
        list = [...list].sort((a, b) => (b.year || 0) - (a.year || 0));
        break;
      case "year-asc":
        list = [...list].sort((a, b) => (a.year || 0) - (b.year || 0));
        break;
      case "title":
        list = [...list].sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return list;
  }, [initialItems, query, domain, industry, featuredOnly, sortBy]);

  const hasFilters =
    domain !== "All" || industry !== "All" || featuredOnly || query.trim();

  function clearAll() {
    setQuery("");
    setDomain("All");
    setIndustry("All");
    setFeaturedOnly(false);
    setSortBy("default");
  }

  const selectClass =
    "appearance-none rounded-none border-b border-border bg-transparent pb-2 pr-6 text-[13px] outline-none transition-colors focus:border-surface-dark";

  return (
    <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
      {/* ── Filter bar — minimal, flat ── */}
      <div className="mt-16 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        {/* Search */}
        <div className="relative max-w-xs flex-1">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border-b border-border bg-transparent pb-2 text-[14px] outline-none transition-colors placeholder:text-neutral-400 focus:border-surface-dark"
            aria-label="Search workstories"
          />
        </div>

        {/* Selects */}
        <div className="flex flex-wrap items-end gap-5">
          <select value={domain} onChange={(e) => setDomain(e.target.value)} className={selectClass} aria-label="Domain">
            {allDomains.map((d) => (
              <option key={d} value={d}>{d === "All" ? "All Domains" : d}</option>
            ))}
          </select>

          <select value={industry} onChange={(e) => setIndustry(e.target.value)} className={selectClass} aria-label="Industry">
            {allIndustries.map((d) => (
              <option key={d} value={d}>{d === "All" ? "All Industries" : d}</option>
            ))}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortKey)} className={selectClass} aria-label="Sort">
            <option value="default">Featured</option>
            <option value="year-desc">Newest</option>
            <option value="year-asc">Oldest</option>
            <option value="title">A-Z</option>
          </select>

          <button
            onClick={() => setFeaturedOnly((v) => !v)}
            className={`border-b pb-2 text-[13px] transition-colors ${
              featuredOnly
                ? "border-gold text-gold"
                : "border-transparent text-muted hover:text-surface-dark"
            }`}
          >
            Featured only
          </button>
        </div>
      </div>

      {/* Filter hint */}
      {hasFilters && (
        <div className="mt-6 flex items-center justify-between text-[13px] text-muted">
          <span>{filtered.length} result{filtered.length !== 1 && "s"}</span>
          <button onClick={clearAll} className="text-gold transition hover:underline">Clear</button>
        </div>
      )}

      {/* ── Editorial list ── */}
      <div className="mt-10">
        <div className="h-px bg-border" />
        {filtered.map((cs, i) => (
          <Reveal key={cs.slug} delay={i * 0.04}>
            <WorkListItem cs={cs} />
          </Reveal>
        ))}
      </div>

      {/* Empty */}
      {filtered.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-muted">No workstories match your filters.</p>
          <button onClick={clearAll} className="mt-3 text-[13px] text-gold transition hover:underline">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
