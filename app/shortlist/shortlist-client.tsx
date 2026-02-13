"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useShortlist } from "../../components/ui/shortlist-provider";
import type { CaseStudyDoc } from "../../lib/utils";
import Container from "../../components/layout/Container";

const inputClass =
  "w-full rounded-lg border border-border bg-transparent px-4 py-3.5 text-[14px] outline-none transition-all duration-300 placeholder:text-muted/40 focus:border-ink focus:ring-1 focus:ring-ink/10";

export default function ShortlistClient() {
  const { slugs, remove, clear, count } = useShortlist();
  const [items, setItems] = useState<CaseStudyDoc[]>([]);
  const [loading, setLoading] = useState(true);

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
      <Container className="py-16 text-muted">
        Loading your shortlist...
      </Container>
    );
  }

  if (count === 0) {
    return (
      <Container className="py-20">
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border py-20 text-center">
          {/* Bookmark icon */}
          <svg
            className="h-16 w-16 text-border"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
          <p className="mt-6 text-[15px] text-muted">
            Your shortlist is empty.
          </p>
          <Link
            href="/work"
            className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-gold transition-colors duration-300 hover:text-gold-dark"
          >
            Start exploring&nbsp;&rarr;
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {/* ── Shortlisted items as cards ── */}
      <div className="mt-14 space-y-3">
        {items.map((cs) => (
          <div
            key={cs.slug}
            className="flex items-center gap-4 rounded-lg bg-paper-warm p-4 transition-colors duration-200"
          >
            {/* Thumbnail */}
            {cs.heroImage ? (
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-border">
                <img
                  src={cs.heroImage}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-border">
                <span className="font-display text-xl text-muted/40">
                  {cs.title.charAt(0)}
                </span>
              </div>
            )}

            {/* Info */}
            <div className="min-w-0 flex-1">
              <Link
                href={`/work/${cs.slug}`}
                className="block truncate font-display text-[16px] tracking-[-0.02em] transition-colors duration-300 hover:text-gold"
              >
                {cs.title}
              </Link>
              <p className="mt-0.5 text-[12px] text-muted">
                {cs.client || "Client"} &middot; {cs.year || ""}
              </p>
            </div>

            {/* Remove */}
            <button
              onClick={() => remove(cs.slug)}
              className="shrink-0 rounded-full p-2 text-muted transition-colors duration-300 hover:bg-accent/10 hover:text-accent"
              aria-label={`Remove ${cs.title}`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={clear}
          className="text-[13px] text-muted transition-colors duration-300 hover:text-accent"
        >
          Clear all
        </button>
      </div>

      {/* ── Lead form ── */}
      <div className="mt-20 lg:mt-28">
        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] tracking-[-0.02em]">
          Send Your Brief
        </h2>
        <p className="mt-3 text-[15px] leading-[1.75] text-muted">
          We&apos;ll review your selected workstories and prepare a tailored
          response.
        </p>

        {status === "success" ? (
          <div className="mt-12 py-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
              <svg
                className="h-8 w-8 text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <p className="font-display text-[22px] tracking-[-0.02em]">
              Brief submitted!
            </p>
            <p className="mt-3 text-[14px] leading-[1.7] text-muted">
              We&apos;ll get back to you within 24 hours with a tailored
              response based on your selected workstories.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 max-w-lg space-y-6">
            <div>
              <label
                htmlFor="lead-name"
                className="mb-2 block text-[13px] font-medium text-ink/80"
              >
                Name <span className="text-accent">*</span>
              </label>
              <input
                id="lead-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="lead-email"
                className="mb-2 block text-[13px] font-medium text-ink/80"
              >
                Email <span className="text-accent">*</span>
              </label>
              <input
                id="lead-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label
                htmlFor="lead-company"
                className="mb-2 block text-[13px] font-medium text-ink/80"
              >
                Company
              </label>
              <input
                id="lead-company"
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className={inputClass}
                placeholder="Company name"
              />
            </div>

            <div>
              <label
                htmlFor="lead-challenge"
                className="mb-2 block text-[13px] font-medium text-ink/80"
              >
                Challenge Type
              </label>
              <select
                id="lead-challenge"
                value={form.challengeType}
                onChange={(e) =>
                  setForm({ ...form, challengeType: e.target.value })
                }
                className={`${inputClass} appearance-none`}
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
                className="mb-2 block text-[13px] font-medium text-ink/80"
              >
                Message
              </label>
              <textarea
                id="lead-message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-y`}
                placeholder="Tell us about your challenge..."
              />
            </div>

            {status === "error" && (
              <p className="text-[13px] text-accent">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink py-4 text-[13px] font-medium text-paper transition-all duration-300 hover:bg-ink/90 disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="opacity-25"
                    />
                    <path
                      d="M4 12a8 8 0 018-8"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                "Submit Brief"
              )}
            </button>
          </form>
        )}
      </div>
    </Container>
  );
}
