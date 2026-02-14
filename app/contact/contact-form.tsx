"use client";

import { useState } from "react";

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
      <div className="py-20 text-center sm:py-28">
        <p className="font-display text-[24px] tracking-[-0.02em] sm:text-[28px]">
          Message sent.
        </p>
        <p className="mx-auto mt-5 max-w-xs text-[14px] leading-[1.85] text-muted">
          We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-10 rounded-full border border-border px-6 py-2.5 text-[13px] font-medium transition-all duration-500 hover:border-border-strong"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted"
        >
          Name <span className="text-accent">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border-b border-border bg-transparent px-0 py-4 text-[15px] outline-none transition-all duration-500 placeholder:text-muted-light/60 focus:border-accent/40"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted"
        >
          Email <span className="text-accent">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border-b border-border bg-transparent px-0 py-4 text-[15px] outline-none transition-all duration-500 placeholder:text-muted-light/60 focus:border-accent/40"
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label
          htmlFor="company"
          className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted"
        >
          Company
        </label>
        <input
          id="company"
          type="text"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="w-full border-b border-border bg-transparent px-0 py-4 text-[15px] outline-none transition-all duration-500 placeholder:text-muted-light/60 focus:border-accent/40"
          placeholder="Company name"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted"
        >
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full resize-y border-b border-border bg-transparent px-0 py-4 text-[15px] outline-none transition-all duration-500 placeholder:text-muted-light/60 focus:border-accent/40"
          placeholder="Tell us about your challenge..."
        />
      </div>

      {status === "error" && (
        <p className="text-[13px] text-accent">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-slide inline-flex h-[52px] items-center justify-center rounded-full bg-ink px-10 text-[14px] font-medium text-paper transition-all duration-500 hover:bg-ink-light disabled:opacity-40"
      >
        <span className="btn-text">
          {status === "loading" ? "Sending..." : "Send Message"}
        </span>
      </button>
    </form>
  );
}
