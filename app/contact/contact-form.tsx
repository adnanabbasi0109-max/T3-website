"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-lg border border-border bg-transparent px-4 py-3.5 text-[14px] outline-none transition-all duration-300 placeholder:text-muted/40 focus:border-ink focus:ring-1 focus:ring-ink/10";

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
      <div className="py-10 text-center">
        {/* Animated checkmark */}
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
              style={{
                strokeDasharray: 30,
                strokeDashoffset: 0,
                animation: "draw-check 0.5s ease-out forwards",
              }}
            />
          </svg>
        </div>
        <p className="font-display text-[22px] tracking-[-0.02em]">
          Message sent!
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-[13px] font-medium text-ink/80"
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
          className="mb-2 block text-[13px] font-medium text-ink/80"
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
          className="mb-2 block text-[13px] font-medium text-ink/80"
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
          className="mb-2 block text-[13px] font-medium text-ink/80"
        >
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={6}
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
          "Send Message"
        )}
      </button>
    </form>
  );
}
