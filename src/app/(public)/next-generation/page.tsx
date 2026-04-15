import type { Metadata } from "next";
import { getAvailableVehicles } from "@/lib/supabase/queries";
import VehicleGrid from "@/components/vehicles/vehicle-grid";
import { buildGeneralWhatsAppLink } from "@/lib/utils/whatsapp";
import { catalogImageUrl } from "@/lib/cloudinary/config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Next Generation — Vehículos Importados",
  description:
    "Haval, Chery, JAC, GWM y más. Vehículos importados de última generación en Paraná, Entre Ríos.",
};

export default async function NextGenerationPage() {
  const vehicles = await getAvailableVehicles({ type: "next-gen" });
  const waLink = buildGeneralWhatsAppLink();

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
      {/* Hero banner */}
      <section className="py-12 md:py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-rose mb-2">
          Beast Motors
        </p>
        <h1 className="font-display text-3xl md:text-5xl text-dark-900 mb-4">
          Next Generation
        </h1>
        <p className="text-dark-700 max-w-2xl mx-auto mb-6">
          Descubrí la nueva generación de vehículos importados. Haval, Chery,
          JAC, GWM y más marcas con la mejor relación precio-calidad del
          mercado.
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

      {/* Vehicle grid */}
      <section className="pb-12 md:pb-16">
        <h2 className="sr-only">Vehículos Next Generation disponibles</h2>
        <VehicleGrid
          vehicles={vehicles}
          emptyMessage="Próximamente nuevos vehículos Next Generation"
        />
      </section>
    </div>
    </>
  );
}
