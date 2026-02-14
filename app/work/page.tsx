import { dbConnect } from "../../lib/db";
import { CaseStudy } from "../../models/CaseStudy";
import { serialize } from "../../lib/utils";
import type { CaseStudyDoc } from "../../lib/utils";
import WorkClient from "./work-client";
import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";
import Reveal from "../../components/motion/Reveal";

export const metadata = {
  title: "Workstories",
  description:
    "Explore T3's portfolio of creative workstories. Filter by domain and industry.",
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
      <Section spacing="lg">
        <Container>
          <Reveal>
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              Portfolio
            </p>
            <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] tracking-[-0.04em]">
              Workstories
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-lg text-[15px] leading-[1.85] text-muted sm:text-[16px]">
              Every project is a workstory — documented proof of creative
              strategy meeting real-world outcomes.
            </p>
          </Reveal>
        </Container>
      </Section>

      <WorkClient initialItems={items} />

      <div className="pb-28 sm:pb-40" />
    </>
  );
}
