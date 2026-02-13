"use client";

import { useMemo, useState } from "react";
import type { CaseStudyDoc } from "../../lib/utils";
import CaseStudyCard from "../../components/ui/case-study-card";
import Reveal from "../../components/motion/Reveal";
import Container from "../../components/layout/Container";

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
    initialItems.forEach((i) =>
      (i.industries || []).forEach((d) => s.add(d))
    );
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

  const pillClass =
    "appearance-none rounded-full border border-border bg-transparent px-4 py-2.5 text-[12px] font-medium text-ink outline-none transition-all duration-500 focus:border-border-strong hover:border-border-strong cursor-pointer";

  return (
    <Container>
      {/* ── Filter bar ── */}
      <div className="pb-6">
        <div className="divider-fade mb-6" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative max-w-[280px] flex-1">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="glow-ring w-full rounded-full border border-border bg-transparent px-5 py-2.5 text-[13px] outline-none transition-all duration-500 placeholder:text-muted-light focus:border-border-strong"
              aria-label="Search workstories"
            />
          </div>

          {/* Filters — pill-shaped */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className={pillClass}
              aria-label="Domain"
            >
              {allDomains.map((d) => (
                <option key={d} value={d}>
                  {d === "All" ? "Domain" : d}
                </option>
              ))}
            </select>

            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className={pillClass}
              aria-label="Industry"
            >
              {allIndustries.map((d) => (
                <option key={d} value={d}>
                  {d === "All" ? "Industry" : d}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className={pillClass}
              aria-label="Sort"
            >
              <option value="default">Featured</option>
              <option value="year-desc">Newest</option>
              <option value="year-asc">Oldest</option>
              <option value="title">A–Z</option>
            </select>

            <button
              onClick={() => setFeaturedOnly((v) => !v)}
              className={`rounded-full border px-4 py-2.5 text-[12px] font-medium transition-all duration-500 ${
                featuredOnly
                  ? "border-accent bg-accent text-white"
                  : "border-border bg-transparent text-ink hover:border-border-strong"
              }`}
            >
              Featured
            </button>

            {hasFilters && (
              <button
                onClick={clearAll}
                className="ml-1 text-[11px] font-medium text-muted transition-colors duration-500 hover:text-accent"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {hasFilters && (
          <p className="mt-4 text-[12px] tabular-nums text-muted">
            {filtered.length} result{filtered.length !== 1 && "s"}
          </p>
        )}
      </div>

      {/* ── Results — 2-col cinematic grid ── */}
      <div className="mt-10 sm:mt-14">
        {filtered.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
            {filtered.map((cs, i) => (
              <Reveal key={cs.slug} delay={Math.min(i * 0.04, 0.3)}>
                <CaseStudyCard cs={cs} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-[16px] text-muted">
              No workstories match your filters.
            </p>
            <button
              onClick={clearAll}
              className="mt-4 rounded-full border border-border px-6 py-2.5 text-[13px] font-medium transition-all duration-500 hover:border-border-strong"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </Container>
  );
}
