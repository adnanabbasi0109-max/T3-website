"use client";

import { useCallback, useEffect, useState } from "react";

type Section = { heading: string; body: string; media: string[] };

type FormData = {
  slug: string;
  title: string;
  client: string;
  year: string;
  domains: string;
  industries: string;
  locations: string;
  heroImage: string;
  gallery: string;
  featured: boolean;
  order: string;
  sections: Section[];
  outcomes: string;
};

const emptyForm: FormData = {
  slug: "",
  title: "",
  client: "",
  year: "",
  domains: "",
  industries: "",
  locations: "",
  heroImage: "",
  gallery: "",
  featured: false,
  order: "0",
  sections: [],
  outcomes: "",
};

function emptySection(): Section {
  return { heading: "", body: "", media: [] };
}

export default function CaseStudyEditor({
  mode,
  slug,
  onCancel,
  onSaved,
}: {
  mode: "create" | "edit";
  slug?: string;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load existing data for edit mode
  useEffect(() => {
    if (mode !== "edit" || !slug) return;

    (async () => {
      try {
        const res = await fetch(`/api/admin/case-studies/${slug}`);
        if (!res.ok) {
          setError("Failed to load case study");
          setLoading(false);
          return;
        }
        const data = await res.json();
        const item = data.item;

        setForm({
          slug: item.slug || "",
          title: item.title || "",
          client: item.client || "",
          year: item.year?.toString() || "",
          domains: (item.domains || []).join(", "),
          industries: (item.industries || []).join(", "),
          locations: (item.locations || []).join(", "),
          heroImage: item.heroImage || "",
          gallery: (item.gallery || []).join("\n"),
          featured: item.featured || false,
          order: item.order?.toString() || "0",
          sections: (item.sections || []).map(
            (s: { heading?: string; body?: string; media?: string[] }) => ({
              heading: s.heading || "",
              body: s.body || "",
              media: s.media || [],
            })
          ),
          outcomes: (item.outcomes || []).join("\n"),
        });
      } catch {
        setError("Network error loading case study");
      } finally {
        setLoading(false);
      }
    })();
  }, [mode, slug]);

  const setField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // ── Section management ──
  function addSection() {
    setForm((prev) => ({
      ...prev,
      sections: [...prev.sections, emptySection()],
    }));
  }

  function removeSection(idx: number) {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== idx),
    }));
  }

  function moveSection(idx: number, dir: -1 | 1) {
    setForm((prev) => {
      const arr = [...prev.sections];
      const target = idx + dir;
      if (target < 0 || target >= arr.length) return prev;
      [arr[idx], arr[target]] = [arr[target], arr[idx]];
      return { ...prev, sections: arr };
    });
  }

  function updateSection(idx: number, field: keyof Section, value: string | string[]) {
    setForm((prev) => {
      const arr = [...prev.sections];
      arr[idx] = { ...arr[idx], [field]: value };
      return { ...prev, sections: arr };
    });
  }

  // ── Submit ──
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const splitCSV = (s: string) =>
        s
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean);

      const splitLines = (s: string) =>
        s
          .split("\n")
          .map((x) => x.trim())
          .filter(Boolean);

      const payload = {
        slug: form.slug,
        title: form.title,
        client: form.client || undefined,
        year: form.year ? parseInt(form.year, 10) : undefined,
        domains: splitCSV(form.domains),
        industries: splitCSV(form.industries),
        locations: splitCSV(form.locations),
        heroImage: form.heroImage || undefined,
        gallery: splitLines(form.gallery),
        featured: form.featured,
        order: parseInt(form.order, 10) || 0,
        sections: form.sections.map((s) => ({
          heading: s.heading,
          body: s.body,
          media: s.media.filter(Boolean),
        })),
        outcomes: splitLines(form.outcomes),
      };

      const url =
        mode === "create"
          ? "/api/admin/case-studies"
          : `/api/admin/case-studies/${slug}`;

      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Save failed");
        return;
      }

      setSuccess(mode === "create" ? "Case study created!" : "Changes saved!");
      setTimeout(() => onSaved(), 800);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="py-12 text-center text-neutral-500">
        Loading editor...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {mode === "create" ? "New Case Study" : `Edit: ${form.title || slug}`}
        </h1>
        <button
          onClick={onCancel}
          className="rounded-lg border border-neutral-200 px-4 py-2 text-sm transition hover:bg-neutral-50"
        >
          &larr; Back to list
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ── Basic fields ── */}
        <fieldset className="rounded-2xl border border-neutral-200 bg-white p-6">
          <legend className="px-2 text-sm font-semibold text-neutral-700">
            Basic Info
          </legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              label="Slug"
              value={form.slug}
              onChange={(v) => setField("slug", v)}
              placeholder="my-case-study"
              required
              disabled={mode === "edit"}
              hint={mode === "edit" ? "Slug cannot be changed" : "URL-safe identifier"}
            />
            <InputField
              label="Title"
              value={form.title}
              onChange={(v) => setField("title", v)}
              placeholder="Case study title"
              required
            />
            <InputField
              label="Client"
              value={form.client}
              onChange={(v) => setField("client", v)}
              placeholder="Client name"
            />
            <InputField
              label="Year"
              value={form.year}
              onChange={(v) => setField("year", v)}
              placeholder="2024"
              type="number"
            />
            <InputField
              label="Order"
              value={form.order}
              onChange={(v) => setField("order", v)}
              placeholder="0"
              type="number"
              hint="Lower = higher priority"
            />
            <div className="flex items-end">
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 px-4 py-2.5">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setField("featured", e.target.checked)}
                  className="h-4 w-4 accent-amber-500"
                />
                <span className="text-sm font-medium text-neutral-700">
                  Featured
                </span>
              </label>
            </div>
          </div>
        </fieldset>

        {/* ── Tags ── */}
        <fieldset className="rounded-2xl border border-neutral-200 bg-white p-6">
          <legend className="px-2 text-sm font-semibold text-neutral-700">
            Tags &amp; Categories
          </legend>

          <div className="grid gap-4 sm:grid-cols-3">
            <InputField
              label="Domains"
              value={form.domains}
              onChange={(v) => setField("domains", v)}
              placeholder="Brand Building, PR, Strategy"
              hint="Comma-separated"
            />
            <InputField
              label="Industries"
              value={form.industries}
              onChange={(v) => setField("industries", v)}
              placeholder="Hospitality, Real Estate"
              hint="Comma-separated"
            />
            <InputField
              label="Locations"
              value={form.locations}
              onChange={(v) => setField("locations", v)}
              placeholder="Jaipur, Mumbai"
              hint="Comma-separated"
            />
          </div>
        </fieldset>

        {/* ── Media ── */}
        <fieldset className="rounded-2xl border border-neutral-200 bg-white p-6">
          <legend className="px-2 text-sm font-semibold text-neutral-700">
            Media
          </legend>

          <div className="space-y-4">
            <InputField
              label="Hero Image URL"
              value={form.heroImage}
              onChange={(v) => setField("heroImage", v)}
              placeholder="https://..."
            />
            <TextAreaField
              label="Gallery URLs"
              value={form.gallery}
              onChange={(v) => setField("gallery", v)}
              placeholder={"https://img1.jpg\nhttps://img2.jpg"}
              hint="One URL per line"
              rows={3}
            />
          </div>
        </fieldset>

        {/* ── Sections builder ── */}
        <fieldset className="rounded-2xl border border-neutral-200 bg-white p-6">
          <legend className="px-2 text-sm font-semibold text-neutral-700">
            Sections
          </legend>

          {form.sections.length === 0 && (
            <p className="mb-4 text-sm text-neutral-400">
              No sections yet. Add one below.
            </p>
          )}

          <div className="space-y-4">
            {form.sections.map((sec, i) => (
              <div
                key={i}
                className="rounded-xl border border-neutral-100 bg-neutral-50 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-600">
                    Section {i + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveSection(i, -1)}
                      disabled={i === 0}
                      className="rounded border border-neutral-200 bg-white px-2 py-1 text-xs transition hover:bg-neutral-100 disabled:opacity-30"
                      title="Move up"
                    >
                      &uarr;
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSection(i, 1)}
                      disabled={i === form.sections.length - 1}
                      className="rounded border border-neutral-200 bg-white px-2 py-1 text-xs transition hover:bg-neutral-100 disabled:opacity-30"
                      title="Move down"
                    >
                      &darr;
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSection(i)}
                      className="rounded border border-red-200 bg-white px-2 py-1 text-xs text-red-600 transition hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <InputField
                    label="Heading"
                    value={sec.heading}
                    onChange={(v) => updateSection(i, "heading", v)}
                    placeholder="Section heading"
                    required
                  />
                  <TextAreaField
                    label="Body"
                    value={sec.body}
                    onChange={(v) => updateSection(i, "body", v)}
                    placeholder="Section content..."
                    required
                    rows={4}
                  />
                  <TextAreaField
                    label="Media URLs"
                    value={sec.media.join("\n")}
                    onChange={(v) =>
                      updateSection(
                        i,
                        "media",
                        v
                          .split("\n")
                          .map((x) => x.trim())
                          .filter(Boolean)
                      )
                    }
                    placeholder={"https://img1.jpg\nhttps://img2.jpg"}
                    hint="One URL per line"
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addSection}
            className="mt-4 rounded-xl border border-dashed border-neutral-300 px-4 py-2.5 text-sm text-neutral-600 transition hover:border-neutral-400 hover:bg-neutral-50"
          >
            + Add Section
          </button>
        </fieldset>

        {/* ── Outcomes ── */}
        <fieldset className="rounded-2xl border border-neutral-200 bg-white p-6">
          <legend className="px-2 text-sm font-semibold text-neutral-700">
            Outcomes
          </legend>

          <TextAreaField
            label="Outcomes"
            value={form.outcomes}
            onChange={(v) => setField("outcomes", v)}
            placeholder={"Revenue grew 45%\nBrand awareness increased 3x"}
            hint="One outcome per line"
            rows={4}
          />
        </fieldset>

        {/* ── Actions ── */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : mode === "create"
                ? "Create Case Study"
                : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-neutral-200 px-6 py-2.5 text-sm transition hover:bg-neutral-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

/* ── Reusable form components ── */

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  disabled,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-neutral-700">
        {label}
        {required && <span className="text-red-400"> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 disabled:bg-neutral-100 disabled:text-neutral-400"
      />
      {hint && <p className="mt-1 text-xs text-neutral-400">{hint}</p>}
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 3,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  hint?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-neutral-700">
        {label}
        {required && <span className="text-red-400"> *</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
      />
      {hint && <p className="mt-1 text-xs text-neutral-400">{hint}</p>}
    </div>
  );
}
