import Link from "next/link";
import { SERVICES } from "../../lib/utils";
import Reveal from "../../components/motion/Reveal";
import Container from "../../components/layout/Container";

export const metadata = {
  title: "Services",
  description: "Brand Building, Business Innovations, PR, Social Media, Art & Design, AI & Tech.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className="pb-32 pt-28 lg:pt-36">
        <Container>
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
              What We Do
            </p>
            <h1 className="mt-4 text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight">
              Services
            </h1>
            <p className="mt-5 text-[15px] leading-[1.7] text-muted">
              Six disciplines. One doctrine: deconstruct complexity into powerful simplicity.
            </p>
          </Reveal>

          <div className="mt-24 space-y-24">
            {SERVICES.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 0.06}>
                <div className="grid items-start gap-6 sm:grid-cols-[80px_1fr]">
                  <span className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold tracking-tight text-border">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-[22px] font-bold tracking-tight">{svc.title}</h2>
                    <p className="mt-3 text-[14px] leading-[1.75] text-muted">{svc.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-32">
        <Container className="text-center">
          <Reveal>
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-tight">
              Not sure what you need?
            </h2>
            <p className="mx-auto mt-4 text-[15px] text-muted">
              Tell us your challenge. We&apos;ll map the right services.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-surface-dark px-8 text-[13px] font-medium text-white transition hover:opacity-90"
            >
              Start a Conversation &rarr;
            </Link>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
