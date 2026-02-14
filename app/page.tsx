import Link from "next/link";
import { dbConnect } from "../lib/db";
import { CaseStudy } from "../models/CaseStudy";
import { serialize, SERVICES, STATS } from "../lib/utils";
import type { CaseStudyDoc } from "../lib/utils";
import ScrollTypeHero from "../components/motion/ScrollTypeHero";
import WorkstoryPreview from "../components/work/WorkstoryPreview";
import Reveal from "../components/motion/Reveal";
import CountUp from "../components/motion/CountUp";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";

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

const DOMAINS = SERVICES.map((s) => s.title);

export default async function Home() {
  const featured = await getFeaturedStudies();

  return (
    <>
      {/* ── Hero ── */}
      <ScrollTypeHero />

      {/* ── Proof Stats Strip ── */}
      <Section spacing="none" className="py-16 sm:py-20">
        <Container>
          <div className="divider-fade mb-14 sm:mb-16" />
          <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-8">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div>
                  <p className="font-display text-[clamp(2rem,4vw,3rem)] tracking-[-0.03em]">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-light">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="divider-fade mt-14 sm:mt-16" />
        </Container>
      </Section>

      {/* ── Domains — minimal list ── */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-28">
            <Reveal>
              <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                What We Do
              </p>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.03em]">
                Six domains.
                <br />
                One intent.
              </h2>
              <p className="mt-6 text-[15px] leading-[1.85] text-muted sm:text-[16px]">
                Brand. Innovation. PR. Tech — built with humane intent.
                Every domain connects to a single goal: elevating people
                through thoughtful strategy and craft.
              </p>
              <Link
                href="/domains"
                className="link-underline mt-8 inline-block text-[13px] font-medium text-muted transition-colors duration-500 hover:text-ink"
              >
                Explore domains &rarr;
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-0">
                {DOMAINS.map((domain, i) => (
                  <Link
                    key={domain}
                    href={`/domains#${domain.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
                    className="group flex items-baseline justify-between gap-4 border-b border-border py-5 transition-colors duration-500 hover:text-accent sm:py-6"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="text-[11px] font-medium tabular-nums text-muted-light">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[16px] font-semibold tracking-[-0.015em] sm:text-[17px]">
                        {domain}
                      </span>
                    </div>
                    <span className="text-[12px] text-muted-light transition-transform duration-500 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Featured Workstories — hover preview ── */}
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

            <div className="mt-16 sm:mt-20">
              <WorkstoryPreview items={featured} />
            </div>

            <Reveal className="mt-12 text-center sm:hidden">
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

      {/* ── Philosophy teaser ── */}
      <Section spacing="lg" alt className="mx-4 rounded-[1.5rem] sm:mx-6 sm:rounded-[2rem] lg:mx-10">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-28">
            <Reveal>
              <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                Philosophy
              </p>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.03em]">
                Humane Technology
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-6 lg:pt-6">
                <p className="text-[15px] leading-[1.85] text-muted sm:text-[16px]">
                  Technology should elevate people, not replace them. We create
                  solutions at the intersection of data, creativity, and human
                  behavior — ensuring progress is both thoughtful and purposeful.
                </p>
                <Link
                  href="/about"
                  className="link-underline inline-block text-[13px] font-medium text-ink transition-colors duration-500 hover:text-accent"
                >
                  Read the doctrine &rarr;
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <Section spacing="xl" dark>
        <Container className="text-center">
          <Reveal>
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
