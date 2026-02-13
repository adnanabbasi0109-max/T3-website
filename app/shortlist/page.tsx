import ShortlistClient from "./shortlist-client";
import Reveal from "../../components/motion/Reveal";
import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";

export const metadata = {
  title: "Your Shortlist",
  description: "Review your saved workstories and send us your brief.",
};

export default function ShortlistPage() {
  return (
    <>
      <Section spacing="lg">
        <Container>
          <Reveal>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.035em]">
              Your Shortlist
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-[1.85] text-muted sm:text-[16px]">
              Review the workstories you&apos;ve saved, then send us your brief.
            </p>
          </Reveal>
        </Container>
      </Section>

      <ShortlistClient />

      <div className="pb-20 sm:pb-32" />
    </>
  );
}
