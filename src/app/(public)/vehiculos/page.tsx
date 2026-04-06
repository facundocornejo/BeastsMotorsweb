import { Suspense } from "react";
import { getAvailableVehicles } from "@/lib/supabase/queries";
import type { VehicleFilters } from "@/types";
import VehicleGrid from "@/components/vehicles/vehicle-grid";
import VehicleFiltersComponent from "@/components/vehicles/vehicle-filters";
import { catalogImageUrl } from "@/lib/cloudinary/config";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vehículos",
  description:
    "Explorá nuestro catálogo de autos usados, 0km, motos y vehículos importados en Paraná, Entre Ríos.",
};

interface CatalogPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;

  const filters: VehicleFilters = {
    type: params.type as VehicleFilters["type"],
    brand: params.brand,
    min_price: params.min_price ? Number(params.min_price) : undefined,
    max_price: params.max_price ? Number(params.max_price) : undefined,
    min_year: params.min_year ? Number(params.min_year) : undefined,
    max_year: params.max_year ? Number(params.max_year) : undefined,
    sort: (params.sort as VehicleFilters["sort"]) || "newest",
    search: params.search,
  };

  const vehicles = await getAvailableVehicles(filters);

  // Preload first vehicle image for faster LCP
  const firstImage = vehicles[0]?.images[0];
  const preloadUrl = firstImage?.public_id
    ? catalogImageUrl(firstImage.public_id)
    : firstImage?.url;

  return (
    <>
      {preloadUrl && (
        <link
          rel="preload"
          as="image"
          href={preloadUrl}
          fetchPriority="high"
        />
      )}
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold text-dark-900 mb-2">
        Vehículos
      </h1>
      <p className="text-sm text-dark-700 mb-6">
        {vehicles.length} vehículo{vehicles.length !== 1 ? "s" : ""} disponible
        {vehicles.length !== 1 ? "s" : ""}
      </p>

      <h2 className="sr-only">Resultados del catálogo</h2>
      <div className="md:flex gap-8">
        {/* Filters sidebar */}
        <aside className="md:w-56 shrink-0 mb-6 md:mb-0">
          <Suspense>
            <VehicleFiltersComponent />
          </Suspense>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <VehicleGrid vehicles={vehicles} />
        </div>
      </div>
    </div>
    </>
  );
}
