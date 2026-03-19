"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Vehicle } from "@/types";
import VehicleForm from "@/components/admin/vehicle-form";

export default function EditVehiclePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetch() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setVehicle(data as Vehicle);
      }
      setLoading(false);
    }
    fetch();
  }, [id]);

  if (loading) {
    return <p className="text-sm text-gray-400 py-8 text-center">Cargando...</p>;
  }

  if (notFound || !vehicle) {
    return (
      <div className="text-center py-12">
        <p className="text-dark-600 mb-4">Vehículo no encontrado</p>
        <button
          onClick={() => router.push("/admin/vehiculos")}
          className="text-sm text-blue-mid hover:underline"
        >
          Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/admin/vehiculos"
        className="inline-flex items-center gap-1.5 text-sm text-dark-600 hover:text-dark-900 mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver
      </Link>
      <h1 className="text-xl sm:text-2xl font-bold text-dark-900 mb-6">Editar vehículo</h1>
      <div className="bg-white rounded-[var(--radius)] p-4 sm:p-6 shadow-sm">
        <VehicleForm
          initialData={vehicle}
          onSuccess={() => router.push("/admin/vehiculos")}
        />
      </div>
    </div>
  );
}
