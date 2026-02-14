import Link from "next/link";
import { SERVICES, STATS } from "../../lib/utils";
import Reveal from "../../components/motion/Reveal";
import CountUp from "../../components/motion/CountUp";
import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";

export const metadata = {
  title: "About",
  description: "T3 Technologies — Defying conventional wisdom since 2004.",
};

const PROOF_POINTS = [
  {
    stat: STATS[0],
    note: "Two decades of turning creative ambition into documented outcomes.",
  },
  {
    stat: STATS[1],
    note: "Each project a workstory — proof that strategy paired with craft delivers.",
  },
  {
    stat: STATS[3],
    note: "Brands return because we treat their challenges as our own.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Header ── */}
      <Section spacing="lg">
        <Container>
          <Reveal>
            <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              About T3
            </p>
            <h1 className="max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] tracking-[-0.04em]">
              Brand. Innovation. PR. Tech — engineered with humane intent.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-xl text-[15px] leading-[1.85] text-muted sm:text-[16px]">
              For more than two decades, T3 Technologies has been a leader in
              creative innovation, helping premium brands, organizations, and
              leaders achieve extraordinary outcomes.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── Philosophy ── */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-28">
            <Reveal>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Philosophy
                </p>
                <h2 className="mt-5 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.025em]">
                  Humane Technology
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-6 lg:pt-6">
                <p className="text-[15px] leading-[1.85] text-muted sm:text-[16px]">
                  We believe technology should elevate people, not replace them.
                  A harmonious blend of tradition and innovation — ensuring
                  progress is both thoughtful and purposeful.
                </p>
                <p className="text-[15px] leading-[1.85] text-muted sm:text-[16px]">
                  We create solutions that respect the past while embracing the
                  future. Every tool we build, every strategy we craft, is
                  designed to enhance the human experience.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── What We Do ── */}
      <Section spacing="lg">
        <Container>
          <div className="divider-fade mb-24 sm:mb-32" />
          <Reveal>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              Capabilities
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.025em]">
              What We Do
            </h2>
          </Reveal>

          <div className="mt-16">
            {SERVICES.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 0.03}>
                <div
                  className={`grid gap-4 py-8 sm:grid-cols-[3rem_1fr_1.5fr] sm:gap-10 sm:py-10 ${
                    i < SERVICES.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="hidden text-[13px] font-bold tabular-nums text-accent sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[17px] font-semibold tracking-[-0.015em] sm:text-[18px]">
                    {svc.title}
                  </h3>
                  <p className="text-[14px] leading-[1.85] text-muted sm:text-[15px]">
                    {svc.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Proof Points ── */}
      <Section spacing="lg" alt className="mx-4 rounded-[1.5rem] sm:mx-6 sm:rounded-[2rem] lg:mx-10">
        <Container>
          <Reveal>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              By the Numbers
            </p>
          </Reveal>
          <div className="mt-12 grid gap-14 sm:grid-cols-3 sm:gap-10 lg:gap-20">
            {PROOF_POINTS.map((pp, i) => (
              <Reveal key={pp.stat.label} delay={i * 0.08}>
                <div>
                  <p className="font-display text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.03em]">
                    <CountUp value={pp.stat.value} />
                  </p>
                  <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-light">
                    {pp.stat.label}
                  </p>
                  <p className="mt-5 text-[14px] leading-[1.85] text-muted">
                    {pp.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <Section spacing="xl" dark>
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em] text-paper">
              Let&apos;s build something worth documenting.
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
