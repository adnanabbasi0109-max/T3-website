import Link from "next/link";
import { STATS } from "../../lib/utils";
import Reveal from "../../components/motion/Reveal";
import Container from "../../components/layout/Container";

export const metadata = {
  title: "About",
  description: "T3 Technologies — Defying conventional wisdom since 2004.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-20 sm:pt-28 lg:pt-36">
        <Container>
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
              Who We Are
            </p>
            <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold tracking-[-0.03em]">
              We defy conventional wisdom — and document the proof.
            </h1>
            <p className="mt-7 max-w-xl text-[15px] leading-[1.75] text-muted">
              For more than two decades, T3 Technologies has been a leader in
              creative innovation, assisting premium brands, organizations, and
              individuals in achieving success. As a boutique creative agency, we
              excel in precision — providing tailored solutions as distinctive as
              the clients we partner with.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Stats */}
      <section className="mt-20 border-y border-border sm:mt-28">
        <Container className="grid grid-cols-2 gap-10 py-16 sm:grid-cols-4 sm:py-20">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div>
                <p className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-[-0.03em] text-gold">
                  {s.value}
                </p>
                <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.15em] text-muted">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Philosophy + Doctrine */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-20 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
                  Philosophy
                </p>
                <h2 className="mt-4 text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em]">
                  Humane Technology
                </h2>
                <p className="mt-6 text-[15px] leading-[1.8] text-muted">
                  We believe in a harmonious blend of tradition and innovation.
                  Our philosophy centers on using technology not to take over,
                  but to enhance the human experience.
                </p>
                <p className="mt-4 text-[15px] leading-[1.8] text-muted">
                  We create solutions that respect the past while embracing the
                  future, putting technology to work for the betterment of
                  humanity — ensuring progress is both thoughtful and purposeful.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
                  Doctrine
                </p>
                <h2 className="mt-4 text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em]">
                  Defy Convention
                </h2>
                <p className="mt-6 text-[15px] leading-[1.8] text-muted">
                  For the moments when the playbook is obsolete and the future is
                  unwritten. Our engagement is a structured intervention designed
                  to move you from a competitive mindset to a category of one.
                </p>
                <p className="mt-4 text-[15px] leading-[1.8] text-muted">
                  This is not a consultancy. It is a catalyst process —
                  methodology forged at the intersection of data, creativity, and
                  human behavior.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Presence */}
      <section className="border-t border-border py-24 sm:py-32">
        <Container>
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
              Where We Work
            </p>
            <h2 className="mt-4 text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-[-0.03em]">
              Our Presence
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-3 lg:mt-20">
            {["Delhi NCR", "Jaipur", "Bhopal"].map((city, i) => (
              <Reveal key={city} delay={i * 0.08}>
                <div className="border-t border-border pt-7">
                  <h3 className="text-[20px] font-bold tracking-[-0.02em]">
                    {city}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.75] text-muted">
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
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-surface-dark py-24 text-white sm:py-32">
        <Container className="text-center">
          <Reveal>
            <h2 className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-bold tracking-[-0.03em]">
              Let&apos;s build something worth documenting.
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/work"
                className="rounded-full border border-neutral-700/60 px-7 py-3 text-[13px] font-medium transition-all duration-300 hover:border-neutral-500"
              >
                See Our Work
              </Link>
              <Link
                href="/contact"
                className="rounded-full bg-gold px-7 py-3 text-[13px] font-medium text-white transition-all duration-300 hover:bg-gold-dark"
              >
                Start a Conversation
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
