import Link from "next/link";
import type { Vehicle } from "@/types";
import VehicleCard from "./vehicle-card";
import { buildGeneralWhatsAppLink } from "@/lib/utils/whatsapp";

interface VehicleGridProps {
  vehicles: Vehicle[];
  emptyMessage?: string;
}

export default function VehicleGrid({
  vehicles,
  emptyMessage = "No se encontraron vehículos",
}: VehicleGridProps) {
  if (vehicles.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-400 text-sm">{emptyMessage}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/vehiculos"
            className="inline-flex items-center justify-center text-sm font-medium px-4 py-2 rounded-[var(--radius-sm)] bg-blue-deep text-white hover:bg-blue-mid transition-colors"
          >
            Ver todos los vehículos
          </Link>
          <a
            href={buildGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-[var(--radius-sm)] border border-gray-300 text-dark-900 hover:bg-cream transition-colors"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle, index) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} priority={index === 0} />
      ))}
    </div>
  );
}
