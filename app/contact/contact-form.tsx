"use client";

import { useState } from "react";

const inputClass =
  "w-full border-b border-border bg-transparent pb-3 pt-1 text-[14px] outline-none transition-colors duration-300 placeholder:text-muted-light focus:border-ink";

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
      <div className="py-10">
        <p className="font-display text-[22px] tracking-[-0.02em]">
          Message sent.
        </p>
        <p className="mt-3 text-[14px] leading-[1.7] text-muted">
          We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-[13px] font-medium text-gold transition-colors duration-300 hover:text-gold-dark"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
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
          className={inputClass}
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
          className={inputClass}
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
          className={inputClass}
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
        className="inline-flex h-11 items-center justify-center gap-2 bg-ink px-8 text-[13px] font-medium text-paper transition-colors duration-300 hover:bg-ink-light disabled:opacity-40"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
