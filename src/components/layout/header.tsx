import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { buildGeneralWhatsAppLink } from "@/lib/utils/whatsapp";
import MobileMenu from "./mobile-menu";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/vehiculos", label: "Vehículos" },
  { href: "/motos", label: "Motos" },
  { href: "/next-generation", label: "Next Generation" },
  { href: "/planes", label: "Planes" },
  { href: "/gestoria", label: "Gestoría" },
  { href: "/nosotros", label: "Nosotros" },
];

export default function Header() {
  const waLink = buildGeneralWhatsAppLink();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logobesatstmotor.png"
            alt="Beast Motors"
            width={48}
            height={48}
            className="h-10 w-auto"
            priority
          />
          <span className="font-display text-xl font-bold text-blue-deep">
            Beast Motors
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-dark-600 hover:text-blue-deep transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social + WhatsApp CTA (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://www.instagram.com/beastmotors.oficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-600 hover:text-blue-deep transition-colors"
            aria-label="Instagram de Beast Motors"
          >
            <Instagram className="w-5 h-5" aria-hidden="true" />
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-deep text-white text-sm font-medium px-4 py-2 rounded-[var(--radius-sm)] hover:bg-blue-mid transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-green-wa" />
            Consultanos
          </a>
        </div>

        {/* Mobile menu */}
        <MobileMenu links={NAV_LINKS} waLink={waLink} />
      </div>
    </header>
  );
}
