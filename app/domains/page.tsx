import Link from "next/link";
import { dbConnect } from "../../lib/db";
import { CaseStudy } from "../../models/CaseStudy";
import { serialize, SERVICES } from "../../lib/utils";
import type { CaseStudyDoc } from "../../lib/utils";
import Reveal from "../../components/motion/Reveal";
import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";

export const metadata = {
  title: "Domains",
  description:
    "Six domains of expertise — Brand, Innovation, PR, Social, Art & Design, AI & Tech.",
};

async function getCaseStudiesByDomain(): Promise<
  Record<string, CaseStudyDoc[]>
> {
  try {
    await dbConnect();
    const docs = await CaseStudy.find()
      .sort({ featured: -1, order: 1, year: -1 })
      .lean();
    const all: CaseStudyDoc[] = serialize(docs);

    const grouped: Record<string, CaseStudyDoc[]> = {};
    for (const svc of SERVICES) {
      grouped[svc.title] = all
        .filter((cs) => (cs.domains || []).includes(svc.title))
        .slice(0, 3);
    }
    return grouped;
  } catch {
    const empty: Record<string, CaseStudyDoc[]> = {};
    for (const svc of SERVICES) empty[svc.title] = [];
    return empty;
  }
}

export default async function DomainsPage() {
  const grouped = await getCaseStudiesByDomain();

  return (
    <>
      <Section spacing="lg">
        <Container>
          <Reveal>
            <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              Domains
            </p>
            <h1 className="max-w-3xl font-display text-[clamp(2.5rem,7vw,5rem)] leading-[1.02] tracking-[-0.04em]">
              Six disciplines.
              <br />
              One humane intent.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-lg text-[15px] leading-[1.85] text-muted sm:text-[16px]">
              Each domain represents a core capability — connected by a shared
              belief that technology and creativity should serve people first.
            </p>
          </Reveal>
        </Container>
      </Section>

      {SERVICES.map((svc, i) => {
        const anchor = svc.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/&/g, "and");
        const stories = grouped[svc.title] || [];

        return (
          <Section
            key={svc.title}
            spacing="lg"
            id={anchor}
            alt={i % 2 === 1}
            className={
              i % 2 === 1
                ? "mx-4 rounded-[1.5rem] sm:mx-6 sm:rounded-[2rem] lg:mx-10"
                : ""
            }
          >
            <Container>
              <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
                {/* Left — domain info */}
                <Reveal>
                  <div>
                    <span className="text-[13px] font-bold tabular-nums text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-5 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-[-0.025em]">
                      {svc.title}
                    </h2>
                    <p className="mt-5 text-[15px] leading-[1.85] text-muted sm:text-[16px]">
                      {svc.desc}
                    </p>
                    <Link
                      href={`/work?domain=${encodeURIComponent(svc.title)}`}
                      className="link-underline mt-8 inline-block text-[13px] font-medium text-muted transition-colors duration-500 hover:text-ink"
                    >
                      View workstories &rarr;
                    </Link>
                  </div>
                </Reveal>

                {/* Right — related workstories */}
                <Reveal delay={0.1}>
                  <div>
                    {stories.length > 0 ? (
                      <div className="space-y-0">
                        <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-light">
                          Related Workstories
                        </p>
                        {stories.map((cs, si) => (
                          <Link
                            key={cs.slug}
                            href={`/work/${cs.slug}`}
                            className="group flex items-baseline justify-between gap-4 border-b border-border py-5 transition-colors duration-500 hover:text-accent"
                          >
                            <div className="flex items-baseline gap-4">
                              <span className="text-[11px] tabular-nums text-muted-light">
                                {String(si + 1).padStart(2, "0")}
                              </span>
                              <span className="text-[15px] font-medium tracking-[-0.01em]">
                                {cs.title}
                              </span>
                            </div>
                            {cs.year && (
                              <span className="shrink-0 text-[11px] tabular-nums text-muted-light">
                                {cs.year}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center rounded-[0.5rem] bg-paper-dim py-20">
                        <p className="text-[14px] text-muted-light">
                          Workstories coming soon
                        </p>
                      </div>
                    )}
                  </div>
                </Reveal>
              </div>
            </Container>
          </Section>
        );
      })}

      {/* CTA */}
      <Section spacing="xl" dark>
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-xl font-display text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em] text-paper">
              Have a challenge across any domain?
            </h2>
            <div className="mt-14">
              <Link
                href="/contact"
                className="btn-slide inline-flex h-[52px] items-center rounded-full bg-paper px-10 text-[14px] font-medium text-ink transition-all duration-500 hover:bg-paper-warm"
              >
                <span className="btn-text">Start a conversation &rarr;</span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
