import Link from "next/link";
import { dbConnect } from "../lib/db";
import { CaseStudy } from "../models/CaseStudy";
import { serialize, SERVICES, STATS } from "../lib/utils";
import type { CaseStudyDoc } from "../lib/utils";
import CaseStudyCard from "../components/ui/case-study-card";
import ChallengeRecommender from "../components/sections/challenge-recommender";
import ScrollTypeHero from "../components/ui/scroll-type-hero";
import Reveal from "../components/ui/reveal";

async function getFeaturedStudies(): Promise<CaseStudyDoc[]> {
  try {
    await dbConnect();
    const docs = await CaseStudy.find({ featured: true })
      .sort({ order: 1, year: -1 })
      .limit(6)
      .lean();
    return serialize(docs);
  } catch {
    return [];
  }
}

async function getAllFeatured(): Promise<CaseStudyDoc[]> {
  try {
    await dbConnect();
    const docs = await CaseStudy.find({ featured: true })
      .sort({ order: 1, year: -1 })
      .lean();
    return serialize(docs);
  } catch {
    return [];
  }
}

const SERVICE_ICONS: Record<string, string> = {
  layers: "M3 12l9 5 9-5M3 7l9-5 9 5-9 5-9-5Zm0 10l9 5 9-5",
  lightbulb:
    "M12 18v-5m0 0a6 6 0 001.5-.2m-1.5.2a6 6 0 01-1.5-.2m3.75 7.5a12 12 0 01-4.5 0m3.75 2.4a14 14 0 01-3 0M14.25 18v-.2c0-1 .66-1.82 1.51-2.32a7.5 7.5 0 10-7.52 0c.85.5 1.51 1.33 1.51 2.32V18",
  megaphone:
    "M10.34 15.84c-.69-.06-1.39-.09-2.09-.09H7.5a4.5 4.5 0 010-9h.75c.7 0 1.4-.03 2.09-.09m0 9.18c.25.96.58 1.89.99 2.78.24.55.06 1.21-.47 1.51l-.65.38c-.55.32-1.26.12-1.53-.46a20.8 20.8 0 01-1.44-4.28m3.1.07a18 18 0 01-.59-4.59c0-1.59.2-3.12.59-4.59m0 9.18a23.8 23.8 0 018.84 2.54m-8.84-11.72a23.8 23.8 0 008.84-2.54",
  share2:
    "M7.22 10.91a2.25 2.25 0 100 2.18m0-2.18c.18.32.28.7.28 1.09s-.1.77-.28 1.09m0-2.18l9.56-5.31m-9.56 7.5l9.56 5.31m0 0a2.25 2.25 0 103.94 2.19 2.25 2.25 0 00-3.94-2.19Zm0-12.81a2.25 2.25 0 103.93-2.19 2.25 2.25 0 00-3.93 2.19Z",
  palette:
    "M4.1 19.9a3.75 3.75 0 005.3 0l6.4-6.4M6.75 21A3.75 3.75 0 013 17.25V4.13C3 3.5 3.5 3 4.13 3h5.25c.62 0 1.12.5 1.12 1.13v4.07M6.75 21a3.75 3.75 0 003.75-3.75V8.2M6.75 21h13.13c.62 0 1.12-.5 1.12-1.13v-5.25c0-.62-.5-1.12-1.12-1.12h-4.07",
  cpu: "M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25Zm.75-12h9v9h-9v-9Z",
};

export default async function Home() {
  const featured = await getFeaturedStudies();
  const allFeatured = await getAllFeatured();

  return (
    <main>
      {/* ── Scroll Type Hero ── */}
      <ScrollTypeHero />

      {/* ── Stats ── */}
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

      {/* ── Featured Workstories ── */}
      {featured.length > 0 && (
        <section className="py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                    Selected Work
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                    Featured Workstories
                  </h2>
                </div>
                <Link
                  href="/work"
                  className="hidden text-[13px] font-medium text-muted transition hover:text-gold sm:block"
                >
                  View all &rarr;
                </Link>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((cs, i) => (
                <Reveal key={cs.slug} delay={i * 0.08}>
                  <CaseStudyCard cs={cs} />
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="mt-10 text-center sm:hidden">
                <Link
                  href="/work"
                  className="text-[13px] font-medium text-muted transition hover:text-gold"
                >
                  View all workstories &rarr;
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Pick Your Challenge ── */}
      <section className="border-y border-border bg-surface py-28 dark:border-border-dark dark:bg-surface-dark">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
              Start Here
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Pick Your Challenge
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
              Select a challenge category and see how we&apos;ve solved it
              before.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10">
              <ChallengeRecommender allItems={allFeatured} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
              Capabilities
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              What We Do
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 0.08}>
                <div className="group rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:border-neutral-300 hover:shadow-lg hover:shadow-black/[0.03] dark:border-border-dark dark:bg-neutral-900 dark:hover:border-neutral-600">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-gold-muted text-gold">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={SERVICE_ICONS[svc.icon] || ""} />
                    </svg>
                  </div>
                  <h3 className="text-[17px] font-semibold tracking-tight">
                    {svc.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">
                    {svc.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 text-center">
              <Link
                href="/services"
                className="text-[13px] font-medium text-muted transition hover:text-gold"
              >
                Explore all services &rarr;
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Humane Technology ── */}
      <section className="bg-surface-dark py-28 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                Our Philosophy
              </p>
              <h2 className="mt-4 font-editorial text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Humane Technology
              </h2>
              <p className="mt-8 text-[16px] leading-relaxed text-neutral-400">
                We believe the best solutions sit at the intersection of
                tradition and innovation. Technology should serve human goals —
                not replace human judgement. Every tool we deploy, every strategy
                we design, is measured by its impact on people, not just metrics.
              </p>
              <div className="mt-12 flex flex-wrap justify-center gap-4">
                <Link
                  href="/about"
                  className="rounded-full border border-neutral-700 px-7 py-3 text-[13px] font-medium transition-all hover:border-neutral-500 hover:bg-neutral-900"
                >
                  Our Story
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full bg-gold px-7 py-3 text-[13px] font-medium text-white transition hover:bg-gold-dark"
                >
                  Work With Us
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
          <Reveal>
            <h2 className="font-editorial text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to defy convention?
            </h2>
            <p className="mt-5 text-[16px] text-muted">
              Tell us your challenge. We&apos;ll show you the workstory.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-surface-dark px-8 py-4 text-[13px] font-semibold text-white transition-all hover:shadow-lg hover:shadow-black/10 dark:bg-white dark:text-black"
              >
                Start a Conversation
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
