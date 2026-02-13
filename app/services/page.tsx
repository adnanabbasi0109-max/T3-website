import Link from "next/link";
import { SERVICES } from "../../lib/utils";
import Reveal from "../../components/motion/Reveal";
import Container from "../../components/layout/Container";

export const metadata = {
  title: "Services",
  description:
    "Brand Building, Business Innovations, PR, Social Media, Art & Design, AI & Tech.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className="pb-24 pt-20 sm:pb-32 sm:pt-28 lg:pt-36">
        <Container>
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
              What We Do
            </p>
            <h1 className="mt-5 text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold tracking-[-0.03em]">
              Services
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-[1.75] text-muted">
              Six disciplines. One doctrine: defy conventional wisdom,
              deconstruct complex systems to create simple, powerful solutions.
            </p>
          </Reveal>

          <div className="mt-20 space-y-0 lg:mt-28">
            {SERVICES.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 0.06}>
                <div className="grid items-start gap-5 border-t border-border py-12 sm:grid-cols-[80px_1fr] lg:py-16">
                  <span className="text-[clamp(2rem,3.5vw,3rem)] font-extrabold tracking-[-0.03em] text-border">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-[22px] font-bold tracking-[-0.02em]">
                      {svc.title}
                    </h2>
                    <p className="mt-2 text-[13px] font-medium uppercase tracking-[0.1em] text-gold">
                      {svc.tagline}
                    </p>
                    <p className="mt-4 text-[15px] leading-[1.8] text-muted">
                      {svc.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-24 sm:py-32">
        <Container className="text-center">
          <Reveal>
            <h2 className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-bold tracking-[-0.03em]">
              Not sure what you need?
            </h2>
            <p className="mx-auto mt-5 text-[15px] leading-[1.75] text-muted">
              Tell us your challenge. We&apos;ll map the right services.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex h-[50px] items-center gap-2 rounded-full bg-surface-dark px-9 text-[13px] font-medium text-white transition-all duration-300 hover:bg-surface-dark/85"
            >
              Start a Conversation&nbsp;&rarr;
            </Link>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
