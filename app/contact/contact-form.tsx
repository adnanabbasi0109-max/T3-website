"use client";

import { useState } from "react";

const inputClass =
  "glow-ring w-full rounded-[0.875rem] border border-border bg-paper-warm px-5 py-4 text-[14px] outline-none transition-all duration-500 placeholder:text-muted-light focus:border-border-strong focus:bg-paper";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[1.375rem] bg-paper-warm px-8 py-14 text-center shadow-card sm:px-12">
        <p className="font-display text-[24px] tracking-[-0.02em] sm:text-[28px]">
          Message sent.
        </p>
        <p className="mx-auto mt-4 max-w-xs text-[14px] leading-[1.8] text-muted">
          We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 rounded-full border border-border px-6 py-2.5 text-[13px] font-medium transition-all duration-500 hover:border-border-strong"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted"
        >
          Name <span className="text-accent">*</span>
        </label>
        <input
          id="name"
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
          htmlFor="email"
          className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted"
        >
          Email <span className="text-accent">*</span>
        </label>
        <input
          id="email"
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
          htmlFor="company"
          className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted"
        >
          Company
        </label>
        <input
          id="company"
          type="text"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className={inputClass}
          placeholder="Company name"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted"
        >
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
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
        className="btn-slide inline-flex h-[52px] items-center justify-center rounded-full bg-ink px-10 text-[14px] font-medium text-paper transition-all duration-500 hover:bg-ink-light hover:shadow-card disabled:opacity-40"
      >
        <span className="btn-text">
          {status === "loading" ? "Sending..." : "Send Message"}
        </span>
      </button>
    </form>
  );
}
