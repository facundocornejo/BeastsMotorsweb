"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { VEHICLE_TYPES, SORT_OPTIONS, POPULAR_BRANDS } from "@/lib/constants";
import { trackFilterApplied } from "@/lib/utils/analytics";

interface VehicleFiltersProps {
  basePath?: string;
  typeOptions?: { value: string; label: string }[];
  showTypeFilter?: boolean;
}

export default function VehicleFilters({
  basePath = "/vehiculos",
  typeOptions,
  showTypeFilter = true,
}: VehicleFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const types = typeOptions || VEHICLE_TYPES;
  const currentType = searchParams.get("type") || "";
  const currentBrand = searchParams.get("brand") || "";
  const currentSort = searchParams.get("sort") || "newest";
  const currentSearch = searchParams.get("search") || "";

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
        trackFilterApplied(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${basePath}?${params.toString()}`);
    },
    [router, searchParams, basePath]
  );

  function clearAll() {
    router.push(basePath);
  }

  const hasFilters = currentType || currentBrand || currentSearch;

  const filterContent = (
    <div className="flex flex-col gap-4">
      {/* Type chips */}
      {showTypeFilter && (
        <div>
          <label className="text-xs font-semibold text-dark-700 uppercase tracking-wider mb-2 block">
            Tipo
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => updateParams("type", "")}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                !currentType
                  ? "bg-blue-deep text-white"
                  : "bg-cream text-dark-800 hover:bg-gray-300"
              }`}
            >
              Todos
            </button>
            {types.map((t) => (
              <button
                key={t.value}
                onClick={() => updateParams("type", t.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  currentType === t.value
                    ? "bg-blue-deep text-white"
                    : "bg-cream text-dark-800 hover:bg-gray-300"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

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
          {POPULAR_BRANDS.map((b) => (
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
        className="md:hidden flex items-center gap-2 px-4 py-2 text-sm font-medium text-dark-600 bg-[var(--white)] border border-gray-200 rounded-[var(--radius-sm)] mb-4"
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
