"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import VehicleForm from "@/components/admin/vehicle-form";

export default function NewVehiclePage() {
  const router = useRouter();

  return (
    <div>
      <Link
        href="/admin/vehiculos"
        className="inline-flex items-center gap-1.5 text-sm text-dark-600 hover:text-dark-900 mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver
      </Link>
      <h1 className="text-xl sm:text-2xl font-bold text-dark-900 mb-6">Nuevo vehículo</h1>
      <div className="bg-white rounded-[var(--radius)] p-4 sm:p-6 shadow-sm">
        <VehicleForm onSuccess={() => router.push("/admin/vehiculos")} />
      </div>
    </div>
  );
}
