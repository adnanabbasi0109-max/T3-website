import Link from "next/link";
import { dbConnect } from "../lib/db";
import { CaseStudy } from "../models/CaseStudy";
import { serialize, STATS } from "../lib/utils";
import type { CaseStudyDoc } from "../lib/utils";
import ScrollTypeHero from "../components/motion/ScrollTypeHero";
import Reveal from "../components/motion/Reveal";
import SlideIn from "../components/motion/SlideIn";
import CountUp from "../components/motion/CountUp";
import Marquee from "../components/motion/Marquee";
import Container from "../components/layout/Container";
import CaseStudyCard from "../components/ui/case-study-card";
import ParallaxImage from "../components/motion/ParallaxImage";

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
    desc: "Every engagement becomes a workstory. Documented outcomes for leaders navigating high-stakes inflection points.",
  },
];

export default async function Home() {
  const featured = await getFeaturedStudies();

  return (
    <main>
      {/* ── Hero ── */}
      <ScrollTypeHero />

      {/* ── Marquee Band ── */}
      <div className="dark-section py-5">
        <Marquee
          text="Strategy · Craft · Outcome · Defy Convention · T3 Technologies"
          className="text-[clamp(0.85rem,1.5vw,1.25rem)] font-medium uppercase tracking-[0.15em] text-paper/20"
          speed={45}
        />
      </div>

      {/* ── Stats — Asymmetric ── */}
      <section className="dark-section py-24 sm:py-32 lg:py-40">
        <Container>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} stiffness="snappy">
                <div className={i === 1 ? "lg:col-span-1" : ""}>
                  <p
                    className={`font-display tracking-[-0.02em] text-gold ${
                      i === 1
                        ? "text-[clamp(3rem,8vw,6rem)]"
                        : "text-[clamp(2rem,5vw,3.5rem)]"
                    }`}
                  >
                    <CountUp value={s.value} />
                  </p>
                  <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.15em] text-paper/40">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Featured Work — Mixed Grid ── */}
      {featured.length > 0 && (
        <section className="py-24 sm:py-32 lg:py-40">
          <Container>
            <Reveal>
              <div className="flex items-end justify-between gap-8">
                <div>
                  <h2 className="font-display text-[clamp(1.75rem,4vw,3.25rem)] tracking-[-0.02em]">
                    Featured Workstories
                  </h2>
                </div>
                <Link
                  href="/work"
                  className="hidden shrink-0 text-[13px] font-medium text-muted transition-colors duration-300 hover:text-ink sm:block"
                >
                  View all&nbsp;&rarr;
                </Link>
              </div>
            </Reveal>

            {/* Mixed layout: first card full-width, then 2-col */}
            <div className="mt-14 lg:mt-20">
              {/* First featured — Full width hero card */}
              {featured[0] && (
                <Reveal>
                  <Link
                    href={`/work/${featured[0].slug}`}
                    className="group relative block overflow-hidden rounded-lg"
                  >
                    {featured[0].heroImage ? (
                      <ParallaxImage
                        src={featured[0].heroImage}
                        alt={featured[0].title}
                        aspect="aspect-[21/9]"
                        grayscale
                      />
                    ) : (
                      <div className="flex aspect-[21/9] items-center justify-center bg-paper-warm">
                        <span className="font-display text-[8rem] text-border/40">
                          {featured[0].title.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 lg:p-12">
                      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-paper/60">
                        {featured[0].client || "Client"}
                        {featured[0].year && ` · ${featured[0].year}`}
                      </p>
                      <h3 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.5rem)] tracking-[-0.02em] text-paper transition-transform duration-500 group-hover:-translate-y-1">
                        {featured[0].title}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              )}

              {/* Remaining featured — 2 or 3 col grid */}
              {featured.length > 1 && (
                <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {featured.slice(1).map((cs, i) => (
                    <Reveal key={cs.slug} delay={i * 0.1} scale>
                      <CaseStudyCard cs={cs} size="large" />
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
                View all workstories&nbsp;&rarr;
              </Link>
            </Reveal>
          </Container>
        </section>
      )}

      {/* ── How We Work — Staggered ── */}
      <section className="border-y border-border py-24 sm:py-32 lg:py-40">
        <Container>
          <Reveal>
            <h2 className="font-display text-[clamp(1.75rem,4vw,3.25rem)] tracking-[-0.02em]">
              How We Work
            </h2>
          </Reveal>

          <div className="mt-20 space-y-16 lg:mt-28 lg:space-y-24">
            {PROCESS.map((p, i) => (
              <SlideIn
                key={p.step}
                direction={i % 2 === 0 ? "left" : "right"}
                delay={i * 0.1}
              >
                <div className="grid items-start gap-6 lg:grid-cols-[120px_1fr]">
                  <span className="font-display text-[clamp(3rem,6vw,5rem)] leading-none text-border/30">
                    {p.step}
                  </span>
                  <div>
                    <h3 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold tracking-[-0.02em]">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-[1.75] text-muted">
                      {p.desc}
                    </p>
                  </div>
                </div>
                {i < PROCESS.length - 1 && (
                  <div className="mt-16 ml-0 h-px w-24 bg-gold/30 lg:ml-[120px] lg:mt-20" />
                )}
              </SlideIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA — Dark with watermark ── */}
      <section className="dark-section relative overflow-hidden py-28 sm:py-36 lg:py-44">
        {/* Decorative watermark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="select-none font-display text-[20vw] leading-none text-paper/[0.03]">
            T3
          </span>
        </div>
        <Container className="relative text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(1.75rem,4.5vw,3.5rem)] tracking-[-0.02em] text-paper">
              Ready to defy convention?
            </h2>
            <p className="mx-auto mt-6 text-[15px] leading-[1.75] text-paper/50">
              Tell us your challenge. We&apos;ll show you the workstory.
            </p>
            <div className="mt-12">
              <Link
                href="/contact"
                className="inline-flex h-[52px] items-center gap-2 bg-paper px-10 text-[13px] font-medium text-ink transition-all duration-300 hover:bg-paper/90"
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
