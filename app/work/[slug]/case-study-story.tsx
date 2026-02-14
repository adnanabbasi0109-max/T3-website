"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { CaseStudyDoc } from "../../../lib/utils";
import { useShortlist } from "../../../components/ui/shortlist-provider";
import CaseStudyCard from "../../../components/ui/case-study-card";
import ChapterNav from "../../../components/sections/ChapterNav";
import Reveal from "../../../components/motion/Reveal";
import Container from "../../../components/layout/Container";
import Section from "../../../components/layout/Section";

type Chapter = { id: string; label: string };

const CHAPTER_IDS = ["overview", "challenge", "intervention", "execution", "outcome"];
const CHAPTER_LABELS = ["Overview", "Challenge", "Intervention", "Execution", "Outcome"];

export default function CaseStudyStory({
  item,
  related,
}: {
  item: CaseStudyDoc;
  related: CaseStudyDoc[];
}) {
  const { add, remove, has } = useShortlist();
  const saved = has(item.slug);
  const sections = item.sections || [];

  const chapters = useMemo(() => {
    const chs: Chapter[] = [];
    sections.forEach((s, i) => {
      if (i < 5) {
        chs.push({ id: `chapter-${CHAPTER_IDS[i]}`, label: CHAPTER_LABELS[i] });
      } else {
        chs.push({ id: `chapter-extra-${i - 5}`, label: s.heading });
      }
    });
    if (item.outcomes && item.outcomes.length > 0) {
      chs.push({ id: "chapter-outcomes", label: "Outcomes" });
    }
    if (item.gallery && item.gallery.length > 0) {
      chs.push({ id: "chapter-gallery", label: "Gallery" });
    }
    return chs;
  }, [sections, item.outcomes, item.gallery]);

  return (
    <>
      {/* ── Header ── */}
      <Section spacing="md">
        <Container>
          <Reveal>
            <Link
              href="/work"
              className="link-underline mb-12 inline-flex items-center gap-2 text-[13px] font-medium text-muted transition-colors duration-500 hover:text-ink sm:mb-14"
            >
              &larr; All Workstories
            </Link>

            <div className="flex items-start justify-between gap-8">
              <div className="max-w-3xl">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Workstory
                </p>
                <h1 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.04em]">
                  {item.title}
                </h1>

                {item.domains && item.domains.length > 0 && (
                  <div className="mt-7 flex flex-wrap gap-2">
                    {item.domains.map((d) => (
                      <span
                        key={d}
                        className="rounded-full border border-border px-3.5 py-1 text-[11px] font-medium text-muted"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => (saved ? remove(item.slug) : add(item.slug))}
                className={`mt-2 flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-[12px] font-medium transition-all duration-500 ${
                  saved
                    ? "border-accent bg-accent text-white"
                    : "border-border text-muted hover:border-border-strong hover:text-ink"
                }`}
                aria-label={saved ? "Remove from shortlist" : "Save to shortlist"}
              >
                <svg className="h-3.5 w-3.5" fill={saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
                {saved ? "Saved" : "Save"}
              </button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── Hero Image ── */}
      {item.heroImage && (
        <Reveal>
          <section className="px-6 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[0.5rem]">
              <img
                src={item.heroImage}
                alt={item.title}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </section>
        </Reveal>
      )}

      {/* ── Meta ── */}
      <Section spacing="sm">
        <Container>
          <div className="flex flex-wrap gap-x-16 gap-y-5 pb-10">
            {item.client && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-light">Client</p>
                <p className="mt-2 text-[15px] font-medium">{item.client}</p>
              </div>
            )}
            {item.year && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-light">Year</p>
                <p className="mt-2 text-[15px] font-medium tabular-nums">{item.year}</p>
              </div>
            )}
            {item.industries && item.industries.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-light">Industry</p>
                <p className="mt-2 text-[15px] font-medium">{item.industries.join(", ")}</p>
              </div>
            )}
            {item.locations && item.locations.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-light">Location</p>
                <p className="mt-2 text-[15px] font-medium">{item.locations.join(", ")}</p>
              </div>
            )}
          </div>
          <div className="divider-fade" />
        </Container>
      </Section>

      {/* ── Content Sections with Chapter Nav ── */}
      {sections.length > 0 && (
        <Section spacing="lg">
          <Container>
            <div className="grid gap-16 lg:grid-cols-[180px_1fr] lg:gap-20">
              {chapters.length > 0 && <ChapterNav chapters={chapters} />}

              <div className={`${chapters.length === 0 ? "lg:col-span-2" : ""} max-w-[680px]`}>
                <div className="space-y-28 sm:space-y-36">
                  {sections.map((s, i) => {
                    const chapterId =
                      i < 5
                        ? `chapter-${CHAPTER_IDS[i]}`
                        : `chapter-extra-${i - 5}`;
                    const chapterLabel = i < 5 ? CHAPTER_LABELS[i] : undefined;

                    return (
                      <article key={i} id={chapterId}>
                        <Reveal>
                          {chapterLabel && (
                            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                              {chapterLabel}
                            </p>
                          )}
                          <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] tracking-[-0.025em]">
                            {s.heading}
                          </h2>
                          <div className="mt-7 text-[15px] leading-[1.9] text-muted sm:text-[16px]">
                            {s.body.split("\n").map((p, pi) => (
                              <p key={pi} className="mb-5 last:mb-0">{p}</p>
                            ))}
                          </div>
                        </Reveal>

                        {s.media && s.media.length > 0 && (
                          <div className={`mt-12 grid gap-4 ${s.media.length > 1 ? "grid-cols-2" : ""}`}>
                            {s.media.map((url, mi) => (
                              <Reveal key={mi} delay={mi * 0.06}>
                                <div className="overflow-hidden rounded-[0.5rem] bg-paper-dim">
                                  <img
                                    src={url}
                                    alt={`${s.heading} ${mi + 1}`}
                                    className="aspect-video w-full object-cover"
                                    loading="lazy"
                                  />
                                </div>
                              </Reveal>
                            ))}
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ── Outcomes ── */}
      {item.outcomes && item.outcomes.length > 0 && (
        <Section spacing="lg" alt className="mx-4 rounded-[1.5rem] sm:mx-6 sm:rounded-[2rem] lg:mx-10" id="chapter-outcomes">
          <Container>
            <Reveal>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                Outcomes
              </p>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] tracking-[-0.025em]">
                What We Delivered
              </h2>
            </Reveal>
            <div className="mt-16">
              {item.outcomes.map((outcome, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <div className={`flex gap-6 py-7 sm:py-9 ${i < item.outcomes!.length - 1 ? "border-b border-border" : ""}`}>
                    <span className="shrink-0 text-[13px] font-bold tabular-nums text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[15px] leading-[1.85] text-ink/80 sm:text-[16px]">
                      {outcome}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ── Gallery ── */}
      {item.gallery && item.gallery.length > 0 && (
        <Section spacing="md" id="chapter-gallery">
          <Container>
            <Reveal>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                Gallery
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {item.gallery.map((url, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <div className="overflow-hidden rounded-[0.5rem] bg-paper-dim transition-shadow duration-700 hover:shadow-card-hover">
                    <img
                      src={url}
                      alt={`Gallery ${i + 1}`}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ── Related ── */}
      {related.length > 0 && (
        <Section spacing="lg">
          <Container>
            <Reveal>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                Related
              </p>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] tracking-[-0.025em]">
                More Workstories
              </h2>
            </Reveal>
            <div className="mt-16 grid gap-10 sm:grid-cols-2 sm:gap-14 lg:grid-cols-3">
              {related.map((cs, i) => (
                <Reveal key={cs.slug} delay={i * 0.06}>
                  <CaseStudyCard cs={cs} size="compact" />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ── CTA ── */}
      <Section spacing="lg" dark>
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-lg font-display text-[clamp(1.75rem,4vw,3rem)] tracking-[-0.025em] text-paper">
              Have a similar challenge?
            </h2>
            <div className="mt-14">
              <Link
                href="/contact"
                className="btn-slide inline-flex h-[52px] items-center rounded-full bg-paper px-10 text-[14px] font-medium text-ink transition-all duration-500 hover:bg-paper-warm"
              >
                <span className="btn-text">Start a conversation &rarr;</span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
