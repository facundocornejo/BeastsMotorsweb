"use client";

import AdminSidebar from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream-bg">
      <AdminSidebar />
      <main className="lg:ml-64 pt-14 lg:pt-0">
        <div className="max-w-5xl mx-auto p-3 sm:p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
