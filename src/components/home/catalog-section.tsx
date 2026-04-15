import Link from "next/link";
import type { Vehicle } from "@/types";
import VehicleGrid from "@/components/vehicles/vehicle-grid";

interface CatalogSectionProps {
  vehicles: Vehicle[];
}

export default function CatalogSection({ vehicles }: CatalogSectionProps) {
  return (
    <section className="py-12 md:py-16 bg-cream-soft">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl md:text-3xl text-dark-900">
            Nuestro Stock
          </h2>
          <Link
            href="/vehiculos"
            className="text-sm font-medium text-blue-deep hover:text-blue-mid transition-colors"
          >
            Ver todo →
          </Link>
        </div>
        <VehicleGrid
          vehicles={vehicles.slice(0, 6)}
          emptyMessage="Próximamente nuevos vehículos"
        />
      </div>
    </section>
  );
}
