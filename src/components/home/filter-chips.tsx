"use client";

import { useRouter } from "next/navigation";

const CHIPS = [
  { label: "Todos", href: "/vehiculos" },
  { label: "Usados", href: "/vehiculos?type=usado" },
  { label: "0 Km", href: "/vehiculos?type=0km" },
  { label: "Motos", href: "/motos" },
  { label: "Next Generation", href: "/vehiculos?type=next-gen" },
];

export default function FilterChips() {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2">
      {CHIPS.map((chip) => (
        <button
          key={chip.label}
          onClick={() => router.push(chip.href)}
          className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full border border-gray-300 text-dark-800 bg-cream-soft hover:bg-blue-deep hover:text-white hover:border-blue-deep transition-colors"
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
