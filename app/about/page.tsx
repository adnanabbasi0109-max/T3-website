import Link from "next/link";
import { STATS } from "../../lib/utils";
import Reveal from "../../components/motion/Reveal";
import CountUp from "../../components/motion/CountUp";
import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";

export const metadata = {
  title: "About",
  description: "T3 Technologies — Defying conventional wisdom since 2004.",
};

const LOCATIONS = [
  { city: "Delhi NCR", desc: "Strategy, execution, and client engagement from the national capital region." },
  { city: "Jaipur", desc: "Creative production and regional partnerships." },
  { city: "Bhopal", desc: "Central India operations and emerging market reach." },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Header ── */}
      <Section spacing="lg">
        <Container>
          <Reveal>
            <h1 className="max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] tracking-[-0.035em]">
              We defy conventional wisdom — and document the proof.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-xl text-[15px] leading-[1.85] text-muted sm:text-[16px]">
              For more than two decades, T3 Technologies has been a leader in
              creative innovation, helping premium brands, organizations, and
              leaders achieve extraordinary outcomes.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── Stats — on warm background ── */}
      <Section spacing="md" alt className="rounded-[2rem] sm:rounded-[3rem] mx-4 sm:mx-6 lg:mx-10">
        <Container>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="text-center sm:text-left">
                  <p className="font-display text-[clamp(2.25rem,5vw,3.75rem)] tracking-[-0.03em]">
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

      {/* ── Philosophy ── */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Philosophy
                </p>
                <h2 className="mt-4 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.025em]">
                  Humane Technology
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-6">
                <p className="text-[15px] leading-[1.85] text-muted sm:text-[16px]">
                  We believe in a harmonious blend of tradition and innovation.
                  Technology should enhance the human experience, not replace it.
                </p>
                <p className="text-[15px] leading-[1.85] text-muted sm:text-[16px]">
                  We create solutions that respect the past while embracing the
                  future — ensuring progress is both thoughtful and purposeful.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Doctrine ── */}
      <Section spacing="lg" className="border-t border-border">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Doctrine
                </p>
                <h2 className="mt-4 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.025em]">
                  Defy Convention
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-6">
                <p className="text-[15px] leading-[1.85] text-muted sm:text-[16px]">
                  For the moments when the playbook is obsolete and the future is
                  unwritten. Our engagement is a structured intervention designed
                  to move you from a competitive mindset to a category of one.
                </p>
                <p className="text-[15px] leading-[1.85] text-muted sm:text-[16px]">
                  This is not a consultancy. It is a catalyst process — methodology
                  forged at the intersection of data, creativity, and human
                  behavior.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Locations ── */}
      <Section spacing="lg" className="border-t border-border">
        <Container>
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              Offices
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.025em]">
              Our Presence
            </h2>
          </Reveal>
          <div className="mt-12">
            {LOCATIONS.map((loc, i) => (
              <Reveal key={loc.city} delay={i * 0.06}>
                <div className={`flex gap-8 py-7 sm:gap-12 sm:py-9 lg:gap-20 ${i < LOCATIONS.length - 1 ? "border-b border-border" : ""}`}>
                  <h3 className="w-28 shrink-0 text-[16px] font-semibold tracking-[-0.01em] sm:w-44 sm:text-[18px]">
                    {loc.city}
                  </h3>
                  <p className="text-[14px] leading-[1.85] text-muted sm:text-[15px]">
                    {loc.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <Section spacing="xl" dark className="rounded-t-[2rem] sm:rounded-t-[3rem]">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em] text-paper">
              Let&apos;s build something worth documenting.
            </h2>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/work"
                className="inline-flex h-13 items-center rounded-full border border-paper/20 px-8 text-[14px] font-medium text-paper transition-all duration-600 hover:border-paper/40"
              >
                See Our Work
              </Link>
              <Link
                href="/contact"
                className="btn-slide inline-flex h-13 items-center rounded-full bg-paper px-8 text-[14px] font-medium text-ink transition-all duration-600 hover:bg-paper-warm"
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
