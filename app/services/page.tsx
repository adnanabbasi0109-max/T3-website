import Link from "next/link";
import { SERVICES } from "../../lib/utils";
import Reveal from "../../components/motion/Reveal";
import Marquee from "../../components/motion/Marquee";
import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";

export const metadata = {
  title: "Services",
  description:
    "Brand Building, Business Innovations, PR, Social Media, Art & Design, AI & Tech.",
};

export default function ServicesPage() {
  return (
    <>
      {/* ── Header ── */}
      <Section spacing="lg">
        <Container>
          <Reveal>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              What We Do
            </p>
            <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] tracking-[-0.04em]">
              Services
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-[15px] leading-[1.85] text-muted sm:text-[16px]">
              Six disciplines. One doctrine: defy conventional wisdom,
              deconstruct complex systems to create simple, powerful solutions.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── Services List — expandable rows ── */}
      <Section spacing="md">
        <Container>
          <div>
            {SERVICES.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 0.04}>
                <div
                  className={`group grid gap-6 py-10 sm:gap-10 sm:py-14 lg:grid-cols-[3rem_1fr_1.5fr] lg:gap-16 ${
                    i < SERVICES.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="hidden lg:block">
                    <span className="text-[13px] font-bold tabular-nums text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-[22px] font-semibold tracking-[-0.02em] sm:text-[26px] transition-colors duration-500 group-hover:text-accent">
                      {svc.title}
                    </h2>
                    <p className="mt-2 text-[13px] font-medium text-accent/70">
                      {svc.tagline}
                    </p>
                  </div>
                  <p className="text-[15px] leading-[1.85] text-muted sm:text-[16px]">
                    {svc.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Marquee ── */}
      <Section spacing="none" className="py-7 sm:py-9">
        <div className="divider-fade mb-7 sm:mb-9" />
        <Marquee
          text="Brand Identity / Digital Experiences / PR Strategy / UX Design / Business Innovation / AI Solutions / Art Direction / Social Media"
          speed={50}
          className="text-[clamp(1rem,2vw,1.35rem)] font-medium tracking-[-0.01em] text-ink/25"
        />
        <div className="divider-fade mt-7 sm:mt-9" />
      </Section>

      {/* ── CTA ── */}
      <Section spacing="xl" dark className="rounded-t-[2rem] sm:rounded-t-[3rem]">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-xl font-display text-[clamp(2rem,4.5vw,3.25rem)] tracking-[-0.025em] text-paper">
              Not sure what you need?
            </h2>
            <p className="mx-auto mt-5 max-w-sm text-[15px] leading-[1.85] text-paper/40">
              Tell us your challenge. We&apos;ll map the right services.
            </p>
            <div className="mt-12">
              <Link
                href="/contact"
                className="btn-slide inline-flex h-[52px] items-center rounded-full bg-paper px-10 text-[14px] font-medium text-ink transition-all duration-600 hover:bg-paper-warm"
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
