import Link from "next/link";
import { dbConnect } from "../lib/db";
import { CaseStudy } from "../models/CaseStudy";
import { serialize, STATS } from "../lib/utils";
import type { CaseStudyDoc } from "../lib/utils";
import ScrollTypeHero from "../components/motion/ScrollTypeHero";
import Reveal from "../components/motion/Reveal";
import CountUp from "../components/motion/CountUp";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import CaseStudyCard from "../components/ui/case-study-card";

async function getFeaturedStudies(): Promise<CaseStudyDoc[]> {
  try {
    await dbConnect();
    const docs = await CaseStudy.find({ featured: true })
      .sort({ order: 1, year: -1 })
      .limit(4)
      .lean();
    return serialize(docs);
  } catch {
    return [];
  }
}

const PROCESS = [
  {
    step: "01",
    title: "Deconstruct",
    desc: "We start with the challenge, not the deliverable. A structured intervention at the intersection of data, creativity, and human behavior.",
  },
  {
    step: "02",
    title: "Build",
    desc: "Methodology forged from first principles. Tailored solutions designed to move you from a competitive mindset to a category of one.",
  },
  {
    step: "03",
    title: "Prove",
    desc: "Every engagement becomes a workstory — documented outcomes for leaders navigating high-stakes inflection points.",
  },
];

export default async function Home() {
  const featured = await getFeaturedStudies();

  return (
    <>
      {/* ── Hero ── */}
      <ScrollTypeHero />

      {/* ── Stats ── */}
      <Section spacing="lg" className="border-t border-border">
        <Container>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div>
                  <p className="font-display text-[clamp(2rem,4vw,3.25rem)] tracking-[-0.02em] text-ink">
                    <CountUp value={s.value} />
                  </p>
                  <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.12em] text-muted">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Featured Work ── */}
      {featured.length > 0 && (
        <Section spacing="lg">
          <Container>
            <Reveal>
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                    Selected Work
                  </p>
                  <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] tracking-[-0.02em]">
                    Featured Workstories
                  </h2>
                </div>
                <Link
                  href="/work"
                  className="hidden shrink-0 text-[13px] font-medium text-muted transition-colors duration-300 hover:text-ink sm:block"
                >
                  View all &rarr;
                </Link>
              </div>
            </Reveal>

            <div className="mt-12 sm:mt-16">
              {/* First featured — editorial wide card */}
              {featured[0] && (
                <Reveal>
                  <Link
                    href={`/work/${featured[0].slug}`}
                    className="group block"
                  >
                    <div className="overflow-hidden rounded-sm bg-paper-warm">
                      {featured[0].heroImage ? (
                        <img
                          src={featured[0].heroImage}
                          alt={featured[0].title}
                          className="aspect-[2.2/1] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex aspect-[2.2/1] items-center justify-center">
                          <span className="font-display text-[6rem] text-border/30">
                            {featured[0].title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="mt-5">
                      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                        {featured[0].client || "Client"}
                        {featured[0].year && ` · ${featured[0].year}`}
                      </p>
                      <h3 className="mt-2 font-display text-[clamp(1.25rem,2.5vw,2rem)] tracking-[-0.02em] transition-colors duration-300 group-hover:text-gold">
                        {featured[0].title}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              )}

              {/* Remaining featured — clean grid */}
              {featured.length > 1 && (
                <div className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
                  {featured.slice(1).map((cs, i) => (
                    <Reveal key={cs.slug} delay={i * 0.08}>
                      <CaseStudyCard cs={cs} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>

            <Reveal className="mt-10 text-center sm:hidden">
              <Link
                href="/work"
                className="text-[13px] font-medium text-muted transition-colors hover:text-ink"
              >
                View all workstories &rarr;
              </Link>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* ── How We Work ── */}
      <Section spacing="lg" className="border-t border-border">
        <Container>
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Process
            </p>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] tracking-[-0.02em]">
              How We Work
            </h2>
          </Reveal>

          <div className="mt-12 sm:mt-16">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08}>
                <div
                  className={`grid items-start gap-4 py-10 sm:gap-8 sm:py-12 lg:grid-cols-[80px_200px_1fr] ${
                    i < PROCESS.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="text-[12px] font-semibold text-muted-light">
                    {p.step}
                  </span>
                  <h3 className="text-[18px] font-semibold tracking-[-0.01em] sm:text-[20px]">
                    {p.title}
                  </h3>
                  <p className="text-[14px] leading-[1.75] text-muted sm:text-[15px]">
                    {p.desc}
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
            <h2 className="mx-auto max-w-xl font-display text-[clamp(1.75rem,4vw,3rem)] tracking-[-0.02em] text-paper">
              Ready to defy convention?
            </h2>
            <p className="mx-auto mt-5 max-w-sm text-[15px] leading-[1.75] text-paper/50">
              Tell us your challenge. We&apos;ll show you the workstory.
            </p>
            <div className="mt-10">
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
