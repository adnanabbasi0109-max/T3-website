"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useShortlist } from "../../components/ui/shortlist-provider";
import type { CaseStudyDoc } from "../../lib/utils";
import Container from "../../components/layout/Container";

const inputClass =
  "w-full rounded-[0.875rem] border border-border bg-paper-warm px-5 py-4 text-[14px] outline-none transition-all duration-500 placeholder:text-muted-light focus:border-border-strong focus:bg-paper";

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
      <Container className="py-12">
        <div className="flex items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-[1.5px] border-border border-t-ink" />
        </div>
      </Container>
    );
  }

  if (count === 0) {
    return (
      <Container className="py-16">
        <div className="rounded-[1.375rem] bg-paper-warm px-8 py-16 text-center sm:px-12">
          <p className="text-[16px] text-muted">
            Your shortlist is empty.
          </p>
          <Link
            href="/work"
            className="mt-5 inline-flex h-12 items-center rounded-full border border-border px-8 text-[13px] font-medium transition-all duration-500 hover:border-border-strong"
          >
            Start exploring &rarr;
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {/* ── Shortlisted items ── */}
      <div>
        {items.map((cs) => (
          <div
            key={cs.slug}
            className="flex items-center gap-5 border-b border-border py-5 sm:gap-8"
          >
            {/* Thumbnail */}
            {cs.heroImage ? (
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[0.625rem] bg-paper-warm sm:h-16 sm:w-16">
                <img
                  src={cs.heroImage}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[0.625rem] bg-ink-light sm:h-16 sm:w-16">
                <span className="font-display text-lg text-paper/30">
                  {cs.title.charAt(0)}
                </span>
              </div>
            )}

            {/* Info */}
            <div className="min-w-0 flex-1">
              <Link
                href={`/work/${cs.slug}`}
                className="block truncate text-[15px] font-semibold tracking-[-0.01em] transition-colors duration-500 hover:text-accent sm:text-[16px]"
              >
                {cs.title}
              </Link>
              <p className="mt-1 text-[12px] text-muted">
                {cs.client || "Client"}{cs.year ? ` · ${cs.year}` : ""}
              </p>
            </div>

            {/* Remove */}
            <button
              onClick={() => remove(cs.slug)}
              className="shrink-0 rounded-full border border-border p-2 text-muted-light transition-all duration-500 hover:border-accent/30 hover:text-accent"
              aria-label={`Remove ${cs.title}`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={clear}
          className="text-[12px] text-muted-light transition-colors duration-500 hover:text-accent"
        >
          Clear all
        </button>
      </div>

      {/* ── Lead form ── */}
      <div className="mt-20 border-t border-border pt-16 sm:mt-24 sm:pt-20">
        <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] tracking-[-0.025em]">
          Send Your Brief
        </h2>
        <p className="mt-4 text-[15px] leading-[1.85] text-muted sm:text-[16px]">
          We&apos;ll review your selected workstories and prepare a tailored response.
        </p>

        {status === "success" ? (
          <div className="mt-12 rounded-[1.375rem] bg-paper-warm px-8 py-14 text-center sm:px-12">
            <p className="font-display text-[24px] tracking-[-0.02em]">
              Brief submitted.
            </p>
            <p className="mt-3 text-[14px] text-muted">
              We&apos;ll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 max-w-lg space-y-5">
            <div>
              <label htmlFor="lead-name" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                Name <span className="text-accent">*</span>
              </label>
              <input id="lead-name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Your name" />
            </div>

            <div>
              <label htmlFor="lead-email" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                Email <span className="text-accent">*</span>
              </label>
              <input id="lead-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="you@company.com" />
            </div>

            <div>
              <label htmlFor="lead-company" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                Company
              </label>
              <input id="lead-company" type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputClass} placeholder="Company name" />
            </div>

            <div>
              <label htmlFor="lead-challenge" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                Challenge Type
              </label>
              <select id="lead-challenge" value={form.challengeType} onChange={(e) => setForm({ ...form, challengeType: e.target.value })} className={`${inputClass} cursor-pointer appearance-none`}>
                <option value="">Select...</option>
                <option value="Brand Building">Brand Building</option>
                <option value="PR & Media">PR &amp; Media Strategy</option>
                <option value="Social Media">Social Media</option>
                <option value="Business Innovation">Business Innovation</option>
                <option value="Art & Design">Art &amp; Design</option>
                <option value="AI & Tech">AI &amp; Tech Solutions</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="lead-message" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                Message
              </label>
              <textarea id="lead-message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-y`} placeholder="Tell us about your challenge..." />
            </div>

            {status === "error" && (
              <p className="text-[13px] text-accent">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-slide inline-flex h-13 items-center justify-center rounded-full bg-ink px-10 text-[14px] font-medium text-paper transition-all duration-500 hover:bg-ink-light disabled:opacity-40"
            >
              <span className="btn-text">
                {status === "loading" ? "Sending..." : "Submit Brief"}
              </span>
            </button>
          </form>
        )}
      </div>
    </Container>
  );
}
