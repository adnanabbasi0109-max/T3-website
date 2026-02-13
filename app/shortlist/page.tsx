import ShortlistClient from "./shortlist-client";

export const metadata = {
  title: "Your Shortlist",
  description: "Review your saved workstories and send us your brief.",
};

export default function ShortlistPage() {
  return (
    <main className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Your Selection
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Shortlist
        </h1>
        <p className="mt-3 max-w-lg text-neutral-500 dark:text-neutral-400">
          Review the workstories you&apos;ve saved, then send us your brief.
          We&apos;ll respond within 24 hours.
        </p>
      </div>

      <ShortlistClient />
    </main>
  );
}
