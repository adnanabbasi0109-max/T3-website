"use client";

import { useMemo, useState } from "react";
import type { CaseStudyDoc } from "../../lib/utils";
import WorkListItem from "../../components/work/WorkListItem";
import Reveal from "../../components/motion/Reveal";
import Container from "../../components/layout/Container";
import FeaturedWorkCard from "../../components/work/FeaturedWorkCard";

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

  // Split into featured (full-width) and regular items
  const featuredItems = filtered.filter((cs) => cs.featured);
  const regularItems = filtered.filter((cs) => !cs.featured);

  const pillBase =
    "rounded-full border px-4 py-2 text-[12px] font-medium transition-all duration-300";
  const pillActive = "border-ink bg-ink text-paper";
  const pillInactive = "border-border text-muted hover:border-ink/40 hover:text-ink";

  return (
    <Container>
      {/* ── Filter bar — pill style ── */}
      <div className="mt-14 flex flex-col gap-5 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative max-w-xs flex-1">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-transparent px-4 py-2.5 text-[14px] outline-none transition-colors duration-300 placeholder:text-muted/40 focus:border-ink focus:ring-1 focus:ring-ink/10"
            aria-label="Search workstories"
          />
        </div>

        {/* Pill filters */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className={`appearance-none ${pillBase} ${domain !== "All" ? pillActive : pillInactive} pr-8`}
            aria-label="Domain"
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
            className={`appearance-none ${pillBase} ${industry !== "All" ? pillActive : pillInactive} pr-8`}
            aria-label="Industry"
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
            className={`appearance-none ${pillBase} ${sortBy !== "default" ? pillActive : pillInactive} pr-8`}
            aria-label="Sort"
          >
            <option value="default">Featured</option>
            <option value="year-desc">Newest</option>
            <option value="year-asc">Oldest</option>
            <option value="title">A–Z</option>
          </select>

          <button
            onClick={() => setFeaturedOnly((v) => !v)}
            className={`${pillBase} ${featuredOnly ? pillActive : pillInactive}`}
          >
            Featured only
          </button>
        </div>
      </div>

      {/* Filter hint */}
      {hasFilters && (
        <div className="mt-5 flex items-center justify-between text-[13px] text-muted">
          <span>
            {filtered.length} result{filtered.length !== 1 && "s"}
          </span>
          <button
            onClick={clearAll}
            className="font-medium text-gold transition-colors hover:text-gold-dark"
          >
            Clear
          </button>
        </div>
      )}

      {/* ── Mixed grid ── */}
      <div className="mt-14 sm:mt-20">
        {/* Featured items — full width */}
        {featuredItems.map((cs, i) => (
          <Reveal key={cs.slug} delay={Math.min(i * 0.08, 0.3)} className="mb-10">
            <FeaturedWorkCard cs={cs} />
          </Reveal>
        ))}

        {/* Regular items — responsive grid */}
        {regularItems.length > 0 && (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {regularItems.map((cs, i) => (
              <Reveal key={cs.slug} delay={Math.min(i * 0.05, 0.4)} scale>
                <WorkListItem cs={cs} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Empty */}
      {filtered.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-[15px] text-muted">
            No workstories match your filters.
          </p>
          <button
            onClick={clearAll}
            className="mt-4 text-[13px] font-medium text-gold transition-colors hover:text-gold-dark"
          >
            Clear all filters
          </button>
        </div>
      )}
    </Container>
  );
}
