"use client";

import { useState } from "react";
import type { Vehicle, VehicleImage } from "@/types";
import { vehicleTitle } from "@/lib/utils/format";
import Button from "@/components/ui/button";
import ImageUploader from "./image-uploader";

interface MarkSoldDialogProps {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (opts: { createHappySale: boolean; happySaleImages: VehicleImage[] }) => void;
  loading?: boolean;
}

export default function MarkSoldDialog({
  vehicle,
  isOpen,
  onClose,
  onConfirm,
  loading,
}: MarkSoldDialogProps) {
  const [createHappySale, setCreateHappySale] = useState(true);
  const [happySaleImages, setHappySaleImages] = useState<VehicleImage[]>([]);

  if (!isOpen) return null;

  const title = vehicleTitle(vehicle.brand, vehicle.model, vehicle.version, vehicle.year);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-[var(--radius)] p-4 sm:p-6 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-dark-900 mb-2">
          Marcar como vendido
        </h3>
        <p className="text-sm text-dark-600 mb-4">
          ¿Marcar <strong>{title}</strong> como vendido?
        </p>

        <label className="flex items-center gap-2 cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={createHappySale}
            onChange={(e) => setCreateHappySale(e.target.checked)}
            className="w-4 h-4 rounded border-gray-200 text-blue-deep focus:ring-blue-mid"
          />
          <span className="text-sm text-dark-700">Crear venta feliz</span>
        </label>

        {createHappySale && (
          <div className="mb-4">
            <ImageUploader
              images={happySaleImages}
              onChange={setHappySaleImages}
              folder="happy-sales"
              maxImages={3}
            />
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            onClick={() => onConfirm({ createHappySale, happySaleImages })}
            loading={loading}
          >
            Confirmar venta
          </Button>
        </div>
      </div>
    </div>
  );
}
