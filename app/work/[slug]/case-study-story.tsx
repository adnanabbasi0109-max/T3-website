"use client";

import Link from "next/link";
import type { CaseStudyDoc } from "../../../lib/utils";
import { useShortlist } from "../../../components/ui/shortlist-provider";
import CaseStudyCard from "../../../components/ui/case-study-card";
import Reveal from "../../../components/motion/Reveal";
import Container from "../../../components/layout/Container";
import Section from "../../../components/layout/Section";

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

  return (
    <>
      {/* ── Hero ── */}
      <section className="pb-8 pt-8 sm:pb-12 sm:pt-12">
        <Container>
          <Reveal>
            <Link
              href="/work"
              className="mb-6 inline-flex items-center gap-1.5 text-[12px] font-medium text-muted transition-colors hover:text-ink sm:mb-8"
            >
              &larr; All Workstories
            </Link>

            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                  {item.client || "Case Study"}
                </p>
                <h1 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.08] tracking-[-0.025em]">
                  {item.title}
                </h1>
              </div>

              {/* Save button */}
              <button
                onClick={() => (saved ? remove(item.slug) : add(item.slug))}
                className={`mt-2 flex shrink-0 items-center gap-1.5 border px-4 py-2 text-[12px] font-medium transition-all duration-300 ${
                  saved
                    ? "border-ink bg-ink text-paper"
                    : "border-border text-muted hover:border-ink/30 hover:text-ink"
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
      </section>

      {/* ── Hero Image ── */}
      {item.heroImage && (
        <section className="px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1280px] overflow-hidden rounded-sm">
            <img
              src={item.heroImage}
              alt={item.title}
              className="aspect-[2/1] w-full object-cover sm:aspect-[2.5/1]"
            />
          </div>
        </section>
      )}

      {/* ── Meta ── */}
      <Section spacing="sm">
        <Container>
          <div className="flex flex-wrap gap-x-10 gap-y-3 border-b border-border pb-6">
            {item.year && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-light">Year</p>
                <p className="mt-1 text-[14px] font-medium">{item.year}</p>
              </div>
            )}
            {item.domains && item.domains.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-light">Domain</p>
                <p className="mt-1 text-[14px] font-medium">{item.domains.join(", ")}</p>
              </div>
            )}
            {item.industries && item.industries.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-light">Industry</p>
                <p className="mt-1 text-[14px] font-medium">{item.industries.join(", ")}</p>
              </div>
            )}
            {item.locations && item.locations.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-light">Location</p>
                <p className="mt-1 text-[14px] font-medium">{item.locations.join(", ")}</p>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* ── Sections ── */}
      {sections.length > 0 && (
        <Section spacing="lg">
          <Container size="narrow">
            <div className="space-y-16 sm:space-y-20">
              {sections.map((s, i) => (
                <article key={i}>
                  <Reveal>
                    <h2 className="font-display text-[clamp(1.35rem,2.5vw,2rem)] tracking-[-0.02em]">
                      {s.heading}
                    </h2>
                    <div className="mt-5 text-[15px] leading-[1.8] text-muted">
                      {s.body.split("\n").map((p, pi) => (
                        <p key={pi} className="mb-4 last:mb-0">{p}</p>
                      ))}
                    </div>
                  </Reveal>

                  {/* Section media */}
                  {s.media && s.media.length > 0 && (
                    <div className={`mt-8 grid gap-4 ${s.media.length > 1 ? "grid-cols-2" : ""}`}>
                      {s.media.map((url, mi) => (
                        <Reveal key={mi} delay={mi * 0.06}>
                          <div className="overflow-hidden rounded-sm bg-paper-warm">
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
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ── Gallery ── */}
      {item.gallery && item.gallery.length > 0 && (
        <Section spacing="md" className="border-t border-border">
          <Container>
            <Reveal>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                Gallery
              </p>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {item.gallery.map((url, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <div className="overflow-hidden rounded-sm bg-paper-warm">
                    <img
                      src={url}
                      alt={`Gallery ${i + 1}`}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ── Outcomes ── */}
      {item.outcomes && item.outcomes.length > 0 && (
        <Section spacing="lg" className="border-t border-border">
          <Container>
            <Reveal>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                Outcomes
              </p>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] tracking-[-0.02em]">
                What We Delivered
              </h2>
            </Reveal>
            <div className="mt-10">
              {item.outcomes.map((outcome, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <div className={`flex gap-5 py-5 sm:py-6 ${i < item.outcomes!.length - 1 ? "border-b border-border" : ""}`}>
                    <span className="text-[12px] font-semibold text-muted-light">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[14px] leading-[1.75] text-ink/80 sm:text-[15px]">
                      {outcome}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ── Related ── */}
      {related.length > 0 && (
        <Section spacing="lg" className="border-t border-border">
          <Container>
            <Reveal>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] tracking-[-0.02em]">
                Related Workstories
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
            <h2 className="mx-auto max-w-lg font-display text-[clamp(1.5rem,3.5vw,2.5rem)] tracking-[-0.02em] text-paper">
              Have a similar challenge?
            </h2>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center gap-2 bg-paper px-8 text-[13px] font-medium text-ink transition-colors duration-300 hover:bg-paper-warm"
              >
                Start a Conversation &rarr;
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
