import Link from "next/link";
import { dbConnect } from "../lib/db";
import { CaseStudy } from "../models/CaseStudy";
import { serialize, SERVICES, STATS } from "../lib/utils";
import type { CaseStudyDoc } from "../lib/utils";
import CaseStudyCard from "../components/ui/case-study-card";
import ChallengeRecommender from "../components/sections/challenge-recommender";

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

export default async function Home() {
  const featured = await getFeaturedStudies();
  const allFeatured = await getAllFeatured();

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-32">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Defy Conventional Wisdom
          </p>
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
            We deconstruct complexity into{" "}
            <span className="text-gold">powerful simplicity.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
            T3 Technologies builds brands, shapes narratives, and engineers
            outcomes for companies that refuse to blend in. Every engagement is
            a workstory — documented from brief to result.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              View Workstories
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-7 py-3.5 text-sm font-medium transition hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-neutral-100 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-16 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-gold sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Workstories ── */}
      {featured.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                  Selected Work
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Featured Workstories
                </h2>
              </div>
              <Link
                href="/work"
                className="hidden text-sm text-neutral-500 transition hover:text-gold sm:block"
              >
                View all &rarr;
              </Link>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((cs) => (
                <CaseStudyCard key={cs.slug} cs={cs} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/work"
                className="text-sm text-neutral-500 transition hover:text-gold"
              >
                View all workstories &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Pick Your Challenge ── */}
      <section className="border-y border-neutral-100 bg-neutral-50/30 py-24 dark:border-neutral-800 dark:bg-neutral-900/30">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Start Here
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Pick Your Challenge
          </h2>
          <p className="mt-3 max-w-lg text-neutral-500 dark:text-neutral-400">
            Select a challenge category and see how we&apos;ve solved it before.
          </p>

          <div className="mt-10">
            <ChallengeRecommender allItems={allFeatured} />
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Capabilities
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            What We Do
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((svc) => (
              <div
                key={svc.title}
                className="group rounded-2xl border border-neutral-100 bg-white p-8 transition hover:border-neutral-200 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <ServiceIcon name={svc.icon} />
                </div>
                <h3 className="text-lg font-semibold">{svc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="text-sm text-neutral-500 transition hover:text-gold"
            >
              Explore all services &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Humane Technology ── */}
      <section className="bg-neutral-950 py-24 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Our Philosophy
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Humane Technology
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-neutral-400">
              We believe the best solutions sit at the intersection of tradition
              and innovation. Technology should serve human goals — not replace
              human judgement. Every tool we deploy, every strategy we design, is
              measured by its impact on people, not just metrics.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/about"
                className="rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium transition hover:bg-neutral-900"
              >
                Our Story
              </Link>
              <Link
                href="/contact"
                className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-white transition hover:bg-gold-dark"
              >
                Work With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to defy convention?
          </h2>
          <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
            Tell us your challenge. We&apos;ll show you the workstory.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              Start a Conversation
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ServiceIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    layers: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 9.75 5.25L21.75 12M2.25 7.5 12 2.25l9.75 5.25L12 12.75 2.25 7.5Zm0 9.75L12 22.5l9.75-5.25" />
      </svg>
    ),
    lightbulb: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    megaphone: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 0 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535m-8.835-11.715a23.847 23.847 0 0 0 8.835-2.535" />
      </svg>
    ),
    share2: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
      </svg>
    ),
    palette: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072" />
      </svg>
    ),
    cpu: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
      </svg>
    ),
  };
  return <>{icons[name] || null}</>;
}
