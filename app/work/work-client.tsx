"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type CaseStudyItem = {
  _id: string;
  slug: string;
  title: string;
  client?: string;
  year?: number;
  domains?: string[];
  industries?: string[];
  locations?: string[];
  heroImage?: string;
  featured?: boolean;
  order?: number;
};

type SortKey = "default" | "year-desc" | "year-asc" | "title";

export default function WorkClient({
  initialItems,
}: {
  initialItems: CaseStudyItem[];
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
      .filter((i) =>
        domain === "All" ? true : (i.domains || []).includes(domain)
      )
      .filter((i) =>
        industry === "All" ? true : (i.industries || []).includes(industry)
      )
      .filter((i) => (!featuredOnly ? true : i.featured))
      .filter((i) => {
        if (!q) return true;
        const hay =
          `${i.title} ${i.client || ""} ${(i.domains || []).join(" ")} ${(i.industries || []).join(" ")} ${(i.locations || []).join(" ")}`.toLowerCase();
        return hay.includes(q);
      });

    switch (sortBy) {
      case "year-desc":
        list = list.sort((a, b) => (b.year || 0) - (a.year || 0));
        break;
      case "year-asc":
        list = list.sort((a, b) => (a.year || 0) - (b.year || 0));
        break;
      case "title":
        list = list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // featured desc, order asc, year desc (server default)
        break;
    }

    return list;
  }, [initialItems, query, domain, industry, featuredOnly, sortBy]);

  const activeFilters =
    domain !== "All" || industry !== "All" || featuredOnly || query.trim();

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24">
      {/* ── Controls ── */}
      <div className="flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-neutral-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search workstories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
          />
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gold"
          >
            {allDomains.map((d) => (
              <option key={d} value={d}>
                {d === "All" ? "All Domains" : d}
              </option>
            ))}
          </select>

          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gold"
          >
            {allIndustries.map((d) => (
              <option key={d} value={d}>
                {d === "All" ? "All Industries" : d}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gold"
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
                : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
            }`}
          >
            Featured
          </button>
        </div>
      </div>

      {/* Active filter hint */}
      {activeFilters && (
        <div className="mt-4 flex items-center justify-between text-sm text-neutral-500">
          <span>
            {filtered.length} result{filtered.length !== 1 && "s"}
          </span>
          <button
            onClick={() => {
              setQuery("");
              setDomain("All");
              setIndustry("All");
              setFeaturedOnly(false);
              setSortBy("default");
            }}
            className="text-gold transition hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* ── Grid ── */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cs) => (
          <Link
            key={cs.slug}
            href={`/work/${cs.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-neutral-100 bg-white transition hover:border-neutral-200 hover:shadow-sm"
          >
            {cs.heroImage ? (
              <div className="aspect-[16/10] overflow-hidden bg-neutral-50">
                <img
                  src={cs.heroImage}
                  alt={cs.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="flex aspect-[16/10] items-center justify-center bg-neutral-50">
                <span className="text-4xl font-bold text-neutral-200">
                  {cs.title.charAt(0)}
                </span>
              </div>
            )}

            <div className="p-5">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>{cs.client || "Client"}</span>
                <span>{cs.year || ""}</span>
              </div>

              <h3 className="mt-2 text-base font-semibold tracking-tight group-hover:text-gold">
                {cs.title}
              </h3>

              {cs.domains && cs.domains.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cs.domains.slice(0, 3).map((d) => (
                    <span
                      key={d}
                      className="rounded-full bg-neutral-50 px-2.5 py-0.5 text-[11px] text-neutral-500"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              )}

              {cs.featured && (
                <div className="mt-3 inline-flex items-center gap-1 text-xs text-gold">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Featured
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-12 rounded-2xl border border-neutral-100 bg-neutral-50 p-12 text-center">
          <p className="text-neutral-500">
            No workstories match your filters.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setDomain("All");
              setIndustry("All");
              setFeaturedOnly(false);
              setSortBy("default");
            }}
            className="mt-3 text-sm text-gold transition hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
