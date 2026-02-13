import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../../../lib/auth";
import { dbConnect } from "../../../lib/db";
import { CaseStudy } from "../../../models/CaseStudy";
import { serialize } from "../../../lib/utils";
import AdminCaseStudies from "./admin-case-studies";
import LogoutBtn from "./logout-btn";

export const metadata = { title: "Case Studies — T3 Admin" };
export const dynamic = "force-dynamic";

async function getAll() {
  await dbConnect();
  const docs = await CaseStudy.find()
    .sort({ featured: -1, order: 1, year: -1 })
    .lean();
  return serialize(docs);
}

export default async function AdminCaseStudiesPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin");

  const items = await getAll();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Admin nav */}
      <nav className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <a
              href="/admin/case-studies"
              className="text-lg font-semibold tracking-tight"
            >
              T<span className="text-gold">3</span> Admin
            </a>
            <span className="rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
              Case Studies
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a
              href="/"
              className="text-neutral-500 transition hover:text-neutral-900 dark:hover:text-white"
            >
              View Site
            </a>
            <LogoutBtn />
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <AdminCaseStudies initialItems={items} />
      </div>
    </div>
  );
}
