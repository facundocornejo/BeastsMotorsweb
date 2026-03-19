import type { Vehicle } from "@/types";
import VehicleCard from "./vehicle-card";

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
