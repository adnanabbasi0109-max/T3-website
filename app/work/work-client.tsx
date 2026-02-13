"use client";

import { useMemo, useState } from "react";
import type { CaseStudyDoc } from "../../lib/utils";
import CaseStudyCard from "../../components/ui/case-study-card";

type SortKey = "default" | "year-desc" | "year-asc" | "title";

export default function WorkClient({
  initialItems,
}: {
  initialItems: CaseStudyDoc[];
}) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("All");
  const [industry, setIndustry] = useState("All");
  const [location, setLocation] = useState("All");
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

  const allLocations = useMemo(() => {
    const s = new Set<string>();
    initialItems.forEach((i) => (i.locations || []).forEach((d) => s.add(d)));
    return ["All", ...Array.from(s).sort()];
  }, [initialItems]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = initialItems
      .filter((i) => domain === "All" || (i.domains || []).includes(domain))
      .filter((i) => industry === "All" || (i.industries || []).includes(industry))
      .filter((i) => location === "All" || (i.locations || []).includes(location))
      .filter((i) => !featuredOnly || i.featured)
      .filter((i) => {
        if (!q) return true;
        const hay = `${i.title} ${i.client || ""} ${(i.domains || []).join(" ")} ${(i.industries || []).join(" ")} ${(i.locations || []).join(" ")}`.toLowerCase();
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
  }, [initialItems, query, domain, industry, location, featuredOnly, sortBy]);

  const hasFilters = domain !== "All" || industry !== "All" || location !== "All" || featuredOnly || query.trim();

  function clearAll() {
    setQuery("");
    setDomain("All");
    setIndustry("All");
    setLocation("All");
    setFeaturedOnly(false);
    setSortBy("default");
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24">
      {/* Controls */}
      <div className="flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-neutral-50/50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input
            type="text"
            placeholder="Search workstories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            aria-label="Search workstories"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gold dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            aria-label="Filter by domain"
          >
            {allDomains.map((d) => (
              <option key={d} value={d}>{d === "All" ? "All Domains" : d}</option>
            ))}
          </select>

          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gold dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            aria-label="Filter by industry"
          >
            {allIndustries.map((d) => (
              <option key={d} value={d}>{d === "All" ? "All Industries" : d}</option>
            ))}
          </select>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gold dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            aria-label="Filter by location"
          >
            {allLocations.map((d) => (
              <option key={d} value={d}>{d === "All" ? "All Locations" : d}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gold dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            aria-label="Sort order"
          >
            <option value="default">Sort: Featured</option>
            <option value="year-desc">Year: Newest</option>
            <option value="year-asc">Year: Oldest</option>
            <option value="title">Title: A-Z</option>
          </select>

          <button
            onClick={() => setFeaturedOnly((v) => !v)}
            className={`rounded-xl border px-3 py-2.5 text-sm transition ${
              featuredOnly
                ? "border-gold bg-gold-muted font-medium text-gold"
                : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
            }`}
          >
            Featured
          </button>
        </div>
      </div>

      {/* Active filter hint */}
      {hasFilters && (
        <div className="mt-4 flex items-center justify-between text-sm text-neutral-500">
          <span>
            {filtered.length} result{filtered.length !== 1 && "s"}
          </span>
          <button onClick={clearAll} className="text-gold transition hover:underline">
            Clear filters
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cs) => (
          <CaseStudyCard key={cs.slug} cs={cs} />
        ))}
      </div>

      {/* Empty */}
      {filtered.length === 0 && (
        <div className="mt-12 rounded-2xl border border-neutral-100 bg-neutral-50 p-12 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-neutral-500">No workstories match your filters.</p>
          <button onClick={clearAll} className="mt-3 text-sm text-gold transition hover:underline">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
