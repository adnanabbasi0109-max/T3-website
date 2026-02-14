import Link from "next/link";
import { dbConnect } from "../lib/db";
import { CaseStudy } from "../models/CaseStudy";
import { serialize, SERVICES } from "../lib/utils";
import type { CaseStudyDoc } from "../lib/utils";
import ScrollTypeHero from "../components/motion/ScrollTypeHero";
import HowWeWork from "../components/sections/HowWeWork";
import Reveal from "../components/motion/Reveal";
import Marquee from "../components/motion/Marquee";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import FeaturedWorkCard from "../components/work/FeaturedWorkCard";

async function getFeaturedStudies(): Promise<CaseStudyDoc[]> {
  try {
    await dbConnect();
    const docs = await CaseStudy.find({ featured: true })
      .sort({ order: 1, year: -1 })
      .limit(4)
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
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-28">
            <Reveal>
              <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                Who We Are
              </p>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.03em]">
                Technology that elevates people, not replaces them.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="space-y-6 lg:pt-10">
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

      {/* ── How We Work ── */}
      <HowWeWork />

      {/* ── Featured Work ── */}
      {featured.length > 0 && (
        <Section spacing="lg">
          <Container>
            <Reveal>
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                    Selected Work
                  </p>
                  <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.03em]">
                    Workstories
                  </h2>
                </div>
                <Link
                  href="/work"
                  className="link-underline hidden shrink-0 text-[13px] font-medium text-muted transition-colors duration-500 hover:text-ink sm:block"
                >
                  View all &rarr;
                </Link>
              </div>
            </Reveal>

            <div className="mt-20 grid gap-14 sm:mt-24 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-20">
              {featured.map((cs, i) => (
                <Reveal key={cs.slug} delay={i * 0.06}>
                  <FeaturedWorkCard cs={cs} />
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-16 text-center sm:hidden">
              <Link
                href="/work"
                className="link-underline text-[13px] font-medium text-muted transition-colors duration-500 hover:text-ink"
              >
                View all workstories &rarr;
              </Link>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* ── Capabilities ── */}
      <Section spacing="lg">
        <Container>
          <Reveal>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              What We Do
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.03em]">
              Capabilities
            </h2>
          </Reveal>

          <div className="mt-16">
            {SERVICES.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 0.03}>
                <div className={`flex items-baseline gap-6 py-6 sm:gap-8 sm:py-7 ${
                  i < SERVICES.length - 1 ? "border-b border-border" : ""
                }`}>
                  <span className="w-6 shrink-0 text-[12px] font-medium tabular-nums text-muted-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-1 flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-6">
                    <h3 className="text-[16px] font-semibold tracking-[-0.015em] sm:w-60 sm:shrink-0 sm:text-[17px]">
                      {svc.title}
                    </h3>
                    <p className="text-[14px] leading-[1.75] text-muted">
                      {svc.tagline}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Marquee ── */}
      <Section spacing="none" className="py-10 sm:py-12">
        <div className="divider-fade mb-10 sm:mb-12" />
        <Marquee
          text="Brand Identity / Digital Experiences / PR Strategy / UX Design / Business Innovation / AI Solutions / Art Direction / Social Media"
          speed={55}
          className="text-[clamp(1rem,2vw,1.25rem)] font-medium tracking-[-0.01em] text-ink/10"
        />
        <div className="divider-fade mt-10 sm:mt-12" />
      </Section>

      {/* ── CTA ── */}
      <Section spacing="xl" dark>
        <Container className="text-center">
          <Reveal>
            <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              Let&apos;s Create Together
            </p>
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(2rem,5vw,3.75rem)] tracking-[-0.035em] text-paper">
              Ready to build something worth documenting?
            </h2>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/work"
                className="inline-flex h-[52px] items-center rounded-full border border-paper/12 px-10 text-[14px] font-medium text-paper transition-all duration-500 hover:border-paper/25"
              >
                See Our Work
              </Link>
              <Link
                href="/contact"
                className="btn-slide inline-flex h-[52px] items-center rounded-full bg-paper px-10 text-[14px] font-medium text-ink transition-all duration-500 hover:bg-paper-warm"
              >
                <span className="btn-text">Start a Conversation &rarr;</span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
