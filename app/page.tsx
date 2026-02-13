import Link from "next/link";
import { dbConnect } from "../lib/db";
import { CaseStudy } from "../models/CaseStudy";

type CaseStudyItem = {
  _id: string;
  slug: string;
  title: string;
  client?: string;
  year?: number;
  domains?: string[];
  industries?: string[];
  heroImage?: string;
  featured?: boolean;
};

async function getFeaturedStudies(): Promise<CaseStudyItem[]> {
  try {
    await dbConnect();
    const docs = await CaseStudy.find({ featured: true })
      .sort({ order: 1, year: -1 })
      .limit(6)
      .lean();
    return JSON.parse(JSON.stringify(docs));
  } catch {
    return [];
  }
}

export default async function Home() {
  const featured = await getFeaturedStudies();

  return (
    <>
      {/* ── Nav ── */}
      <nav className="fixed top-0 z-50 w-full border-b border-neutral-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            T3
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/work" className="text-neutral-600 transition hover:text-black">
              Work
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* ── Hero ── */}
        <section className="flex min-h-[85vh] items-center border-b border-neutral-100 pt-14">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gold">
              Strategy &middot; Craft &middot; Outcome
            </p>
            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              We build brands that
              <span className="text-gold"> command attention.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-neutral-500">
              Proof-led creative strategy for companies that refuse to blend in.
              Every engagement is a workstory — documented from brief to outcome.
            </p>
            <div className="mt-10 flex gap-4">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                View Workstories
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Featured Work ── */}
        {featured.length > 0 && (
          <section className="border-b border-neutral-100 py-24">
            <div className="mx-auto max-w-6xl px-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-widest text-gold">
                    Selected Work
                  </p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                    Featured Workstories
                  </h2>
                </div>
                <Link
                  href="/work"
                  className="hidden text-sm text-neutral-500 transition hover:text-black sm:block"
                >
                  View all &rarr;
                </Link>
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((cs) => (
                  <Link
                    key={cs.slug}
                    href={`/work/${cs.slug}`}
                    className="group relative overflow-hidden rounded-2xl border border-neutral-100 bg-white transition hover:border-neutral-200 hover:shadow-sm"
                  >
                    {cs.heroImage ? (
                      <div className="aspect-[16/10] overflow-hidden bg-neutral-50">
                        <img
                          src={cs.heroImage}
                          alt={cs.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[16/10] items-center justify-center bg-neutral-50">
                        <span className="text-4xl font-bold text-neutral-200">
                          {cs.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-center justify-between text-xs text-neutral-400">
                        <span>{cs.client || "Client"}</span>
                        <span>{cs.year || ""}</span>
                      </div>
                      <h3 className="mt-2 text-base font-semibold tracking-tight group-hover:text-gold">
                        {cs.title}
                      </h3>
                      {cs.domains && cs.domains.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {cs.domains.slice(0, 3).map((d) => (
                            <span
                              key={d}
                              className="rounded-full bg-neutral-50 px-2.5 py-0.5 text-[11px] text-neutral-500"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 text-center sm:hidden">
                <Link
                  href="/work"
                  className="text-sm text-neutral-500 transition hover:text-black"
                >
                  View all workstories &rarr;
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── How We Work ── */}
        <section className="border-b border-neutral-100 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-sm font-medium uppercase tracking-widest text-gold">
              Process
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              How We Work
            </h2>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Discover",
                  desc: "We immerse in your world — market, audience, and ambition — to uncover the strategic edge.",
                },
                {
                  step: "02",
                  title: "Craft",
                  desc: "Strategy becomes tangible. Brand systems, campaigns, and experiences — built with precision.",
                },
                {
                  step: "03",
                  title: "Prove",
                  desc: "Every engagement ends with documented outcomes. No vanity metrics — real business impact.",
                },
              ].map((item) => (
                <div key={item.step} className="group">
                  <span className="text-sm font-medium text-gold">
                    {item.step}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-neutral-950 py-16 text-neutral-400">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div>
              <span className="text-lg font-semibold text-white">T3</span>
              <p className="mt-1 text-sm">
                Strategy, Craft, Outcome.
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/work" className="transition hover:text-white">
                Work
              </Link>
            </div>
          </div>
          <div className="mt-12 border-t border-neutral-800 pt-6 text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} T3. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
