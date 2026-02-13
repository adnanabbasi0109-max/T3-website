import { dbConnect } from "../../lib/db";
import { CaseStudy } from "../../models/CaseStudy";
import { serialize } from "../../lib/utils";
import type { CaseStudyDoc } from "../../lib/utils";
import WorkClient from "./work-client";

export const metadata = {
  title: "Workstories",
  description: "Proof-led case studies. Filter by domain, industry, and location.",
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
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Portfolio
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Workstories
        </h1>
        <p className="mt-3 max-w-lg text-neutral-500 dark:text-neutral-400">
          Every project is a story — from brief to outcome. Filter, search, and
          explore.
        </p>
      </div>

      <WorkClient initialItems={items} />
    </main>
  );
}
