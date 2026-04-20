import { Suspense } from "react";
import type { Metadata } from "next";
import { getAvailableVehicles } from "@/lib/supabase/queries";
import type { VehicleFilters } from "@/types";
import VehicleGrid from "@/components/vehicles/vehicle-grid";
import MotoFilters from "@/components/vehicles/moto-filters";
import { buildGeneralWhatsAppLink } from "@/lib/utils/whatsapp";
import { catalogImageUrl } from "@/lib/cloudinary/config";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://beastmotors.com.ar";

export const metadata: Metadata = {
  title: "Motos Usadas y 0km — Beast Motors Paraná",
  description:
    "Motos usadas y 0km seleccionadas en Paraná, Entre Ríos. Encontrá tu próxima moto con financiación y gestoría propia.",
  openGraph: {
    title: "Motos Usadas y 0km — Beast Motors Paraná",
    description:
      "Motos usadas y 0km seleccionadas en Paraná, Entre Ríos. Encontrá tu próxima moto con financiación y gestoría propia.",
    url: `${SITE_URL}/motos`,
    // TODO: reemplazar con banner OG dedicado cuando esté disponible
    images: [{ url: `${SITE_URL}/logotransparente.png`, width: 800, height: 800 }],
  },
};

interface MotosPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function MotosPage({ searchParams }: MotosPageProps) {
  const params = await searchParams;
  const waLink = buildGeneralWhatsAppLink();

  const filters: VehicleFilters = {
    type: "moto",
    brand: params.brand,
    sort: (params.sort as VehicleFilters["sort"]) || "newest",
  };

  let vehicles = await getAvailableVehicles(filters);

  // Sub-filter by condition (0km vs usado based on mileage)
  const condition = params.condition;
  if (condition === "0km") {
    vehicles = vehicles.filter((v) => v.mileage === 0);
  } else if (condition === "usado") {
    vehicles = vehicles.filter((v) => v.mileage > 0);
  }

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
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero */}
        <section className="py-10 md:py-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-rose mb-2">
            Beast Motors
          </p>
          <h1 className="font-display text-3xl md:text-5xl text-dark-900 mb-4">
            Motos
          </h1>
          <p className="text-dark-700 max-w-2xl mx-auto mb-6">
            Motos usadas y 0km seleccionadas, revisadas y listas para rodar.
            Encontrá la moto que buscás con el respaldo de Beast Motors.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-rose text-white font-medium px-6 py-3 rounded-[var(--radius-sm)] hover:bg-rose-dark transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-green-wa" />
            Consultanos
          </a>
        </section>

        {/* Filters + Grid */}
        <section className="pb-12 md:pb-16">
          <p className="text-sm text-dark-700 mb-4">
            {vehicles.length} moto{vehicles.length !== 1 ? "s" : ""} disponible
            {vehicles.length !== 1 ? "s" : ""}
          </p>

          <div className="md:flex gap-8">
            <aside className="md:w-56 shrink-0 mb-6 md:mb-0">
              <Suspense>
                <MotoFilters />
              </Suspense>
            </aside>

            <div className="flex-1">
              <h2 className="sr-only">Motos disponibles</h2>
              <VehicleGrid
                vehicles={vehicles}
                emptyMessage="Próximamente nuevas motos en stock"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
