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
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              About T3
            </p>
            <h1 className="max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] leading-[1.08] tracking-[-0.025em]">
              We defy conventional wisdom — and document the proof.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.75] text-muted sm:text-base">
              For more than two decades, T3 Technologies has been a leader in
              creative innovation, assisting premium brands, organizations, and
              individuals in achieving success.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── Stats ── */}
      <Section spacing="md" className="border-t border-border">
        <Container>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div>
                  <p className="font-display text-[clamp(2rem,4vw,3rem)] tracking-[-0.02em]">
                    <CountUp value={s.value} />
                  </p>
                  <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.12em] text-muted">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Philosophy ── */}
      <Section spacing="lg" className="border-t border-border">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
            <Reveal>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Philosophy
                </p>
                <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.25rem)] tracking-[-0.02em]">
                  Humane Technology
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-5">
                <p className="text-[15px] leading-[1.8] text-muted sm:text-base">
                  We believe in a harmonious blend of tradition and
                  innovation. Technology should enhance the human experience, not
                  replace it.
                </p>
                <p className="text-[15px] leading-[1.8] text-muted sm:text-base">
                  We create solutions that respect the past while embracing the
                  future, putting technology to work for the betterment of
                  humanity — ensuring progress is both thoughtful and purposeful.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Doctrine ── */}
      <Section spacing="lg" className="border-t border-border">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
            <Reveal>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Doctrine
                </p>
                <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.25rem)] tracking-[-0.02em]">
                  Defy Convention
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-5">
                <p className="text-[15px] leading-[1.8] text-muted sm:text-base">
                  For the moments when the playbook is obsolete and the future is
                  unwritten. Our engagement is a structured intervention designed
                  to move you from a competitive mindset to a category of one.
                </p>
                <p className="text-[15px] leading-[1.8] text-muted sm:text-base">
                  This is not a consultancy. It is a catalyst process —
                  methodology forged at the intersection of data, creativity, and
                  human behavior.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Presence ── */}
      <Section spacing="lg" className="border-t border-border">
        <Container>
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Locations
            </p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] tracking-[-0.02em]">
              Our Presence
            </h2>
          </Reveal>
          <div className="mt-10">
            {LOCATIONS.map((loc, i) => (
              <Reveal key={loc.city} delay={i * 0.06}>
                <div className={`flex gap-6 py-6 sm:gap-10 sm:py-8 lg:gap-16 ${i < LOCATIONS.length - 1 ? "border-b border-border" : ""}`}>
                  <h3 className="w-28 shrink-0 text-[16px] font-semibold tracking-[-0.01em] sm:w-40 sm:text-[18px]">
                    {loc.city}
                  </h3>
                  <p className="text-[14px] leading-[1.75] text-muted sm:text-[15px]">
                    {loc.desc}
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
            <h2 className="mx-auto max-w-lg font-display text-[clamp(1.5rem,3.5vw,2.5rem)] tracking-[-0.02em] text-paper">
              Let&apos;s build something worth documenting.
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/work"
                className="inline-flex h-11 items-center border border-paper/20 px-6 text-[13px] font-medium text-paper transition-colors duration-300 hover:border-paper/40"
              >
                See Our Work
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center bg-paper px-6 text-[13px] font-medium text-ink transition-colors duration-300 hover:bg-paper-warm"
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
