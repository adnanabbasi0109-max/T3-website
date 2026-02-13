import Link from "next/link";
import { STATS } from "../../lib/utils";
import Reveal from "../../components/motion/Reveal";
import SlideIn from "../../components/motion/SlideIn";
import CountUp from "../../components/motion/CountUp";
import TextReveal from "../../components/motion/TextReveal";
import Marquee from "../../components/motion/Marquee";
import Container from "../../components/layout/Container";

export const metadata = {
  title: "About",
  description: "T3 Technologies — Defying conventional wisdom since 2004.",
};

export default function AboutPage() {
  return (
    <main>
      {/* ── Statement Hero — Full dark ── */}
      <section className="dark-section flex min-h-[80vh] items-center">
        <Container>
          <Reveal>
            <h1 className="max-w-4xl font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-[-0.02em] text-paper">
              We defy conventional wisdom — and document the proof.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-[15px] font-light leading-[1.75] tracking-[0.02em] text-paper/50">
              For more than two decades, T3 Technologies has been a leader in
              creative innovation, assisting premium brands, organizations, and
              individuals in achieving success.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Marquee divider ── */}
      <div className="border-y border-border py-4">
        <Marquee
          text="Delhi NCR · Jaipur · Bhopal · Since 2004 · T3 Technologies"
          className="text-[13px] font-medium uppercase tracking-[0.2em] text-muted/30"
          speed={45}
        />
      </div>

      {/* ── Stats — Asymmetric ── */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} stiffness="snappy">
                <div>
                  <p
                    className={`font-display tracking-[-0.02em] text-gold ${
                      i === 1
                        ? "text-[clamp(4rem,12vw,8rem)]"
                        : "text-[clamp(2.5rem,5vw,4rem)]"
                    }`}
                  >
                    <CountUp value={s.value} />
                  </p>
                  <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.15em] text-muted">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Philosophy — Dark pull-quote ── */}
      <section className="dark-section py-24 sm:py-32">
        <Container>
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-light/60">
              Philosophy
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="mt-8 max-w-3xl font-display text-[clamp(1.5rem,3.5vw,2.5rem)] italic leading-[1.3] tracking-[-0.02em] text-paper">
              &ldquo;We believe in a harmonious blend of tradition and
              innovation. Technology should enhance the human experience, not
              replace it.&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-xl text-[15px] leading-[1.8] text-paper/50">
              We create solutions that respect the past while embracing the
              future, putting technology to work for the betterment of
              humanity — ensuring progress is both thoughtful and purposeful.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Doctrine — Asymmetric 2:3 grid ── */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
            <SlideIn direction="left">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
                  Doctrine
                </p>
                <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,3rem)] tracking-[-0.02em]">
                  Defy Convention
                </h2>
                {/* Decorative vertical gold line */}
                <div className="mt-8 h-20 w-px bg-gold/30" />
              </div>
            </SlideIn>
            <SlideIn direction="right" delay={0.1}>
              <div className="space-y-6">
                <p className="text-[15px] leading-[1.8] text-muted">
                  For the moments when the playbook is obsolete and the future is
                  unwritten. Our engagement is a structured intervention designed
                  to move you from a competitive mindset to a category of one.
                </p>
                <p className="text-[15px] leading-[1.8] text-muted">
                  This is not a consultancy. It is a catalyst process —
                  methodology forged at the intersection of data, creativity, and
                  human behavior.
                </p>
              </div>
            </SlideIn>
          </div>
        </Container>
      </section>

      {/* ── Presence — SlideIn stack ── */}
      <section className="border-t border-border py-24 sm:py-32">
        <Container>
          <TextReveal
            text="Our Presence"
            as="h2"
            className="font-display text-[clamp(1.75rem,4vw,3rem)] tracking-[-0.02em]"
          />
          <div className="mt-14 space-y-12 lg:mt-20">
            {[
              { city: "Delhi NCR", desc: "Strategy, execution, and client engagement from the national capital region." },
              { city: "Jaipur", desc: "Strategy, execution, and client engagement from Jaipur." },
              { city: "Bhopal", desc: "Strategy, execution, and client engagement from Bhopal." },
            ].map((loc, i) => (
              <SlideIn key={loc.city} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.08}>
                <div className="grid items-start gap-4 border-t border-border pt-8 lg:grid-cols-[300px_1fr]">
                  <h3 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] tracking-[-0.02em]">
                    {loc.city}
                  </h3>
                  <p className="text-[15px] leading-[1.75] text-muted">
                    {loc.desc}
                  </p>
                </div>
              </SlideIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA — Dark ── */}
      <section className="dark-section relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="select-none font-display text-[20vw] leading-none text-paper/[0.03]">
            T3
          </span>
        </div>
        <Container className="relative">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <Reveal>
              <h2 className="font-display text-[clamp(1.75rem,4.5vw,3.5rem)] tracking-[-0.02em] text-paper">
                Let&apos;s build something worth documenting.
              </h2>
            </Reveal>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/work"
                className="rounded-full border border-paper/20 px-7 py-3 text-[13px] font-medium text-paper transition-all duration-300 hover:border-paper/40"
              >
                See Our Work
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gold px-7 py-3 text-[13px] font-medium text-white transition-all duration-300 hover:bg-gold-dark"
              >
                Start a Conversation
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
