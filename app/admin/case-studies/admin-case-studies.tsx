"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import CaseStudyEditor from "./case-study-editor";

type Section = { heading: string; body: string; media: string[] };

type CaseStudyItem = {
  _id: string;
  slug: string;
  title: string;
  client?: string;
  year?: number;
  domains?: string[];
  industries?: string[];
  locations?: string[];
  heroImage?: string;
  gallery?: string[];
  featured?: boolean;
  order?: number;
  sections?: Section[];
  outcomes?: string[];
};

type View = "list" | "create" | "edit";

export default function AdminCaseStudies({
  initialItems,
}: {
  initialItems: CaseStudyItem[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [view, setView] = useState<View>("list");
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState("");

  const refreshList = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/case-studies");
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch {
      // silent
    }
  }, []);

  async function handleDelete(slug: string) {
    setError("");
    try {
      const res = await fetch(`/api/admin/case-studies/${slug}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Delete failed");
        return;
      }
      setDeleteConfirm(null);
      await refreshList();
      router.refresh();
    } catch {
      setError("Network error");
    }
  }

  function handleSaved() {
    setView("list");
    setEditSlug(null);
    refreshList();
    router.refresh();
  }

  // ── Editor views ──
  if (view === "create") {
    return (
      <CaseStudyEditor
        mode="create"
        onCancel={() => setView("list")}
        onSaved={handleSaved}
      />
    );
  }

  if (view === "edit" && editSlug) {
    return (
      <CaseStudyEditor
        mode="edit"
        slug={editSlug}
        onCancel={() => {
          setView("list");
          setEditSlug(null);
        }}
        onSaved={handleSaved}
      />
    );
  }

  // ── List view ──
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Case Studies</h1>
        <button
          onClick={() => setView("create")}
          className="rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          + New Case Study
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        {items.length === 0 ? (
          <div className="px-6 py-12 text-center text-neutral-500">
            No case studies yet. Create your first one.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                <th className="px-6 py-3">Title</th>
                <th className="hidden px-6 py-3 sm:table-cell">Client</th>
                <th className="hidden px-6 py-3 md:table-cell">Year</th>
                <th className="px-6 py-3 text-center">Featured</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((cs) => (
                <tr
                  key={cs._id}
                  className="border-b border-neutral-50 last:border-0"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium">{cs.title}</div>
                    <div className="text-xs text-neutral-400">/{cs.slug}</div>
                  </td>
                  <td className="hidden px-6 py-4 text-neutral-500 sm:table-cell">
                    {cs.client || "—"}
                  </td>
                  <td className="hidden px-6 py-4 text-neutral-500 md:table-cell">
                    {cs.year || "—"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {cs.featured ? (
                      <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
                    ) : (
                      <span className="inline-block h-2 w-2 rounded-full bg-neutral-200" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditSlug(cs.slug);
                          setView("edit");
                        }}
                        className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs transition hover:bg-neutral-50"
                      >
                        Edit
                      </button>

                      {deleteConfirm === cs.slug ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(cs.slug)}
                            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs text-white transition hover:bg-red-700"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs transition hover:bg-neutral-50"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(cs.slug)}
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 transition hover:bg-red-50"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
