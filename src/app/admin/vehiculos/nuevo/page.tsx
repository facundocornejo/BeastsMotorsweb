"use client";

import { useRouter } from "next/navigation";
import VehicleForm from "@/components/admin/vehicle-form";

export default function NewVehiclePage() {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark-900 mb-6">Nuevo vehículo</h1>
      <div className="bg-white rounded-[var(--radius)] p-6 shadow-sm">
        <VehicleForm onSuccess={() => router.push("/admin/vehiculos")} />
      </div>
    </div>
  );
}
