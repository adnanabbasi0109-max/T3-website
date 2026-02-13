import { dbConnect } from "../../lib/db";
import { CaseStudy } from "../../models/CaseStudy";
import { serialize } from "../../lib/utils";
import type { CaseStudyDoc } from "../../lib/utils";
import WorkClient from "./work-client";
import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";

export const metadata = {
  title: "Workstories",
  description:
    "Proof-led case studies. Filter by domain, industry, and location.",
};

async function getAllCaseStudies(): Promise<CaseStudyDoc[]> {
  await dbConnect();
  const docs = await CaseStudy.find()
    .sort({ featured: -1, order: 1, year: -1 })
    .lean();
  return serialize(docs);
}

export default async function WorkPage() {
  const items = await getAllCaseStudies();

  return (
    <>
      {/* ── Header ── */}
      <Section spacing="md">
        <Container>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            Portfolio
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.03em]">
            Workstories
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-[1.75] text-muted">
            Every project is a story — from brief to outcome.
            Filter by domain, industry, or search.
          </p>
        </Container>
      </Section>

      <WorkClient initialItems={items} />

      {/* Bottom spacing */}
      <div className="pb-20 sm:pb-28" />
    </>
  );
}
