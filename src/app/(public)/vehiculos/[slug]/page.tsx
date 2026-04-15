import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getVehicleBySlug, getRelatedVehicles } from "@/lib/supabase/queries";
import { vehicleMetadata, vehicleJsonLd } from "@/lib/utils/seo";
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
  const jsonLd = vehicleJsonLd(vehicle);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VehicleViewTracker vehicleName={title} vehicleType={vehicle.vehicle_type} />

      <div className="max-w-7xl mx-auto px-4 py-8">
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
