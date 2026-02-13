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
  { step: "01", title: "Listen", desc: "We start with the challenge, not the deliverable. Deep immersion into your market, audience, and ambition." },
  { step: "02", title: "Build", desc: "Strategy meets craft. We design solutions from first principles — no templates, no shortcuts." },
  { step: "03", title: "Prove", desc: "Every engagement becomes a workstory. Documented outcomes that speak for themselves." },
];

export default async function Home() {
  const featured = await getFeaturedStudies();

  return (
    <main>
      {/* ── Hero ── */}
      <ScrollTypeHero />

      {/* ── Stats — single horizontal line ── */}
      <section className="border-y border-border">
        <Container className="grid grid-cols-2 gap-12 py-20 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div>
                <p className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-gold">
                  {s.value}
                </p>
                <p className="mt-1 text-[12px] uppercase tracking-[0.15em] text-neutral-400">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* ── Featured Work — editorial grid ── */}
      {featured.length > 0 && (
        <section className="py-32 lg:py-40">
          <Container>
            <Reveal>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
                    Selected Work
                  </p>
                  <h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight">
                    Featured Workstories
                  </h2>
                </div>
                <Link
                  href="/work"
                  className="hidden text-[13px] text-muted transition hover:text-surface-dark sm:block"
                >
                  View all &rarr;
                </Link>
              </div>
            </Reveal>

            {/* Asymmetric grid: 2 large top, 2 medium bottom */}
            <div className="mt-16 grid gap-10 sm:grid-cols-2">
              {featured.map((cs, i) => (
                <Reveal key={cs.slug} delay={i * 0.1}>
                  <CaseStudyCard cs={cs} />
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 text-center sm:hidden">
              <Link
                href="/work"
                className="text-[13px] text-muted transition hover:text-surface-dark"
              >
                View all workstories &rarr;
              </Link>
            </Reveal>
          </Container>
        </section>
      )}

      {/* ── How We Work ── */}
      <section className="border-y border-border py-32 lg:py-40">
        <Container>
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
              Process
            </p>
            <h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight">
              How We Work
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-16 lg:grid-cols-3 lg:gap-12">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.12}>
                <div>
                  <span className="text-[11px] font-medium text-gold">{p.step}</span>
                  <h3 className="mt-3 text-[22px] font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.75] text-muted">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 lg:py-44">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-[clamp(1.75rem,4vw,3.25rem)] font-bold tracking-tight">
              Ready to defy convention?
            </h2>
            <p className="mx-auto mt-5 text-[15px] text-muted">
              Tell us your challenge. We&apos;ll show you the workstory.
            </p>
            <div className="mt-12">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-surface-dark px-8 text-[13px] font-medium text-white transition-all hover:opacity-90"
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
