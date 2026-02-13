import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../../../lib/auth";
import { dbConnect } from "../../../lib/db";
import { CaseStudy } from "../../../models/CaseStudy";
import AdminCaseStudies from "./admin-case-studies";

export const metadata = { title: "Case Studies — T3 Admin" };
export const dynamic = "force-dynamic";

async function getAll() {
  await dbConnect();
  const docs = await CaseStudy.find()
    .sort({ featured: -1, order: 1, year: -1 })
    .lean();
  return JSON.parse(JSON.stringify(docs));
}

export default async function AdminCaseStudiesPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin");

  const items = await getAll();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Admin nav */}
      <nav className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <a
              href="/admin/case-studies"
              className="text-lg font-semibold tracking-tight"
            >
              T3 Admin
            </a>
            <span className="rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">
              Case Studies
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a
              href="/"
              className="text-neutral-500 transition hover:text-neutral-900"
            >
              View Site
            </a>
            <LogoutButton />
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <AdminCaseStudies initialItems={items} />
      </div>
    </div>
  );
}

function LogoutButton() {
  return <LogoutBtn />;
}

import LogoutBtn from "./logout-btn";
