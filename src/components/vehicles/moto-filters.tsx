"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { SORT_OPTIONS } from "@/lib/constants";
import { trackFilterApplied } from "@/lib/utils/analytics";

const MOTO_BRANDS = [
  "Honda",
  "Yamaha",
  "Motomel",
  "Corven",
  "Gilera",
  "Zanella",
  "Keller",
  "Mondial",
  "Kawasaki",
  "Suzuki",
  "Bajaj",
  "TVS Motor Company",
  "Hero MotoCorp",
  "Royal Enfield",
  "CFMoto",
  "Voge",
  "Benelli",
  "Zontes",
  "Keeway",
  "Kiden",
  "BMW Motorrad",
  "KTM",
  "Husqvarna",
  "Ducati",
  "Triumph",
  "Aprilia",
  "Harley-Davidson",
  "Indian Motorcycle",
  "Super Soco",
  "Sunra",
] as const;

const CONDITION_OPTIONS = [
  { value: "", label: "Todas" },
  { value: "0km", label: "0 Km" },
  { value: "usado", label: "Usadas" },
];

export default function MotoFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentCondition = searchParams.get("condition") || "";
  const currentBrand = searchParams.get("brand") || "";
  const currentSort = searchParams.get("sort") || "newest";

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
        trackFilterApplied(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/motos?${params.toString()}`);
    },
    [router, searchParams]
  );

  function clearAll() {
    router.push("/motos");
  }

  const hasFilters = currentCondition || currentBrand;

  const filterContent = (
    <div className="flex flex-col gap-4">
      {/* Condition chips */}
      <div>
        <label className="text-xs font-semibold text-dark-700 uppercase tracking-wider mb-2 block">
          Condición
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CONDITION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateParams("condition", opt.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                currentCondition === opt.value
                  ? "bg-blue-deep text-white"
                  : "bg-cream text-dark-800 hover:bg-gray-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <label className="text-xs font-semibold text-dark-700 uppercase tracking-wider mb-2 block">
          Marca
        </label>
        <select
          value={currentBrand}
          onChange={(e) => updateParams("brand", e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-gray-300 bg-cream-soft text-dark-900"
        >
          <option value="">Todas las marcas</option>
          {MOTO_BRANDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div>
        <label className="text-xs font-semibold text-dark-700 uppercase tracking-wider mb-2 block">
          Ordenar
        </label>
        <select
          value={currentSort}
          onChange={(e) => updateParams("sort", e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-gray-300 bg-cream-soft text-dark-900"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {hasFilters && (
        <button
          onClick={clearAll}
          className="text-sm text-rose hover:text-rose-dark transition-colors"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden flex items-center gap-2 px-4 py-2 text-sm font-medium text-dark-600 bg-white border border-gray-200 rounded-[var(--radius-sm)] mb-4"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filtros
        {hasFilters && (
          <span className="w-2 h-2 rounded-full bg-rose" />
        )}
      </button>

      {/* Mobile filter panel */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-cream-soft z-50 rounded-t-2xl p-6 max-h-[70vh] overflow-y-auto md:hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-dark-900">Filtros</h3>
              <button onClick={() => setMobileOpen(false)} className="text-dark-600">✕</button>
            </div>
            {filterContent}
          </div>
        </>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:block">{filterContent}</div>
    </>
  );
}
