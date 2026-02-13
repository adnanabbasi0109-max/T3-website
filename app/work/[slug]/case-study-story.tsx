"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CaseStudyDoc } from "../../../lib/utils";
import { useShortlist } from "../../../components/ui/shortlist-provider";
import CaseStudyCard from "../../../components/ui/case-study-card";
import Reveal from "../../../components/motion/Reveal";
import TextReveal from "../../../components/motion/TextReveal";
import ParallaxImage from "../../../components/motion/ParallaxImage";
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
  const sections = item.sections || [];

  return (
    <main>
      {/* ── Full-bleed Hero Image ── */}
      <section className="relative w-full">
        {item.heroImage ? (
          <div className="h-[70vh] min-h-[500px] w-full overflow-hidden">
            <ParallaxImage
              src={item.heroImage}
              alt={item.title}
              aspect="aspect-auto"
              speed={0.2}
              className="h-full w-full [&>img]:h-full [&>img]:w-full"
            />
          </div>
        ) : (
          <div className="flex h-[70vh] min-h-[500px] w-full items-center justify-center bg-paper-warm">
            <span className="select-none font-display text-[30vw] leading-none text-border/20">
              {item.title.charAt(0)}
            </span>
          </div>
        )}
      </section>

      {/* ── Overlapping Title Block ── */}
      <section className="relative -mt-20 lg:-mt-28">
        <Container>
          <div className="rounded-lg bg-paper p-8 shadow-[0_-20px_60px_rgba(0,0,0,0.08)] lg:p-12">
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted">
                {item.client || "Case Study"}
              </p>
              <h1 className="mt-4 font-display text-[clamp(2rem,5vw,4.5rem)] tracking-[-0.02em]">
                {item.title}
              </h1>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Dark Meta Strip ── */}
      <section className="dark-section">
        <Container>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 py-8">
            {item.year && (
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-paper/40">
                  Year
                </span>
                <p className="text-[15px] font-semibold text-paper">
                  {item.year}
                </p>
              </div>
            )}
            {item.locations && item.locations.length > 0 && (
              <>
                <div className="hidden h-4 w-px bg-border-dark sm:block" />
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-paper/40">
                    Location
                  </span>
                  <p className="text-[15px] font-semibold text-paper">
                    {item.locations.join(", ")}
                  </p>
                </div>
              </>
            )}
            {item.domains && item.domains.length > 0 && (
              <>
                <div className="hidden h-4 w-px bg-border-dark sm:block" />
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-paper/40">
                    Domain
                  </span>
                  <p className="text-[15px] font-semibold text-paper">
                    {item.domains.join(", ")}
                  </p>
                </div>
              </>
            )}
            {item.industries && item.industries.length > 0 && (
              <>
                <div className="hidden h-4 w-px bg-border-dark sm:block" />
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-paper/40">
                    Industry
                  </span>
                  <p className="text-[15px] font-semibold text-paper">
                    {item.industries.join(", ")}
                  </p>
                </div>
              </>
            )}

            {/* Save button — pushed to the right */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              onClick={() => (saved ? remove(item.slug) : add(item.slug))}
              className={`ml-auto flex shrink-0 items-center gap-2 rounded-full border px-5 py-2 text-[13px] font-medium transition-all duration-300 ${
                saved
                  ? "border-gold bg-gold text-white"
                  : "border-paper/20 text-paper/60 hover:border-paper/40 hover:text-paper"
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
              {saved ? "Saved" : "Save"}
            </motion.button>
          </div>
        </Container>
      </section>

      {/* ── Sections — Alternating Zigzag ── */}
      {sections.length > 0 && (
        <section className="py-24 lg:py-36">
          <Container>
            <div className="space-y-28 lg:space-y-40">
              {sections.map((s, i) => {
                const isEven = i % 2 === 0;
                const hasMedia = s.media && s.media.length > 0;

                return (
                  <article key={i} className="scroll-mt-28">
                    {/* Decorative number */}
                    <Reveal delay={i * 0.05}>
                      <span className="font-display text-[clamp(3rem,6vw,6rem)] leading-none text-border/15">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Reveal>

                    <div
                      className={`mt-8 grid items-start gap-12 lg:gap-20 ${
                        hasMedia
                          ? isEven
                            ? "lg:grid-cols-[1fr_1fr]"
                            : "lg:grid-cols-[1fr_1fr]"
                          : ""
                      }`}
                    >
                      {/* Text */}
                      <div className={hasMedia && !isEven ? "lg:order-2" : ""}>
                        <TextReveal
                          text={s.heading}
                          as="h2"
                          className="font-display text-[clamp(1.5rem,3vw,2.25rem)] tracking-[-0.02em]"
                          mode="word"
                          stagger={0.03}
                        />
                        <Reveal delay={0.15}>
                          <div className="mt-8 text-[15px] leading-[1.85] text-muted">
                            {s.body.split("\n").map((p, pi) => (
                              <p key={pi} className="mb-5 last:mb-0">
                                {p}
                              </p>
                            ))}
                          </div>
                        </Reveal>
                      </div>

                      {/* Media */}
                      {hasMedia && (
                        <div
                          className={`grid gap-6 ${
                            (s.media?.length ?? 0) > 1 ? "grid-cols-2" : ""
                          } ${!isEven ? "lg:order-1" : ""}`}
                        >
                          {s.media!.map((url, mi) => (
                            <Reveal key={mi} delay={mi * 0.08} scale>
                              <ParallaxImage
                                src={url}
                                alt={`${s.heading} ${mi + 1}`}
                                aspect="aspect-video"
                                className="rounded-lg"
                                grayscale
                              />
                            </Reveal>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* ── Gallery — Masonry-like ── */}
      {item.gallery && item.gallery.length > 0 && (
        <section className="border-t border-border py-24 lg:py-36">
          <Container>
            <Reveal>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] tracking-[-0.02em]">
                Gallery
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {item.gallery.map((url, i) => (
                <Reveal key={i} delay={i * 0.06} scale>
                  <div
                    className={`overflow-hidden rounded-lg bg-paper-warm ${
                      i % 3 === 0 ? "sm:row-span-2 aspect-[3/4]" : "aspect-[4/3]"
                    }`}
                  >
                    <img
                      src={url}
                      alt={`Gallery ${i + 1}`}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
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
        <section className="dark-section py-28 lg:py-40">
          <Container>
            <Reveal>
              <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] tracking-[-0.02em] text-paper">
                What We Delivered
              </h2>
            </Reveal>
            <div className="mt-16 space-y-0">
              {item.outcomes.map((outcome, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="grid items-start gap-6 border-t border-paper/10 py-10 lg:grid-cols-[100px_1fr]">
                    <span className="font-display text-[clamp(2rem,4vw,3rem)] leading-none text-gold/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[15px] leading-[1.8] text-paper/70">
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
        <section className="py-28 lg:py-40">
          <Container>
            <TextReveal
              text="Related Workstories"
              as="h2"
              className="font-display text-[clamp(1.5rem,3vw,2.25rem)] tracking-[-0.02em]"
            />
            <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((cs, i) => (
                <Reveal key={cs.slug} delay={i * 0.08} scale>
                  <CaseStudyCard cs={cs} size="compact" />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── CTA — Asymmetric ── */}
      <section className="dark-section py-28 lg:py-40">
        <Container>
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            <Reveal>
              <h2 className="font-display text-[clamp(1.75rem,5vw,3.5rem)] tracking-[-0.02em] text-paper">
                Have a similar challenge?
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <Link
                href="/contact"
                className="inline-flex h-[52px] items-center gap-2 bg-paper px-10 text-[13px] font-medium text-ink transition-all duration-300 hover:bg-paper/90"
              >
                Start a Conversation&nbsp;&rarr;
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
