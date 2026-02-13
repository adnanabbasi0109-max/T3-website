import Link from "next/link";
import { dbConnect } from "../lib/db";
import { CaseStudy } from "../models/CaseStudy";
import { serialize, STATS } from "../lib/utils";
import type { CaseStudyDoc } from "../lib/utils";
import ScrollTypeHero from "../components/motion/ScrollTypeHero";
import Reveal from "../components/motion/Reveal";
import CountUp from "../components/motion/CountUp";
import Marquee from "../components/motion/Marquee";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import CaseStudyCard from "../components/ui/case-study-card";

async function getFeaturedStudies(): Promise<CaseStudyDoc[]> {
  try {
    await dbConnect();
    const docs = await CaseStudy.find({ featured: true })
      .sort({ order: 1, year: -1 })
      .limit(6)
      .lean();
    return serialize(docs);
  } catch {
    return [];
  }
}

export default async function Home() {
  const featured = await getFeaturedStudies();

  return (
    <>
      {/* ── Hero ── */}
      <ScrollTypeHero />

      {/* ── Value Proposition ── */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em]">
                Every brand has a story.
                <br />
                We make it unforgettable.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="space-y-5">
                <p className="text-[15px] leading-[1.85] text-muted sm:text-[16px]">
                  T3 Technologies blends creative innovation with strategic
                  precision. For more than two decades, we&apos;ve helped brands,
                  organizations, and leaders navigate inflection points — turning
                  complexity into clarity.
                </p>
                <p className="text-[15px] leading-[1.85] text-muted sm:text-[16px]">
                  Our work is proof-led. Every engagement becomes a workstory —
                  documented outcomes that speak louder than promises.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Stats ── */}
      <Section spacing="md" alt>
        <Container>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="text-center sm:text-left">
                  <p className="font-display text-[clamp(2.25rem,5vw,3.75rem)] tracking-[-0.03em] text-ink">
                    <CountUp value={s.value} />
                  </p>
                  <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Featured Work ── */}
      {featured.length > 0 && (
        <Section spacing="lg">
          <Container>
            <Reveal>
              <div className="flex items-end justify-between gap-6">
                <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em]">
                  Selected Work
                </h2>
                <Link
                  href="/work"
                  className="hidden shrink-0 text-[13px] font-medium text-muted transition-colors duration-500 hover:text-ink sm:block"
                >
                  View all &rarr;
                </Link>
              </div>
            </Reveal>

            {/* Work grid — 2-col with cinematic cards */}
            <div className="mt-14 grid gap-8 sm:mt-16 sm:grid-cols-2 sm:gap-10">
              {featured.map((cs, i) => (
                <Reveal key={cs.slug} delay={i * 0.06}>
                  <CaseStudyCard cs={cs} />
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 text-center sm:hidden">
              <Link
                href="/work"
                className="text-[13px] font-medium text-muted transition-colors duration-500 hover:text-ink"
              >
                View all workstories &rarr;
              </Link>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* ── Services Marquee ── */}
      <Section spacing="none" className="border-y border-border py-6 sm:py-8">
        <Marquee
          text="Brand Identity / Digital Experiences / PR Strategy / UX Design / Business Innovation / AI Solutions / Art Direction / Social Media"
          speed={50}
          className="text-[clamp(1rem,2vw,1.35rem)] font-medium tracking-[-0.01em] text-ink/30"
        />
      </Section>

      {/* ── CTA ── */}
      <Section spacing="xl" dark className="rounded-t-[2rem] sm:rounded-t-[3rem]">
        <Container className="text-center">
          <Reveal>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              Where Different Is the Standard
            </p>
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(2rem,5vw,3.75rem)] tracking-[-0.03em] text-paper">
              How about we do a thing or two?
            </h2>
            <div className="mt-12">
              <Link
                href="/contact"
                className="btn-slide inline-flex h-14 items-center rounded-full bg-paper px-10 text-[14px] font-medium text-ink transition-all duration-600 hover:bg-paper-warm"
              >
                <span className="btn-text">Get in touch &rarr;</span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
