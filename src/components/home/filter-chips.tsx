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
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {CHIPS.map((chip) => (
        <button
          key={chip.label}
          onClick={() => router.push(chip.href)}
          className="shrink-0 px-4 py-2 text-sm font-medium rounded-full border border-gray-200 text-dark-600 bg-white hover:bg-blue-deep hover:text-white hover:border-blue-deep transition-colors"
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
