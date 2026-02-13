"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Section = {
  heading: string;
  body: string;
  media?: string[];
};

type CaseStudyFull = {
  _id: string;
  slug: string;
  title: string;
  client?: string;
  year?: number;
  domains?: string[];
  industries?: string[];
  locations?: string[];
  heroImage?: string;
  gallery?: string[];
  featured?: boolean;
  sections?: Section[];
  outcomes?: string[];
};

type RelatedItem = {
  slug: string;
  title: string;
  client?: string;
  heroImage?: string;
  domains?: string[];
};

export default function CaseStudyStory({
  item,
  related,
}: {
  item: CaseStudyFull;
  related: RelatedItem[];
}) {
  const [activeChapter, setActiveChapter] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    () => new Set([0])
  );
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const sections = item.sections || [];

  // Track which section is in view for sticky nav
  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(
              entry.target as HTMLElement
            );
            if (idx !== -1) setActiveChapter(idx);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections.length]);

  function toggleSection(idx: number) {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  }

  function scrollToSection(idx: number) {
    const el = sectionRefs.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Also expand the section
      setExpandedSections((prev) => new Set(prev).add(idx));
    }
  }

  return (
    <>
      {/* ── Nav ── */}
      <nav className="fixed top-0 z-50 w-full border-b border-neutral-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            T3
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/work"
              className="text-neutral-600 transition hover:text-black"
            >
              &larr; All Work
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-14">
        {/* ── Hero ── */}
        <section className="border-b border-neutral-100">
          {item.heroImage ? (
            <div className="mx-auto max-w-6xl px-6 pt-12">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={item.heroImage}
                  alt={item.title}
                  className="aspect-[21/9] w-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-6xl px-6 pt-12">
              <div className="flex aspect-[21/9] items-center justify-center rounded-2xl bg-neutral-50">
                <span className="text-7xl font-bold text-neutral-200">
                  {item.title.charAt(0)}
                </span>
              </div>
            </div>
          )}

          <div className="mx-auto max-w-6xl px-6 py-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-gold">
                  {item.client || "Case Study"}
                </p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                  {item.title}
                </h1>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-500">
                {item.year && (
                  <div>
                    <span className="text-xs uppercase tracking-wider text-neutral-400">
                      Year
                    </span>
                    <p className="font-medium text-neutral-700">{item.year}</p>
                  </div>
                )}
                {item.locations && item.locations.length > 0 && (
                  <div>
                    <span className="text-xs uppercase tracking-wider text-neutral-400">
                      Location
                    </span>
                    <p className="font-medium text-neutral-700">
                      {item.locations.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {(item.domains || []).map((d) => (
                <span
                  key={d}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
                >
                  {d}
                </span>
              ))}
              {(item.industries || []).map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-500"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Content area with sticky chapter nav ── */}
        {sections.length > 0 && (
          <section className="border-b border-neutral-100">
            <div className="mx-auto max-w-6xl px-6 py-16">
              <div className="flex flex-col gap-12 lg:flex-row">
                {/* Sticky chapter nav — desktop */}
                <aside className="hidden lg:block lg:w-56 lg:shrink-0">
                  <div className="sticky top-20">
                    <p className="mb-4 text-xs font-medium uppercase tracking-widest text-neutral-400">
                      Chapters
                    </p>
                    <nav className="flex flex-col gap-1">
                      {sections.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => scrollToSection(i)}
                          className={`rounded-lg px-3 py-2 text-left text-sm transition ${
                            activeChapter === i
                              ? "bg-gold-muted font-medium text-gold"
                              : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                          }`}
                        >
                          {s.heading}
                        </button>
                      ))}
                    </nav>
                  </div>
                </aside>

                {/* Sections */}
                <div className="flex-1 space-y-4">
                  {sections.map((s, i) => {
                    const isExpanded = expandedSections.has(i);
                    return (
                      <article
                        key={i}
                        ref={(el) => {
                          sectionRefs.current[i] = el;
                        }}
                        className="scroll-mt-20 rounded-2xl border border-neutral-100 bg-white"
                      >
                        <button
                          onClick={() => toggleSection(i)}
                          className="flex w-full items-center justify-between p-6 text-left"
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-xs font-medium text-neutral-500">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <h2 className="text-lg font-semibold">
                              {s.heading}
                            </h2>
                          </div>
                          <svg
                            className={`h-5 w-5 text-neutral-400 transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {isExpanded && (
                          <div className="border-t border-neutral-50 px-6 pb-6 pt-4">
                            <div className="prose prose-neutral max-w-none text-neutral-600">
                              {s.body.split("\n").map((p, pi) => (
                                <p key={pi} className="mb-3 leading-relaxed">
                                  {p}
                                </p>
                              ))}
                            </div>

                            {s.media && s.media.length > 0 && (
                              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                {s.media.map((url, mi) => (
                                  <div
                                    key={mi}
                                    className="overflow-hidden rounded-xl bg-neutral-50"
                                  >
                                    <img
                                      src={url}
                                      alt={`${s.heading} media ${mi + 1}`}
                                      className="aspect-video w-full object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Gallery ── */}
        {item.gallery && item.gallery.length > 0 && (
          <section className="border-b border-neutral-100 py-16">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-2xl font-bold tracking-tight">Gallery</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {item.gallery.map((url, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl bg-neutral-50"
                  >
                    <img
                      src={url}
                      alt={`Gallery image ${i + 1}`}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Outcomes ── */}
        {item.outcomes && item.outcomes.length > 0 && (
          <section className="border-b border-neutral-100 bg-neutral-950 py-16 text-white">
            <div className="mx-auto max-w-6xl px-6">
              <p className="text-sm font-medium uppercase tracking-widest text-gold-light">
                Outcomes
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                What We Delivered
              </h2>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {item.outcomes.map((outcome, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-neutral-800 bg-neutral-900 p-6"
                  >
                    <span className="text-sm font-medium text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                      {outcome}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Related ── */}
        {related.length > 0 && (
          <section className="py-16">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-2xl font-bold tracking-tight">
                Related Workstories
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((cs) => (
                  <Link
                    key={cs.slug}
                    href={`/work/${cs.slug}`}
                    className="group overflow-hidden rounded-2xl border border-neutral-100 bg-white transition hover:border-neutral-200 hover:shadow-sm"
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
                      <div className="text-xs text-neutral-400">
                        {cs.client || "Client"}
                      </div>
                      <h3 className="mt-1 text-base font-semibold tracking-tight group-hover:text-gold">
                        {cs.title}
                      </h3>
                      {cs.domains && cs.domains.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {cs.domains.slice(0, 2).map((d) => (
                            <span
                              key={d}
                              className="rounded-full bg-neutral-50 px-2.5 py-0.5 text-[11px] text-neutral-500"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="bg-neutral-950 py-16 text-neutral-400">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div>
              <span className="text-lg font-semibold text-white">T3</span>
              <p className="mt-1 text-sm">Strategy, Craft, Outcome.</p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/work" className="transition hover:text-white">
                Work
              </Link>
            </div>
          </div>
          <div className="mt-12 border-t border-neutral-800 pt-6 text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} T3. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
