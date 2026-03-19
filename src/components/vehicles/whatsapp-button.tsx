"use client";

import { trackWhatsAppClick } from "@/lib/utils/analytics";

interface WhatsAppButtonProps {
  href: string;
  vehicleName: string;
  className?: string;
  children: React.ReactNode;
}

export default function WhatsAppButton({
  href,
  vehicleName,
  className,
  children,
}: WhatsAppButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(vehicleName)}
      className={className}
    >
      {children}
    </a>
  );
}
