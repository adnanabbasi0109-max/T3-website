"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CaseStudyDoc } from "../../../lib/utils";
import { useShortlist } from "../../../components/ui/shortlist-provider";
import CaseStudyCard from "../../../components/ui/case-study-card";

export default function CaseStudyStory({
  item,
  related,
}: {
  item: CaseStudyDoc;
  related: CaseStudyDoc[];
}) {
  const { add, remove, has } = useShortlist();
  const saved = has(item.slug);

  const [activeChapter, setActiveChapter] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    () => new Set([0])
  );
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const sections = item.sections || [];

  useEffect(() => {
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveChapter(idx);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    sectionRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [sections.length]);

  function toggleSection(idx: number) {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  function scrollToSection(idx: number) {
    const el = sectionRefs.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setExpandedSections((prev) => new Set(prev).add(idx));
    }
  }

  return (
    <main>
      {/* Hero */}
      <section className="border-b border-neutral-100 dark:border-neutral-800">
        {item.heroImage ? (
          <div className="mx-auto max-w-6xl px-6 pt-8">
            <div className="overflow-hidden rounded-2xl">
              <img src={item.heroImage} alt={item.title} className="aspect-[21/9] w-full object-cover" />
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-6xl px-6 pt-8">
            <div className="flex aspect-[21/9] items-center justify-center rounded-2xl bg-neutral-50 dark:bg-neutral-900">
              <span className="text-7xl font-bold text-neutral-200 dark:text-neutral-700">
                {item.title.charAt(0)}
              </span>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                {item.client || "Case Study"}
              </p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                {item.title}
              </h1>
            </div>

            <button
              onClick={() => (saved ? remove(item.slug) : add(item.slug))}
              className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                saved
                  ? "border-gold bg-gold text-white"
                  : "border-neutral-200 text-neutral-700 hover:border-gold hover:text-gold dark:border-neutral-700 dark:text-neutral-300"
              }`}
              aria-label={saved ? "Remove from shortlist" : "Save to shortlist"}
            >
              <svg className="h-4 w-4" fill={saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
              {saved ? "Saved" : "Save to Shortlist"}
            </button>
          </div>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {item.year && (
              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-400">Year</span>
                <p className="font-medium">{item.year}</p>
              </div>
            )}
            {item.locations && item.locations.length > 0 && (
              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-400">Location</span>
                <p className="font-medium">{item.locations.join(", ")}</p>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {(item.domains || []).map((d) => (
              <span key={d} className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                {d}
              </span>
            ))}
            {(item.industries || []).map((d) => (
              <span key={d} className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-500 dark:border-neutral-700">
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Sections with sticky nav */}
      {sections.length > 0 && (
        <section className="border-b border-neutral-100 dark:border-neutral-800">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="flex flex-col gap-12 lg:flex-row">
              {/* Sticky chapter nav */}
              <aside className="hidden lg:block lg:w-56 lg:shrink-0">
                <div className="sticky top-24">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    Chapters
                  </p>
                  <nav className="flex flex-col gap-1" aria-label="Chapter navigation">
                    {sections.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => scrollToSection(i)}
                        className={`rounded-lg px-3 py-2 text-left text-sm transition ${
                          activeChapter === i
                            ? "bg-gold-muted font-medium text-gold"
                            : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:hover:bg-neutral-900"
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
                      ref={(el) => { sectionRefs.current[i] = el; }}
                      className="scroll-mt-24 rounded-2xl border border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-900"
                    >
                      <button
                        onClick={() => toggleSection(i)}
                        className="flex w-full items-center justify-between p-6 text-left"
                        aria-expanded={isExpanded}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-xs font-medium text-neutral-500 dark:bg-neutral-800">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h2 className="text-lg font-semibold">{s.heading}</h2>
                        </div>
                        <svg
                          className={`h-5 w-5 text-neutral-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isExpanded && (
                        <div className="border-t border-neutral-50 px-6 pb-6 pt-4 dark:border-neutral-800">
                          <div className="text-neutral-600 dark:text-neutral-400">
                            {s.body.split("\n").map((p, pi) => (
                              <p key={pi} className="mb-3 leading-relaxed">{p}</p>
                            ))}
                          </div>
                          {s.media && s.media.length > 0 && (
                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                              {s.media.map((url, mi) => (
                                <div key={mi} className="overflow-hidden rounded-xl bg-neutral-50 dark:bg-neutral-800">
                                  <img src={url} alt={`${s.heading} media ${mi + 1}`} className="aspect-video w-full object-cover" loading="lazy" />
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

      {/* Gallery */}
      {item.gallery && item.gallery.length > 0 && (
        <section className="border-b border-neutral-100 py-16 dark:border-neutral-800">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-bold tracking-tight">Gallery</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {item.gallery.map((url, i) => (
                <div key={i} className="overflow-hidden rounded-xl bg-neutral-50 dark:bg-neutral-800">
                  <img src={url} alt={`Gallery image ${i + 1}`} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Outcomes */}
      {item.outcomes && item.outcomes.length > 0 && (
        <section className="bg-neutral-950 py-16 text-white">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Outcomes
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              What We Delivered
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {item.outcomes.map((outcome, i) => (
                <div key={i} className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
                  <span className="text-sm font-medium text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-300">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-bold tracking-tight">Related Workstories</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((cs) => (
                <CaseStudyCard key={cs.slug} cs={cs} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-neutral-100 py-16 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-2xl font-bold">Have a similar challenge?</h2>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">
            Let&apos;s talk about what we can build together.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            Start a Conversation &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
