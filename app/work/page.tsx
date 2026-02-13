import { dbConnect } from "../../lib/db";
import { CaseStudy } from "../../models/CaseStudy";
import { serialize } from "../../lib/utils";
import type { CaseStudyDoc } from "../../lib/utils";
import WorkClient from "./work-client";
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
    <main className="pb-32 sm:pb-40">
      {/* ── Dark hero ── */}
      <section className="dark-section flex min-h-[55vh] items-end pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <h1 className="font-display text-[clamp(3rem,10vw,8rem)] leading-[1] tracking-[-0.02em] text-paper">
            Workstories
          </h1>
          <p className="mt-6 max-w-lg text-[15px] leading-[1.85] text-paper/50">
            Every project is a story — from brief to outcome.
          </p>
        </Container>
      </section>

      <WorkClient initialItems={items} />
    </main>
  );
}
