import Link from "next/link";
import { STATS } from "../../lib/utils";
import Reveal from "../../components/ui/reveal";

export const metadata = {
  title: "About",
  description: "T3 Technologies — Defying conventional wisdom since 2004.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
              Who We Are
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              We defy conventional wisdom — and document the proof.
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-muted">
              T3 Technologies was founded on a simple conviction: the most
              powerful solutions emerge when you strip complexity down to its
              essential truth. For over two decades, we&apos;ve turned that
              conviction into outcomes for brands across India.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border dark:border-border-dark">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-20 sm:grid-cols-4 lg:px-10">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="font-editorial text-4xl font-bold text-gold sm:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-20 lg:grid-cols-2">
            <Reveal>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                  Our Philosophy
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  Humane Technology
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-muted">
                  We believe technology is most powerful when it serves human
                  goals — not when it replaces human judgement. Our approach
                  balances tradition with innovation: the wisdom of time-tested
                  strategy with the precision of modern tools.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  Every solution we build is measured by its impact on people
                  first. Metrics follow meaning, not the other way around.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                  Our Doctrine
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  Defy Convention
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-muted">
                  Conventional wisdom is comfortable. It&apos;s also where
                  mediocrity lives. We question assumptions, challenge accepted
                  truths, and build solutions from first principles.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  This isn&apos;t contrarianism for its own sake. It&apos;s a
                  disciplined approach to finding the insight everyone else
                  missed — then proving it with documented outcomes.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Presence */}
      <section className="border-t border-border py-28 dark:border-border-dark">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
              Where We Work
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Our Presence
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {["Delhi NCR", "Jaipur", "Bhopal"].map((city, i) => (
              <Reveal key={city} delay={i * 0.1}>
                <div className="rounded-2xl border border-border p-8 transition-all duration-300 hover:border-neutral-300 hover:shadow-lg hover:shadow-black/[0.03] dark:border-border-dark dark:hover:border-neutral-600">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {city}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">
                    Strategy, execution, and client engagement from{" "}
                    {city === "Delhi NCR"
                      ? "the national capital region"
                      : city}
                    .
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-dark py-28 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
          <Reveal>
            <h2 className="font-editorial text-3xl font-bold tracking-tight sm:text-4xl">
              Let&apos;s build something worth documenting.
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/work"
                className="rounded-full border border-neutral-700 px-7 py-3 text-[13px] font-medium transition-all hover:border-neutral-500 hover:bg-neutral-900"
              >
                See Our Work
              </Link>
              <Link
                href="/contact"
                className="rounded-full bg-gold px-7 py-3 text-[13px] font-medium text-white transition hover:bg-gold-dark"
              >
                Start a Conversation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
