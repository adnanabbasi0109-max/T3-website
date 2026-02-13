"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useShortlist } from "../../components/ui/shortlist-provider";
import type { CaseStudyDoc } from "../../lib/utils";

const inputClass =
  "w-full border-b border-border bg-transparent pb-3 text-[14px] outline-none transition-colors placeholder:text-neutral-400 focus:border-surface-dark";

export default function ShortlistClient() {
  const { slugs, remove, clear, count } = useShortlist();
  const [items, setItems] = useState<CaseStudyDoc[]>([]);
  const [loading, setLoading] = useState(true);

  // Lead form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    challengeType: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
      <div className="mx-auto max-w-[1200px] px-6 py-16 text-muted lg:px-10">
        Loading your shortlist...
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10">
        <div className="border-t border-border pt-12 text-center">
          <p className="text-muted">Your shortlist is empty.</p>
          <Link
            href="/work"
            className="mt-4 inline-block text-[13px] font-medium text-gold transition hover:underline"
          >
            Browse workstories &rarr;
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
      {/* Saved items */}
      <div className="mt-16">
        <div className="h-px bg-border" />
        {items.map((cs) => (
          <div
            key={cs.slug}
            className="flex items-center justify-between border-b border-border py-6 transition-colors hover:bg-neutral-50"
          >
            <div>
              <Link
                href={`/work/${cs.slug}`}
                className="text-[15px] font-semibold tracking-tight transition hover:text-gold"
              >
                {cs.title}
              </Link>
              <p className="mt-1 text-[12px] text-muted">
                {cs.client || "Client"} &middot; {cs.year || ""}
              </p>
            </div>
            <button
              onClick={() => remove(cs.slug)}
              className="text-[12px] font-medium text-neutral-400 transition hover:text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={clear}
          className="text-[13px] text-muted transition hover:text-red-500"
        >
          Clear all
        </button>
      </div>

      {/* Lead form */}
      <div className="mt-24">
        <h2 className="text-[22px] font-bold tracking-tight">
          Send Your Brief
        </h2>
        <p className="mt-3 text-[15px] text-muted">
          We&apos;ll review your selected workstories and prepare a tailored
          response.
        </p>

        {status === "success" ? (
          <div className="mt-12 border-t border-border pt-10 text-center">
            <p className="text-[18px] font-semibold tracking-tight">
              Brief submitted!
            </p>
            <p className="mt-3 text-[14px] text-muted">
              We&apos;ll get back to you within 24 hours with a tailored
              response based on your selected workstories.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 max-w-lg space-y-8">
            <div>
              <label
                htmlFor="lead-name"
                className="mb-3 block text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400"
              >
                Name <span className="text-red-400">*</span>
              </label>
              <input
                id="lead-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="lead-email"
                className="mb-3 block text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400"
              >
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="lead-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="lead-company"
                className="mb-3 block text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400"
              >
                Company
              </label>
              <input
                id="lead-company"
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="lead-challenge"
                className="mb-3 block text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400"
              >
                Challenge Type
              </label>
              <select
                id="lead-challenge"
                value={form.challengeType}
                onChange={(e) =>
                  setForm({ ...form, challengeType: e.target.value })
                }
                className="w-full appearance-none border-b border-border bg-transparent pb-3 pr-6 text-[14px] outline-none transition-colors focus:border-surface-dark"
              >
                <option value="">Select...</option>
                <option value="Brand Building">Brand Building</option>
                <option value="PR & Media">PR &amp; Media Strategy</option>
                <option value="Social Media">Social Media</option>
                <option value="Business Innovation">
                  Business Innovation
                </option>
                <option value="Art & Design">Art &amp; Design</option>
                <option value="AI & Tech">AI &amp; Tech Solutions</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="lead-message"
                className="mb-3 block text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400"
              >
                Message
              </label>
              <textarea
                id="lead-message"
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
                placeholder="Tell us about your challenge..."
              />
            </div>

            {status === "error" && (
              <p className="text-[13px] text-red-500">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-full bg-surface-dark px-6 py-3.5 text-[13px] font-medium text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Submit Brief"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
