"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Vehicle } from "@/types";
import { vehicleTitle, formatPrice } from "@/lib/utils/format";
import Button from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import MarkSoldDialog from "@/components/admin/mark-sold-dialog";

type Tab = "all" | "active" | "sold";

export default function AdminVehiclesPage() {
  const supabase = createClient();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("active");

  // Dialog state
  const [deleteTarget, setDeleteTarget] = useState<Vehicle | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [soldTarget, setSoldTarget] = useState<Vehicle | null>(null);
  const [soldLoading, setSoldLoading] = useState(false);

  const fetchVehicles = useCallback(async () => {
    const { data } = await supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false });
    setVehicles((data as Vehicle[]) || []);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const filtered = vehicles.filter((v) => {
    if (tab === "active") return !v.is_sold;
    if (tab === "sold") return v.is_sold;
    return true;
  });

  async function toggleField(id: string, field: "is_featured" | "is_new_arrival", current: boolean) {
    await fetch(`/api/vehiculos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: !current }),
    });
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: !current } : v))
    );
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    await fetch(`/api/vehiculos/${deleteTarget.id}`, { method: "DELETE" });
    setVehicles((prev) => prev.filter((v) => v.id !== deleteTarget.id));
    setDeleteTarget(null);
    setDeleteLoading(false);
  }

  async function handleMarkSold(opts: { createHappySale: boolean; happySaleImages: { url: string; public_id: string; order: number }[] }) {
    if (!soldTarget) return;
    setSoldLoading(true);

    await fetch(`/api/vehiculos/${soldTarget.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_sold: true }),
    });

    if (opts.createHappySale) {
      const title = vehicleTitle(soldTarget.brand, soldTarget.model, soldTarget.version, soldTarget.year);
      await fetch("/api/ventas-felices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicle_title: title,
          images: opts.happySaleImages,
        }),
      });
    }

    setVehicles((prev) =>
      prev.map((v) => (v.id === soldTarget.id ? { ...v, is_sold: true } : v))
    );
    setSoldTarget(null);
    setSoldLoading(false);
  }

  const tabs: { value: Tab; label: string }[] = [
    { value: "active", label: "En venta" },
    { value: "sold", label: "Vendidos" },
    { value: "all", label: "Todos" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark-900">Vehículos</h1>
        <Link href="/admin/vehiculos/nuevo">
          <Button>+ Nuevo vehículo</Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-gray-100 rounded-[var(--radius-sm)] p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`px-3 py-1.5 text-sm font-medium rounded-[var(--radius-sm)] transition-colors ${
              tab === t.value
                ? "bg-white text-dark-900 shadow-sm"
                : "text-dark-600 hover:text-dark-900"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-gray-400 py-8 text-center">Cargando...</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-gray-400 py-8 text-center">No hay vehículos</p>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((vehicle) => {
            const title = vehicleTitle(vehicle.brand, vehicle.model, vehicle.version, vehicle.year);
            const thumb = vehicle.images[0]?.url;

            return (
              <div
                key={vehicle.id}
                className="bg-white rounded-[var(--radius)] p-4 shadow-sm flex gap-4 items-center"
              >
                {/* Thumbnail */}
                <div className="w-20 h-15 rounded-[var(--radius-sm)] overflow-hidden bg-gray-100 shrink-0">
                  {thumb ? (
                    <img src={thumb} alt={title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                      Sin foto
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-dark-900 truncate">{title}</p>
                  <p className="text-sm text-dark-600">{formatPrice(vehicle.price_usd)}</p>
                  <div className="flex gap-1.5 mt-1 flex-wrap">
                    {vehicle.is_sold && <Badge variant="danger">Vendido</Badge>}
                    {vehicle.is_featured && <Badge variant="info">Destacado</Badge>}
                    {vehicle.is_new_arrival && <Badge variant="success">Nuevo</Badge>}
                    <Badge>{vehicle.vehicle_type}</Badge>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 shrink-0 flex-wrap justify-end">
                  <Link href={`/admin/vehiculos/${vehicle.id}`}>
                    <Button variant="ghost" size="sm">Editar</Button>
                  </Link>

                  {!vehicle.is_sold && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleField(vehicle.id, "is_featured", vehicle.is_featured)}
                      >
                        {vehicle.is_featured ? "★" : "☆"}
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSoldTarget(vehicle)}
                      >
                        Vendido
                      </Button>
                    </>
                  )}

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setDeleteTarget(vehicle)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete dialog */}
      <ConfirmDialog
        title="Eliminar vehículo"
        message={deleteTarget ? `¿Eliminar "${vehicleTitle(deleteTarget.brand, deleteTarget.model, deleteTarget.version, deleteTarget.year)}" permanentemente?` : ""}
        confirmLabel="Eliminar"
        variant="danger"
        isOpen={!!deleteTarget}
        loading={deleteLoading}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />

      {/* Mark sold dialog */}
      {soldTarget && (
        <MarkSoldDialog
          vehicle={soldTarget}
          isOpen={!!soldTarget}
          onClose={() => setSoldTarget(null)}
          onConfirm={handleMarkSold}
          loading={soldLoading}
        />
      )}
    </div>
  );
}
