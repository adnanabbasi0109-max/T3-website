import { notFound } from "next/navigation";
import { dbConnect } from "../../../lib/db";
import { CaseStudy } from "../../../models/CaseStudy";
import { serialize } from "../../../lib/utils";
import type { CaseStudyDoc } from "../../../lib/utils";
import CaseStudyStory from "./case-study-story";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  await dbConnect();
  const { slug } = await params;
  const item = await CaseStudy.findOne({ slug }).lean();
  if (!item) return { title: "Not Found" };
  const doc = item as Record<string, unknown>;
  return {
    title: `${doc.title}`,
    description: `${doc.client || "Case study"}: ${doc.title}`,
  };
}

async function getCaseStudy(slug: string): Promise<CaseStudyDoc | null> {
  await dbConnect();
  const doc = await CaseStudy.findOne({ slug }).lean();
  if (!doc) return null;
  return serialize(doc);
}

async function getRelated(
  slug: string,
  domains: string[],
  industries: string[]
): Promise<CaseStudyDoc[]> {
  await dbConnect();
  const orClauses: Record<string, unknown>[] = [];
  if (domains.length > 0) orClauses.push({ domains: { $in: domains } });
  if (industries.length > 0) orClauses.push({ industries: { $in: industries } });
  if (orClauses.length === 0) return [];

  const docs = await CaseStudy.find({
    slug: { $ne: slug },
    $or: orClauses,
  })
    .sort({ featured: -1, order: 1 })
    .limit(3)
    .lean();
  return serialize(docs);
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const item = await getCaseStudy(slug);
  if (!item) notFound();

  const related = await getRelated(slug, item.domains || [], item.industries || []);

  return <CaseStudyStory item={item} related={related} />;
}
