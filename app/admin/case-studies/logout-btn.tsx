"use client";

import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-neutral-500 transition hover:text-red-600"
    >
      Logout
    </button>
  );
}
