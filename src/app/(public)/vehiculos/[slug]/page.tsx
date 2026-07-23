import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getVehicleBySlug, getRelatedVehicles } from "@/lib/supabase/queries";
import { vehicleMetadata, vehicleJsonLd, breadcrumbJsonLd } from "@/lib/utils/seo";
import JsonLd from "@/components/seo/json-ld";
import VehicleGallery from "@/components/vehicles/vehicle-gallery";
import VehicleInfo from "@/components/vehicles/vehicle-info";
import VehicleGrid from "@/components/vehicles/vehicle-grid";
import VehicleViewTracker from "@/components/vehicles/vehicle-view-tracker";
import { vehicleTitle } from "@/lib/utils/format";

export const revalidate = 60;

interface VehicleDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: VehicleDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return { title: "Vehículo no encontrado" };
  return vehicleMetadata(vehicle);
}

export default async function VehicleDetailPage({
  params,
}: VehicleDetailProps) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) notFound();

  const related = await getRelatedVehicles(vehicle);
  const title = vehicleTitle(vehicle.brand, vehicle.model, vehicle.version, vehicle.year);
  const isMoto = vehicle.vehicle_type === "moto";
  const catalog = isMoto
    ? { name: "Motos", path: "/motos" }
    : { name: "Vehículos", path: "/vehiculos" };
  const breadcrumbs = [
    { name: "Inicio", path: "/" },
    catalog,
    { name: title },
  ];

  return (
    <>
      <JsonLd data={vehicleJsonLd(vehicle)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <VehicleViewTracker vehicleName={title} vehicleType={vehicle.vehicle_type} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav aria-label="Ruta de navegación" className="mb-4 text-sm text-dark-600">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-blue-light transition-colors">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link href={catalog.path} className="hover:text-blue-light transition-colors">
                {catalog.name}
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page" className="text-dark-900 font-medium truncate max-w-[60vw] md:max-w-none">
              {title}
            </li>
          </ol>
        </nav>

        <div className="md:flex gap-8">
          {/* Gallery */}
          <div className="md:w-3/5 mb-6 md:mb-0">
            <VehicleGallery images={vehicle.images} alt={title} />
          </div>

          {/* Info */}
          <div className="md:w-2/5">
            <VehicleInfo vehicle={vehicle} />
          </div>
        </div>

        {/* Related vehicles */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl text-dark-900 mb-6">
              También te puede interesar
            </h2>
            <VehicleGrid vehicles={related} />
          </div>
        )}
      </div>
    </>
  );
}
