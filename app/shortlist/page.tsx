import ShortlistClient from "./shortlist-client";
import Reveal from "../../components/ui/reveal";

export const metadata = {
  title: "Your Shortlist",
  description: "Review your saved workstories and send us your brief.",
};

export default function ShortlistPage() {
  return (
    <main className="py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
            Your Selection
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Shortlist
          </h1>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
            Review the workstories you&apos;ve saved, then send us your brief.
            We&apos;ll respond within 24 hours.
          </p>
        </Reveal>
      </div>

      <ShortlistClient />
    </main>
  );
}
