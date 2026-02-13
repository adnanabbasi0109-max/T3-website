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
      <Section spacing="md">
        <Container>
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Saved
            </p>
            <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.025em]">
              Your Shortlist
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-[1.75] text-muted">
              Review the workstories you&apos;ve saved, then send us your brief.
            </p>
          </Reveal>
        </Container>
      </Section>

      <ShortlistClient />

      <div className="pb-20 sm:pb-28" />
    </>
  );
}
