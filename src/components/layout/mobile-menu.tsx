"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Instagram } from "lucide-react";

interface MobileMenuProps {
  links: { href: string; label: string }[];
  waLink: string;
}

export default function MobileMenu({ links, waLink }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-dark-700"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />
          <div className="fixed top-16 left-0 right-0 bg-white z-50 border-b border-gray-200 shadow-lg">
            <nav className="flex flex-col p-4 gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-blue-deep/10 text-blue-deep"
                      : "text-dark-600 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 bg-blue-deep text-white text-sm font-medium px-4 py-2.5 rounded-[var(--radius-sm)]"
              >
                <span className="w-2 h-2 rounded-full bg-green-wa" />
                Consultanos por WhatsApp
              </a>
              <a
                href="https://www.instagram.com/beastmotors.oficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-sm font-medium text-dark-600 px-4 py-2.5"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
                @beastmotors.oficial
              </a>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
