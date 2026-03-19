"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Car, PartyPopper, LogOut, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { href: "/admin/vehiculos", label: "Vehículos", icon: Car },
  { href: "/admin/ventas-felices", label: "Ventas Felices", icon: PartyPopper },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  const navContent = (
    <>
      <div className="p-6 border-b border-gray-200">
        <h2 className="font-display text-lg font-bold text-blue-deep">
          Beast Motors
        </h2>
        <p className="text-xs text-gray-400 mt-1">Panel de administración</p>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-deep/10 text-blue-deep"
                  : "text-dark-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 flex flex-col gap-1">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-sm text-dark-600 hover:bg-gray-100 rounded-[var(--radius-sm)] transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Ver sitio
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-dark-600 hover:bg-gray-100 rounded-[var(--radius-sm)] transition-colors text-left"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 -ml-1 text-dark-700"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <span className="font-display text-sm font-bold text-blue-deep">Beast Motors</span>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 flex flex-col transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navContent}
      </aside>
    </>
  );
}
