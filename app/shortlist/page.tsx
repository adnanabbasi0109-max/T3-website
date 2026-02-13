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
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            Your Selection
          </p>
          <h1 className="mt-5 text-[clamp(2rem,5vw,4rem)] font-extrabold tracking-[-0.03em]">
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
