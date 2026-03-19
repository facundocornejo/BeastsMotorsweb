"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema, type VehicleFormData } from "@/lib/validators/vehicle";
import { VEHICLE_TYPES, FUEL_TYPES, TRANSMISSIONS, POPULAR_BRANDS } from "@/lib/constants";
import type { Vehicle, VehicleImage } from "@/types";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import ImageUploader from "./image-uploader";

interface VehicleFormProps {
  initialData?: Vehicle;
  onSuccess: () => void;
}

const brandOptions = [
  ...POPULAR_BRANDS.map((b) => ({ value: b, label: b })),
  { value: "__other__", label: "Otra..." },
];

export default function VehicleForm({ initialData, onSuccess }: VehicleFormProps) {
  const isEdit = !!initialData;
  const [images, setImages] = useState<VehicleImage[]>(initialData?.images || []);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [customBrand, setCustomBrand] = useState(() => {
    if (!initialData) return false;
    return !POPULAR_BRANDS.includes(initialData.brand as typeof POPULAR_BRANDS[number]);
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<VehicleFormData>({
    // Zod v4 resolver type mismatch with react-hook-form — safe cast
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(vehicleSchema) as any,
    defaultValues: initialData
      ? {
          brand: POPULAR_BRANDS.includes(initialData.brand as typeof POPULAR_BRANDS[number])
            ? initialData.brand
            : "__other__",
          model: initialData.model,
          version: initialData.version || "",
          year: initialData.year,
          mileage: initialData.mileage,
          price_usd: initialData.price_usd,
          fuel_type: initialData.fuel_type,
          transmission: initialData.transmission,
          vehicle_type: initialData.vehicle_type,
          description: initialData.description || "",
          is_featured: initialData.is_featured,
          is_new_arrival: initialData.is_new_arrival,
          financing_available: initialData.financing_available,
        }
      : {
          mileage: 0,
          is_featured: false,
          is_new_arrival: false,
          financing_available: false,
        },
  });

  const selectedBrand = watch("brand");

  async function onSubmit(data: VehicleFormData) {
    setSubmitting(true);
    setError("");

    const brandValue = customBrand || data.brand === "__other__" ? data.brand : data.brand;
    const payload = {
      ...data,
      brand: brandValue === "__other__" ? "" : brandValue,
      images,
    };

    try {
      const url = isEdit ? `/api/vehiculos/${initialData.id}` : "/api/vehiculos";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Error al guardar");
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left column */}
        <div className="flex flex-col gap-4">
          {customBrand ? (
            <div className="flex flex-col gap-1">
              <Input
                label="Marca"
                {...register("brand")}
                error={errors.brand?.message}
                placeholder="Ej: Geely, BYD..."
              />
              <button
                type="button"
                onClick={() => {
                  setCustomBrand(false);
                  setValue("brand", "");
                }}
                className="text-xs text-blue-mid hover:underline self-start"
              >
                Elegir de la lista
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <Select
                label="Marca"
                options={brandOptions}
                {...register("brand", {
                  onChange: (e) => {
                    if (e.target.value === "__other__") {
                      setCustomBrand(true);
                      setValue("brand", "");
                    }
                  },
                })}
                error={errors.brand?.message}
                placeholder="Seleccionar marca"
              />
            </div>
          )}

          <Input
            label="Modelo"
            {...register("model")}
            error={errors.model?.message}
            placeholder="Ej: Corolla, Amarok..."
          />

          <Input
            label="Versión (opcional)"
            {...register("version")}
            placeholder="Ej: XEi 2.0 CVT"
          />

          <Input
            label="Año"
            type="number"
            {...register("year")}
            error={errors.year?.message}
          />

          <Input
            label="Kilometraje"
            type="number"
            {...register("mileage")}
            error={errors.mileage?.message}
          />

          <Input
            label="Precio (USD)"
            type="number"
            step="0.01"
            {...register("price_usd")}
            error={errors.price_usd?.message}
          />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          <Select
            label="Tipo"
            options={VEHICLE_TYPES.map((t) => ({ value: t.value, label: t.label }))}
            {...register("vehicle_type")}
            error={errors.vehicle_type?.message}
            placeholder="Seleccionar tipo"
          />

          <Select
            label="Combustible"
            options={FUEL_TYPES.map((f) => ({ value: f.value, label: f.label }))}
            {...register("fuel_type")}
            error={errors.fuel_type?.message}
            placeholder="Seleccionar combustible"
          />

          <Select
            label="Transmisión"
            options={TRANSMISSIONS.map((t) => ({ value: t.value, label: t.label }))}
            {...register("transmission")}
            error={errors.transmission?.message}
            placeholder="Seleccionar transmisión"
          />

          <Textarea
            label="Descripción (opcional)"
            {...register("description")}
            placeholder="Detalles adicionales del vehículo..."
            rows={4}
          />

          <div className="flex flex-col gap-3 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("is_featured")}
                className="w-4 h-4 rounded border-gray-200 text-blue-deep focus:ring-blue-mid"
              />
              <span className="text-sm text-dark-700">Destacado</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("is_new_arrival")}
                className="w-4 h-4 rounded border-gray-200 text-blue-deep focus:ring-blue-mid"
              />
              <span className="text-sm text-dark-700">Recién ingresado</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("financing_available")}
                className="w-4 h-4 rounded border-gray-200 text-blue-deep focus:ring-blue-mid"
              />
              <span className="text-sm text-dark-700">Financiación disponible</span>
            </label>
          </div>
        </div>
      </div>

      {/* Image uploader */}
      <ImageUploader images={images} onChange={setImages} />

      {error && <p className="text-sm text-rose">{error}</p>}

      <div className="flex justify-end">
        <Button type="submit" loading={submitting}>
          {isEdit ? "Actualizar vehículo" : "Guardar vehículo"}
        </Button>
      </div>
    </form>
  );
}
