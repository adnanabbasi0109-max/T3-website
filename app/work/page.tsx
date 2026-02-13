import { dbConnect } from "../../lib/db";
import { CaseStudy } from "../../models/CaseStudy";
import { serialize } from "../../lib/utils";
import type { CaseStudyDoc } from "../../lib/utils";
import WorkClient from "./work-client";
import Reveal from "../../components/ui/reveal";

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
    <main>
      <div className="mx-auto max-w-7xl px-6 pb-6 pt-20 lg:px-10">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
            Portfolio
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Workstories
          </h1>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
            Every project is a story — from brief to outcome. Filter, search,
            and explore.
          </p>
        </Reveal>
      </div>

      <WorkClient initialItems={items} />
    </main>
  );
}
