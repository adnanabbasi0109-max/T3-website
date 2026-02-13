import Link from "next/link";
import { SERVICES } from "../../lib/utils";
import Reveal from "../../components/ui/reveal";

export const metadata = {
  title: "Services",
  description:
    "Brand Building, Business Innovations, PR, Social Media, Art & Design, AI & Tech.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
              What We Do
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Services
            </h1>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted">
              Six disciplines. One doctrine: deconstruct complexity into
              powerful simplicity. Every service is delivered with proof —
              measurable outcomes, not promises.
            </p>
          </Reveal>

          <div className="mt-20 space-y-20">
            {SERVICES.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 0.08}>
                <div className="grid items-start gap-8 sm:grid-cols-[100px_1fr]">
                  <div className="font-editorial text-5xl font-bold text-border dark:text-border-dark">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                      {svc.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
                      {svc.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-28 dark:border-border-dark">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
          <Reveal>
            <h2 className="font-editorial text-3xl font-bold tracking-tight sm:text-4xl">
              Not sure what you need?
            </h2>
            <p className="mt-5 text-[16px] text-muted">
              Tell us your challenge. We&apos;ll map the right combination of
              services.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-surface-dark px-8 py-4 text-[13px] font-semibold text-white transition hover:shadow-lg hover:shadow-black/10 dark:bg-white dark:text-black"
            >
              Start a Conversation &rarr;
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
