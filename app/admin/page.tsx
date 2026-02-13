import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../../lib/auth";
import AdminLoginForm from "./login-form";

export const metadata = { title: "Admin Login — T3" };

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();
  if (authed) redirect("/admin/case-studies");

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight">T3 Admin</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Enter your password to continue.
          </p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
