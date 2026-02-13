import Link from "next/link";
import { STATS } from "../../lib/utils";

export const metadata = {
  title: "About",
  description: "T3 Technologies — Defying conventional wisdom since 2004.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Who We Are
          </p>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            We defy conventional wisdom — and document the proof.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
            T3 Technologies was founded on a simple conviction: the most
            powerful solutions emerge when you strip complexity down to its
            essential truth. For over two decades, we&apos;ve turned that
            conviction into outcomes for brands across India.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-neutral-100 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-16 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-gold sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Our Philosophy
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Humane Technology
              </h2>
              <p className="mt-4 leading-relaxed text-neutral-500 dark:text-neutral-400">
                We believe technology is most powerful when it serves human
                goals — not when it replaces human judgement. Our approach
                balances tradition with innovation: the wisdom of time-tested
                strategy with the precision of modern tools.
              </p>
              <p className="mt-4 leading-relaxed text-neutral-500 dark:text-neutral-400">
                Every solution we build is measured by its impact on people
                first. Metrics follow meaning, not the other way around.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Our Doctrine
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Defy Convention
              </h2>
              <p className="mt-4 leading-relaxed text-neutral-500 dark:text-neutral-400">
                Conventional wisdom is comfortable. It&apos;s also where
                mediocrity lives. We question assumptions, challenge accepted
                truths, and build solutions from first principles.
              </p>
              <p className="mt-4 leading-relaxed text-neutral-500 dark:text-neutral-400">
                This isn&apos;t contrarianism for its own sake. It&apos;s a
                disciplined approach to finding the insight everyone else
                missed — then proving it with documented outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Presence */}
      <section className="border-t border-neutral-100 py-24 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Where We Work
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Our Presence
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {["Delhi NCR", "Jaipur", "Bhopal"].map((city) => (
              <div
                key={city}
                className="rounded-2xl border border-neutral-100 p-8 dark:border-neutral-800"
              >
                <h3 className="text-xl font-semibold">{city}</h3>
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                  Strategy, execution, and client engagement from{" "}
                  {city === "Delhi NCR" ? "the national capital region" : city}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-950 py-24 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Let&apos;s build something worth documenting.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/work"
              className="rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium transition hover:bg-neutral-900"
            >
              See Our Work
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-white transition hover:bg-gold-dark"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
