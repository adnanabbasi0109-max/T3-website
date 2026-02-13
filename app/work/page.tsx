import { dbConnect } from "../../lib/db";
import { CaseStudy } from "../../models/CaseStudy";
import { serialize } from "../../lib/utils";
import type { CaseStudyDoc } from "../../lib/utils";
import WorkClient from "./work-client";
import Reveal from "../../components/motion/Reveal";
import Container from "../../components/layout/Container";

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
    <main className="pb-28 sm:pb-36">
      <Container className="pt-20 sm:pt-28 lg:pt-36">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            Portfolio
          </p>
          <h1 className="mt-5 text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold tracking-[-0.03em]">
            Workstories
          </h1>
          <p className="mt-5 max-w-lg text-[15px] leading-[1.75] text-muted">
            Every project is a story — from brief to outcome.
          </p>
        </Reveal>
      </Container>

      <WorkClient initialItems={items} />
    </main>
  );
}
