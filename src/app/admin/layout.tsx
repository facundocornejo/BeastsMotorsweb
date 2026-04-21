"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) return <>{children}</>;

  return (
    <div className="admin-theme min-h-screen bg-[#f3f4f6]">
      <AdminSidebar />
      <main className="lg:ml-64 pt-14 lg:pt-0">
        <div className="max-w-5xl mx-auto p-3 sm:p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
