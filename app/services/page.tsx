import Link from "next/link";
import { SERVICES } from "../../lib/utils";
import Reveal from "../../components/motion/Reveal";
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
      <Section spacing="md">
        <Container>
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              What We Do
            </p>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.03em]">
              Services
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-lg text-[15px] leading-[1.75] text-muted sm:text-base">
              Six disciplines. One doctrine: defy conventional wisdom,
              deconstruct complex systems to create simple, powerful solutions.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── Services List ── */}
      <Section spacing="lg" className="border-t border-border">
        <Container>
          <div>
            {SERVICES.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 0.04}>
                <div
                  className={`grid gap-4 py-8 sm:gap-8 sm:py-10 lg:grid-cols-[200px_1fr_1.5fr] lg:gap-12 ${
                    i < SERVICES.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div>
                    <span className="text-[11px] font-semibold text-muted-light">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-display text-[clamp(1.15rem,2vw,1.5rem)] tracking-[-0.015em]">
                      {svc.title}
                    </h2>
                    <p className="mt-1.5 text-[12px] font-medium text-gold">
                      {svc.tagline}
                    </p>
                  </div>
                  <p className="text-[14px] leading-[1.75] text-muted sm:text-[15px]">
                    {svc.desc}
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
            <h2 className="mx-auto max-w-md font-display text-[clamp(1.5rem,3vw,2.25rem)] tracking-[-0.02em] text-paper">
              Not sure what you need?
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-[15px] leading-[1.75] text-paper/50">
              Tell us your challenge. We&apos;ll map the right services.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center gap-2 bg-paper px-8 text-[13px] font-medium text-ink transition-colors duration-300 hover:bg-paper-warm"
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
