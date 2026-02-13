import Link from "next/link";
import { dbConnect } from "../../lib/db";
import { CaseStudy } from "../../models/CaseStudy";
import WorkClient from "./work-client";

export const metadata = {
  title: "Workstories — T3",
  description: "Proof-led case studies. Strategy, craft, outcome.",
};

type CaseStudyItem = {
  _id: string;
  slug: string;
  title: string;
  client?: string;
  year?: number;
  domains?: string[];
  industries?: string[];
  locations?: string[];
  heroImage?: string;
  featured?: boolean;
  order?: number;
};

async function getAllCaseStudies(): Promise<CaseStudyItem[]> {
  await dbConnect();
  const docs = await CaseStudy.find()
    .sort({ featured: -1, order: 1, year: -1 })
    .lean();
  return JSON.parse(JSON.stringify(docs));
}

export default async function WorkPage() {
  const items = await getAllCaseStudies();

  return (
    <>
      {/* ── Nav ── */}
      <nav className="fixed top-0 z-50 w-full border-b border-neutral-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            T3
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/work" className="font-medium text-black">
              Work
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-14">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-medium uppercase tracking-widest text-gold">
            Portfolio
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Workstories
          </h1>
          <p className="mt-3 max-w-lg text-neutral-500">
            Every project is a story — from brief to outcome. Filter, search,
            and explore.
          </p>
        </div>

        <WorkClient initialItems={items} />
      </main>
    </>
  );
}
