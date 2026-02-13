"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useShortlist } from "../../components/ui/shortlist-provider";
import type { CaseStudyDoc } from "../../lib/utils";
import Container from "../../components/layout/Container";

const inputClass =
  "w-full border-b border-border bg-transparent pb-3 pt-1 text-[14px] outline-none transition-colors duration-300 placeholder:text-muted-light focus:border-ink";

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
      <Container className="py-12 text-[14px] text-muted">
        Loading your shortlist...
      </Container>
    );
  }

  if (count === 0) {
    return (
      <Container className="py-16">
        <div className="border-t border-border py-16 text-center">
          <p className="text-[15px] text-muted">
            Your shortlist is empty.
          </p>
          <Link
            href="/work"
            className="mt-3 inline-block text-[13px] font-medium text-gold transition-colors duration-300 hover:text-gold-dark"
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
      <div className="border-t border-border">
        {items.map((cs) => (
          <div
            key={cs.slug}
            className="flex items-center gap-4 border-b border-border py-4 sm:gap-6"
          >
            {/* Thumbnail */}
            {cs.heroImage ? (
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-sm bg-paper-warm sm:h-14 sm:w-14">
                <img
                  src={cs.heroImage}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-paper-warm sm:h-14 sm:w-14">
                <span className="font-display text-lg text-muted-light">
                  {cs.title.charAt(0)}
                </span>
              </div>
            )}

            {/* Info */}
            <div className="min-w-0 flex-1">
              <Link
                href={`/work/${cs.slug}`}
                className="block truncate text-[14px] font-medium tracking-[-0.01em] transition-colors duration-300 hover:text-gold sm:text-[15px]"
              >
                {cs.title}
              </Link>
              <p className="mt-0.5 text-[11px] text-muted">
                {cs.client || "Client"}{cs.year ? ` · ${cs.year}` : ""}
              </p>
            </div>

            {/* Remove */}
            <button
              onClick={() => remove(cs.slug)}
              className="shrink-0 p-1.5 text-muted-light transition-colors duration-300 hover:text-accent"
              aria-label={`Remove ${cs.title}`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-end">
        <button
          onClick={clear}
          className="text-[12px] text-muted-light transition-colors duration-300 hover:text-accent"
        >
          Clear all
        </button>
      </div>

      {/* ── Lead form ── */}
      <div className="mt-16 border-t border-border pt-12 sm:mt-20 sm:pt-16">
        <h2 className="font-display text-[clamp(1.25rem,2.5vw,1.75rem)] tracking-[-0.02em]">
          Send Your Brief
        </h2>
        <p className="mt-3 text-[14px] leading-[1.75] text-muted sm:text-[15px]">
          We&apos;ll review your selected workstories and prepare a tailored response.
        </p>

        {status === "success" ? (
          <div className="mt-10 py-8">
            <p className="font-display text-[20px] tracking-[-0.02em]">
              Brief submitted.
            </p>
            <p className="mt-2 text-[14px] text-muted">
              We&apos;ll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-lg space-y-7">
            <div>
              <label htmlFor="lead-name" className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                Name <span className="text-accent">*</span>
              </label>
              <input id="lead-name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Your name" />
            </div>

            <div>
              <label htmlFor="lead-email" className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                Email <span className="text-accent">*</span>
              </label>
              <input id="lead-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="you@company.com" />
            </div>

            <div>
              <label htmlFor="lead-company" className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                Company
              </label>
              <input id="lead-company" type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputClass} placeholder="Company name" />
            </div>

            <div>
              <label htmlFor="lead-challenge" className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
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
              <label htmlFor="lead-message" className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
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
              className="inline-flex h-11 items-center justify-center gap-2 bg-ink px-8 text-[13px] font-medium text-paper transition-colors duration-300 hover:bg-ink-light disabled:opacity-40"
            >
              {status === "loading" ? "Sending..." : "Submit Brief"}
            </button>
          </form>
        )}
      </div>
    </Container>
  );
}
