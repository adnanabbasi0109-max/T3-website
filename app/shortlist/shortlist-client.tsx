"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useShortlist } from "../../components/ui/shortlist-provider";
import type { CaseStudyDoc } from "../../lib/utils";

export default function ShortlistClient() {
  const { slugs, remove, clear, count } = useShortlist();
  const [items, setItems] = useState<CaseStudyDoc[]>([]);
  const [loading, setLoading] = useState(true);

  // Lead form state
  const [form, setForm] = useState({ name: "", email: "", company: "", challengeType: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch the actual case study data for the saved slugs
  useEffect(() => {
    async function load() {
      if (slugs.length === 0) {
        setItems([]);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/case-studies");
        if (res.ok) {
          const data = await res.json();
          const all: CaseStudyDoc[] = data.items || [];
          setItems(all.filter((cs) => slugs.includes(cs.slug)));
        }
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slugs]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          selectedCaseSlugs: slugs,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12 text-neutral-500">
        Loading your shortlist...
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-12 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-neutral-500">Your shortlist is empty.</p>
          <Link
            href="/work"
            className="mt-4 inline-block text-sm text-gold transition hover:underline"
          >
            Browse workstories &rarr;
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Saved items */}
      <div className="mt-10 space-y-3">
        {items.map((cs) => (
          <div
            key={cs.slug}
            className="flex items-center justify-between rounded-xl border border-neutral-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div>
              <Link
                href={`/work/${cs.slug}`}
                className="font-semibold transition hover:text-gold"
              >
                {cs.title}
              </Link>
              <p className="text-sm text-neutral-500">
                {cs.client || "Client"} &middot; {cs.year || ""}
              </p>
            </div>
            <button
              onClick={() => remove(cs.slug)}
              className="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={clear}
          className="text-sm text-neutral-500 transition hover:text-red-600"
        >
          Clear all
        </button>
      </div>

      {/* Lead form */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold">Send Your Brief</h2>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          We&apos;ll review your selected workstories and prepare a tailored
          response.
        </p>

        {status === "success" ? (
          <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-8 text-center dark:border-green-900 dark:bg-green-950">
            <p className="text-lg font-semibold text-green-800 dark:text-green-200">
              Brief submitted!
            </p>
            <p className="mt-2 text-sm text-green-600 dark:text-green-400">
              We&apos;ll get back to you within 24 hours with a tailored
              response based on your selected workstories.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-lg space-y-5">
            <div>
              <label htmlFor="lead-name" className="mb-1 block text-sm font-medium">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                id="lead-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>

            <div>
              <label htmlFor="lead-email" className="mb-1 block text-sm font-medium">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="lead-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>

            <div>
              <label htmlFor="lead-company" className="mb-1 block text-sm font-medium">
                Company
              </label>
              <input
                id="lead-company"
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>

            <div>
              <label htmlFor="lead-challenge" className="mb-1 block text-sm font-medium">
                Challenge Type
              </label>
              <select
                id="lead-challenge"
                value={form.challengeType}
                onChange={(e) => setForm({ ...form, challengeType: e.target.value })}
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-gold dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              >
                <option value="">Select...</option>
                <option value="Brand Building">Brand Building</option>
                <option value="PR & Media">PR & Media Strategy</option>
                <option value="Social Media">Social Media</option>
                <option value="Business Innovation">Business Innovation</option>
                <option value="Art & Design">Art & Design</option>
                <option value="AI & Tech">AI & Tech Solutions</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="lead-message" className="mb-1 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="lead-message"
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold dark:border-neutral-700 dark:bg-neutral-800"
                placeholder="Tell us about your challenge..."
              />
            </div>

            {status === "error" && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              {status === "loading" ? "Sending..." : "Submit Brief"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
