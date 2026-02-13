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
    "Explore T3's award-winning portfolio of creative workstories. Filter by domain and industry.",
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
      <Section spacing="lg">
        <Container>
          <Reveal>
            <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] tracking-[-0.035em]">
              Our Work
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-[15px] leading-[1.85] text-muted sm:text-[16px]">
              Explore T3&apos;s portfolio of award-winning digital experiences and
              creative workstories.
            </p>
          </Reveal>
        </Container>
      </Section>

      <WorkClient initialItems={items} />

      <div className="pb-20 sm:pb-32" />
    </>
  );
}
