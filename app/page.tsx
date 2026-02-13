import Link from "next/link";
import { dbConnect } from "../lib/db";
import { CaseStudy } from "../models/CaseStudy";
import { serialize, STATS } from "../lib/utils";
import type { CaseStudyDoc } from "../lib/utils";
import ScrollTypeHero from "../components/motion/ScrollTypeHero";
import Reveal from "../components/motion/Reveal";
import Container from "../components/layout/Container";
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
    title: "Listen",
    desc: "We start with the challenge, not the deliverable. Deep immersion into your market, audience, and ambition.",
  },
  {
    step: "02",
    title: "Build",
    desc: "Strategy meets craft. We design solutions from first principles — no templates, no shortcuts.",
  },
  {
    step: "03",
    title: "Prove",
    desc: "Every engagement becomes a workstory. Documented outcomes that speak for themselves.",
  },
];

export default async function Home() {
  const featured = await getFeaturedStudies();

  return (
    <main>
      {/* ── Hero ── */}
      <ScrollTypeHero />

      {/* ── Stats ── */}
      <section className="border-y border-border">
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

      {/* ── Featured Work ── */}
      {featured.length > 0 && (
        <section className="py-24 sm:py-32 lg:py-40">
          <Container>
            <Reveal>
              <div className="flex items-end justify-between gap-8">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
                    Selected Work
                  </p>
                  <h2 className="mt-4 text-[clamp(1.75rem,4vw,3.25rem)] font-bold tracking-[-0.03em]">
                    Featured Workstories
                  </h2>
                </div>
                <Link
                  href="/work"
                  className="hidden shrink-0 text-[13px] font-medium text-muted transition-colors duration-300 hover:text-surface-dark sm:block"
                >
                  View all&nbsp;&rarr;
                </Link>
              </div>
            </Reveal>

            {/* 2-col editorial grid */}
            <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-20">
              {featured.map((cs, i) => (
                <Reveal key={cs.slug} delay={i * 0.1}>
                  <CaseStudyCard cs={cs} />
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10 text-center sm:hidden">
              <Link
                href="/work"
                className="text-[13px] font-medium text-muted transition-colors hover:text-surface-dark"
              >
                View all workstories&nbsp;&rarr;
              </Link>
            </Reveal>
          </Container>
        </section>
      )}

      {/* ── How We Work ── */}
      <section className="border-y border-border py-24 sm:py-32 lg:py-40">
        <Container>
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
              Process
            </p>
            <h2 className="mt-4 text-[clamp(1.75rem,4vw,3.25rem)] font-bold tracking-[-0.03em]">
              How We Work
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-3 lg:gap-10">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.12}>
                <div>
                  <span className="text-[12px] font-semibold tracking-[0.1em] text-gold">
                    {p.step}
                  </span>
                  <h3 className="mt-4 text-[24px] font-bold tracking-[-0.02em]">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.75] text-muted">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 sm:py-36 lg:py-44">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-[clamp(1.75rem,4.5vw,3.5rem)] font-bold tracking-[-0.03em]">
              Ready to defy convention?
            </h2>
            <p className="mx-auto mt-6 text-[15px] leading-[1.75] text-muted">
              Tell us your challenge. We&apos;ll show you the workstory.
            </p>
            <div className="mt-12">
              <Link
                href="/contact"
                className="inline-flex h-[50px] items-center gap-2 rounded-full bg-surface-dark px-9 text-[13px] font-medium text-white transition-all duration-300 hover:bg-surface-dark/85"
              >
                Start a Conversation
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
