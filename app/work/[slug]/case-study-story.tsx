"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { CaseStudyDoc } from "../../../lib/utils";
import { useShortlist } from "../../../components/ui/shortlist-provider";
import CaseStudyCard from "../../../components/ui/case-study-card";
import Reveal from "../../../components/motion/Reveal";
import Container from "../../../components/layout/Container";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

  function scrollToSection(idx: number) {
    const el = sectionRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      {/* ── Hero Image ── */}
      <section>
        <Container size="wide" className="pt-8">
          {item.heroImage ? (
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease }}
              className="overflow-hidden rounded-lg"
            >
              <img
                src={item.heroImage}
                alt={item.title}
                className="aspect-[2.4/1] w-full object-cover"
              />
            </motion.div>
          ) : (
            <div className="flex aspect-[2.4/1] items-center justify-center rounded-lg bg-neutral-100">
              <span className="text-[8rem] font-extrabold text-neutral-200/50">
                {item.title.charAt(0)}
              </span>
            </div>
          )}
        </Container>

        {/* Title + Save */}
        <Container className="py-14 lg:py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <Reveal>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
                  {item.client || "Case Study"}
                </p>
                <h1 className="mt-4 text-[clamp(2rem,5vw,4rem)] font-extrabold tracking-[-0.03em]">
                  {item.title}
                </h1>
              </div>
            </Reveal>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              onClick={() => (saved ? remove(item.slug) : add(item.slug))}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all duration-300 ${
                saved
                  ? "border-gold bg-gold text-white"
                  : "border-border text-muted hover:border-surface-dark/40 hover:text-surface-dark"
              }`}
              aria-label={
                saved ? "Remove from shortlist" : "Save to shortlist"
              }
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
              {saved ? "Saved" : "Save"}
            </motion.button>
          </div>

          {/* Meta row */}
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap gap-x-14 gap-y-5 border-t border-border pt-8">
              {item.year && (
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted">
                    Year
                  </span>
                  <p className="mt-1.5 text-[15px] font-semibold">
                    {item.year}
                  </p>
                </div>
              )}
              {item.locations && item.locations.length > 0 && (
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted">
                    Location
                  </span>
                  <p className="mt-1.5 text-[15px] font-semibold">
                    {item.locations.join(", ")}
                  </p>
                </div>
              )}
              {item.domains && item.domains.length > 0 && (
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted">
                    Domain
                  </span>
                  <p className="mt-1.5 text-[15px] font-semibold">
                    {item.domains.join(", ")}
                  </p>
                </div>
              )}
              {item.industries && item.industries.length > 0 && (
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted">
                    Industry
                  </span>
                  <p className="mt-1.5 text-[15px] font-semibold">
                    {item.industries.join(", ")}
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Sections with sticky chapter nav ── */}
      {sections.length > 0 && (
        <section className="border-t border-border">
          <Container className="py-20 lg:py-28">
            <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">
              {/* Sticky nav */}
              <aside className="hidden lg:block lg:w-52 lg:shrink-0">
                <div className="sticky top-28">
                  <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.2em] text-muted/60">
                    Chapters
                  </p>
                  <nav
                    className="flex flex-col gap-0.5"
                    aria-label="Chapter navigation"
                  >
                    {sections.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => scrollToSection(i)}
                        className={`rounded-md px-3 py-2 text-left text-[13px] transition-all duration-300 ${
                          activeChapter === i
                            ? "bg-gold-muted font-medium text-surface-dark"
                            : "text-muted hover:text-surface-dark"
                        }`}
                      >
                        {s.heading}
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Content */}
              <div className="min-w-0 flex-1 space-y-20">
                {sections.map((s, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <article
                      ref={(el) => {
                        sectionRefs.current[i] = el;
                      }}
                      className="scroll-mt-28"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-[12px] font-semibold tracking-[0.1em] text-gold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2 className="text-[24px] font-bold tracking-[-0.02em]">
                          {s.heading}
                        </h2>
                      </div>
                      <div className="mt-6 text-[15px] leading-[1.85] text-muted">
                        {s.body.split("\n").map((p, pi) => (
                          <p key={pi} className="mb-5 last:mb-0">
                            {p}
                          </p>
                        ))}
                      </div>
                      {s.media && s.media.length > 0 && (
                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                          {s.media.map((url, mi) => (
                            <div
                              key={mi}
                              className="overflow-hidden rounded-md bg-neutral-100"
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
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ── Gallery ── */}
      {item.gallery && item.gallery.length > 0 && (
        <section className="border-t border-border py-20 lg:py-28">
          <Container>
            <Reveal>
              <h2 className="text-[24px] font-bold tracking-[-0.02em]">
                Gallery
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {item.gallery.map((url, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="overflow-hidden rounded-md bg-neutral-100">
                    <img
                      src={url}
                      alt={`Gallery ${i + 1}`}
                      className="aspect-[4/3] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── Outcomes ── */}
      {item.outcomes && item.outcomes.length > 0 && (
        <section className="bg-surface-dark py-24 text-white lg:py-32">
          <Container>
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-light">
                Outcomes
              </p>
              <h2 className="mt-4 text-[clamp(1.5rem,3.5vw,2.75rem)] font-bold tracking-[-0.03em]">
                What We Delivered
              </h2>
            </Reveal>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {item.outcomes.map((outcome, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="border-t border-neutral-700/60 pt-6">
                    <span className="text-[12px] font-semibold tracking-[0.1em] text-gold-light">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-4 text-[15px] leading-[1.8] text-neutral-300">
                      {outcome}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── Related ── */}
      {related.length > 0 && (
        <section className="py-24 lg:py-32">
          <Container>
            <Reveal>
              <h2 className="text-[24px] font-bold tracking-[-0.02em]">
                Related Workstories
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((cs, i) => (
                <Reveal key={cs.slug} delay={i * 0.08}>
                  <CaseStudyCard cs={cs} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="border-t border-border py-24 lg:py-32">
        <Container className="text-center">
          <Reveal>
            <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em]">
              Have a similar challenge?
            </h2>
            <p className="mx-auto mt-5 text-[15px] leading-[1.75] text-muted">
              Let&apos;s talk about what we can build together.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex h-[50px] items-center gap-2 rounded-full bg-surface-dark px-9 text-[13px] font-medium text-white transition-all duration-300 hover:bg-surface-dark/85"
            >
              Start a Conversation&nbsp;&rarr;
            </Link>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
