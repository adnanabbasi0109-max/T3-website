import Link from "next/link";
import { SERVICES } from "../../lib/utils";

export const metadata = {
  title: "Services",
  description: "Brand Building, Business Innovations, PR, Social Media, Art & Design, AI & Tech.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            What We Do
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Services
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-500 dark:text-neutral-400">
            Six disciplines. One doctrine: deconstruct complexity into powerful
            simplicity. Every service is delivered with proof — measurable
            outcomes, not promises.
          </p>

          <div className="mt-16 space-y-16">
            {SERVICES.map((svc, i) => (
              <div
                key={svc.title}
                className="grid items-start gap-8 sm:grid-cols-[120px_1fr]"
              >
                <div className="text-5xl font-bold text-neutral-100 dark:text-neutral-800">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{svc.title}</h2>
                  <p className="mt-3 max-w-xl text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-100 py-24 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Not sure what you need?
          </h2>
          <p className="mt-4 text-neutral-500 dark:text-neutral-400">
            Tell us your challenge. We&apos;ll map the right combination of
            services.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            Start a Conversation &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
