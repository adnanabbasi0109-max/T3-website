import ShortlistClient from "./shortlist-client";
import Reveal from "../../components/motion/Reveal";
import Container from "../../components/layout/Container";

export const metadata = {
  title: "Your Shortlist",
  description: "Review your saved workstories and send us your brief.",
};

export default function ShortlistPage() {
  return (
    <main className="pb-28 pt-20 sm:pb-36 sm:pt-28 lg:pt-36">
      <Container>
        <Reveal>
          <h1 className="font-display text-[clamp(2rem,6vw,4rem)] tracking-[-0.02em]">
            Shortlist
          </h1>
          <p className="mt-5 max-w-lg text-[15px] leading-[1.75] text-muted">
            Review the workstories you&apos;ve saved, then send us your brief.
            We&apos;ll respond within 24 hours.
          </p>
        </Reveal>
      </Container>

      <ShortlistClient />
    </main>
  );
}
