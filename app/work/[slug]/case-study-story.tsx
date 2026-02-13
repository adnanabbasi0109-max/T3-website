"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CaseStudyDoc } from "../../../lib/utils";
import { useShortlist } from "../../../components/ui/shortlist-provider";
import CaseStudyCard from "../../../components/ui/case-study-card";
import Reveal from "../../../components/ui/reveal";

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
      {/* ── Hero ── */}
      <section className="border-b border-border dark:border-border-dark">
        {item.heroImage ? (
          <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden rounded-2xl"
            >
              <img
                src={item.heroImage}
                alt={item.title}
                className="aspect-[21/9] w-full object-cover"
              />
            </motion.div>
          </div>
        ) : (
          <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-10">
            <div className="flex aspect-[21/9] items-center justify-center rounded-2xl bg-neutral-50 dark:bg-neutral-900">
              <span className="font-editorial text-8xl font-bold text-neutral-200 dark:text-neutral-700">
                {item.title.charAt(0)}
              </span>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <Reveal>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                  {item.client || "Case Study"}
                </p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  {item.title}
                </h1>
              </div>
            </Reveal>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => (saved ? remove(item.slug) : add(item.slug))}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all ${
                saved
                  ? "border-gold bg-gold text-white"
                  : "border-border text-muted hover:border-gold hover:text-gold dark:border-border-dark"
              }`}
              aria-label={saved ? "Remove from shortlist" : "Save to shortlist"}
            >
              <svg
                className="h-4 w-4"
                fill={saved ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
              {saved ? "Saved" : "Save to Shortlist"}
            </motion.button>
          </div>

          {/* Meta */}
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {item.year && (
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    Year
                  </span>
                  <p className="mt-1 text-[15px] font-semibold">{item.year}</p>
                </div>
              )}
              {item.locations && item.locations.length > 0 && (
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    Location
                  </span>
                  <p className="mt-1 text-[15px] font-semibold">
                    {item.locations.join(", ")}
                  </p>
                </div>
              )}
            </div>
          </Reveal>

          {/* Tags */}
          <Reveal delay={0.15}>
            <div className="mt-5 flex flex-wrap gap-2">
              {(item.domains || []).map((d) => (
                <span
                  key={d}
                  className="rounded-full bg-gold-muted px-3 py-1 text-[11px] font-medium text-gold"
                >
                  {d}
                </span>
              ))}
              {(item.industries || []).map((d) => (
                <span
                  key={d}
                  className="rounded-full border border-border px-3 py-1 text-[11px] text-muted dark:border-border-dark"
                >
                  {d}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Sections with sticky nav ── */}
      {sections.length > 0 && (
        <section className="border-b border-border dark:border-border-dark">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
            <div className="flex flex-col gap-14 lg:flex-row">
              {/* Sticky chapter nav */}
              <aside className="hidden lg:block lg:w-56 lg:shrink-0">
                <div className="sticky top-28">
                  <p className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
                    Chapters
                  </p>
                  <nav
                    className="flex flex-col gap-1"
                    aria-label="Chapter navigation"
                  >
                    {sections.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => scrollToSection(i)}
                        className={`rounded-lg px-3 py-2 text-left text-[13px] transition-all ${
                          activeChapter === i
                            ? "bg-gold-muted font-medium text-gold"
                            : "text-muted hover:bg-neutral-50 hover:text-surface-dark dark:hover:bg-neutral-900"
                        }`}
                      >
                        {s.heading}
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Sections */}
              <div className="flex-1 space-y-5">
                {sections.map((s, i) => {
                  const isExpanded = expandedSections.has(i);
                  return (
                    <Reveal key={i} delay={i * 0.06}>
                      <article
                        ref={(el) => {
                          sectionRefs.current[i] = el;
                        }}
                        className="scroll-mt-28 rounded-2xl border border-border bg-white dark:border-border-dark dark:bg-neutral-900"
                      >
                        <button
                          onClick={() => toggleSection(i)}
                          className="flex w-full items-center justify-between p-6 text-left"
                          aria-expanded={isExpanded}
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface text-[11px] font-semibold text-muted dark:bg-neutral-800">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <h2 className="text-[17px] font-semibold tracking-tight">
                              {s.heading}
                            </h2>
                          </div>
                          <svg
                            className={`h-4 w-4 text-muted transition-transform duration-300 ${
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

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-border px-6 pb-6 pt-5 dark:border-border-dark">
                                <div className="text-[15px] leading-relaxed text-muted">
                                  {s.body.split("\n").map((p, pi) => (
                                    <p key={pi} className="mb-3 last:mb-0">
                                      {p}
                                    </p>
                                  ))}
                                </div>
                                {s.media && s.media.length > 0 && (
                                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                    {s.media.map((url, mi) => (
                                      <div
                                        key={mi}
                                        className="overflow-hidden rounded-xl bg-neutral-50 dark:bg-neutral-800"
                                      >
                                        <img
                                          src={url}
                                          alt={`${s.heading} media ${mi + 1}`}
                                          className="aspect-video w-full object-cover"
                                          loading="lazy"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Gallery ── */}
      {item.gallery && item.gallery.length > 0 && (
        <section className="border-b border-border py-20 dark:border-border-dark">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight">Gallery</h2>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {item.gallery.map((url, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="overflow-hidden rounded-xl bg-neutral-50 dark:bg-neutral-800">
                    <img
                      src={url}
                      alt={`Gallery image ${i + 1}`}
                      className="aspect-[4/3] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Outcomes ── */}
      {item.outcomes && item.outcomes.length > 0 && (
        <section className="bg-surface-dark py-20 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                Outcomes
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                What We Delivered
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {item.outcomes.map((outcome, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-7">
                    <span className="font-mono text-[11px] font-semibold text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 text-[14px] leading-relaxed text-neutral-300">
                      {outcome}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Related ── */}
      {related.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight">
                Related Workstories
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((cs, i) => (
                <Reveal key={cs.slug} delay={i * 0.08}>
                  <CaseStudyCard cs={cs} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="border-t border-border py-20 dark:border-border-dark">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
          <Reveal>
            <h2 className="font-editorial text-2xl font-bold tracking-tight sm:text-3xl">
              Have a similar challenge?
            </h2>
            <p className="mt-3 text-[15px] text-muted">
              Let&apos;s talk about what we can build together.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-surface-dark px-7 py-3.5 text-[13px] font-semibold text-white transition hover:shadow-lg hover:shadow-black/10 dark:bg-white dark:text-black"
            >
              Start a Conversation &rarr;
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
