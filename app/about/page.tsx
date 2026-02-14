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

const DOCTRINE = [
  {
    title: "Defy conventional wisdom",
    body: "The best solutions rarely come from the playbook everyone else is reading. We question assumptions, challenge defaults, and find the path others overlook.",
  },
  {
    title: "Deconstruct complexity",
    body: "Every problem, no matter how tangled, can be broken into clear, solvable parts. We don't simplify — we clarify. Then we build with precision.",
  },
  {
    title: "Operate at the intersection",
    body: "The most powerful work lives where data, creativity, and human behavior converge. We don't pick a lane — we build at the crossroads.",
  },
];

const PRESENCE = [
  { city: "Bhopal", role: "Headquarters" },
  { city: "Delhi NCR", role: "Team presence" },
  { city: "Jaipur", role: "Team presence" },
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
              We defy conventional wisdom — and document the proof.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-xl text-[15px] leading-[1.85] text-muted sm:text-[16px]">
              For more than two decades, T3 Technologies has operated at the
              intersection of data, creativity, and human behavior — helping
              premium brands achieve outcomes worth documenting.
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
                  Technology should elevate people, not replace them. We believe
                  in a harmonious blend of tradition and innovation — ensuring
                  progress is both thoughtful and purposeful.
                </p>
                <p className="text-[15px] leading-[1.85] text-muted sm:text-[16px]">
                  Brand. Innovation. PR. Tech — built with humane intent. Every
                  tool we create, every strategy we craft, is designed to enhance
                  the human experience.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── The Doctrine ── */}
      <Section spacing="lg" alt className="mx-4 rounded-[1.5rem] sm:mx-6 sm:rounded-[2rem] lg:mx-10">
        <Container>
          <Reveal>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              The Doctrine
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.025em]">
              Three convictions
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-12 sm:mt-20 sm:grid-cols-3 sm:gap-10 lg:gap-16">
            {DOCTRINE.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div>
                  <span className="text-[13px] font-bold tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.85] text-muted sm:text-[15px]">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Proof Points ── */}
      <Section spacing="lg">
        <Container>
          <Reveal>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              By the Numbers
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-10 sm:grid-cols-4 lg:gap-16">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div>
                  <p className="font-display text-[clamp(2rem,4.5vw,3.5rem)] tracking-[-0.03em]">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-light">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Presence ── */}
      <Section spacing="lg">
        <Container>
          <div className="divider-fade mb-20 sm:mb-24" />
          <Reveal>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              Presence
            </p>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.025em]">
              Rooted in Bhopal. Present across the country.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-3 sm:gap-10 lg:gap-16">
            {PRESENCE.map((loc, i) => (
              <Reveal key={loc.city} delay={i * 0.06}>
                <div className="border-b border-border pb-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-light">
                    {loc.role}
                  </p>
                  <p className="mt-3 text-[18px] font-semibold tracking-[-0.02em] sm:text-[20px]">
                    {loc.city}
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
