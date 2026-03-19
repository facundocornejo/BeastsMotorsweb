"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { HappySale, VehicleImage } from "@/types";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import ImageUploader from "@/components/admin/image-uploader";

export default function AdminHappySalesPage() {
  const supabase = createClient();
  const [sales, setSales] = useState<HappySale[]>([]);
  const [loading, setLoading] = useState(true);

  // New sale form
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newImages, setNewImages] = useState<VehicleImage[]>([]);
  const [saving, setSaving] = useState(false);

  // Delete
  const [deleteTarget, setDeleteTarget] = useState<HappySale | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchSales = useCallback(async () => {
    const { data } = await supabase
      .from("happy_sales")
      .select("*")
      .order("created_at", { ascending: false });
    setSales((data as HappySale[]) || []);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  async function handleCreate() {
    if (!newTitle.trim()) return;
    setSaving(true);

    const res = await fetch("/api/ventas-felices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicle_title: newTitle,
        images: newImages,
      }),
    });

    if (res.ok) {
      const sale = await res.json();
      setSales((prev) => [sale, ...prev]);
      setNewTitle("");
      setNewImages([]);
      setShowForm(false);
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleteLoading(true);

    await fetch(`/api/ventas-felices/${deleteTarget.id}`, { method: "DELETE" });
    setSales((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    setDeleteTarget(null);
    setDeleteLoading(false);
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-dark-900">Ventas Felices</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancelar" : "+ Nueva venta feliz"}
        </Button>
      </div>

      {/* Inline create form */}
      {showForm && (
        <div className="bg-white rounded-[var(--radius)] p-4 sm:p-6 shadow-sm mb-6">
          <div className="flex flex-col gap-4">
            <Input
              label="Título del vehículo vendido"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Ej: Toyota Corolla XEi 2023"
            />
            <ImageUploader
              images={newImages}
              onChange={setNewImages}
              folder="happy-sales"
              maxImages={3}
            />
            <div className="flex justify-end">
              <Button onClick={handleCreate} loading={saving} disabled={!newTitle.trim()}>
                Guardar
              </Button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-gray-400 py-8 text-center">Cargando...</p>
      ) : sales.length === 0 ? (
        <p className="text-sm text-gray-400 py-8 text-center">
          No hay ventas felices registradas
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sales.map((sale) => (
            <div
              key={sale.id}
              className="bg-white rounded-[var(--radius)] shadow-sm overflow-hidden"
            >
              {sale.images[0] && (
                <img
                  src={sale.images[0].url}
                  alt={sale.vehicle_title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <p className="font-medium text-dark-900 text-sm">{sale.vehicle_title}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(sale.created_at).toLocaleDateString("es-AR")}
                </p>
                <div className="mt-3 flex justify-end">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setDeleteTarget(sale)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        title="Eliminar venta feliz"
        message={deleteTarget ? `¿Eliminar "${deleteTarget.vehicle_title}"?` : ""}
        confirmLabel="Eliminar"
        variant="danger"
        isOpen={!!deleteTarget}
        loading={deleteLoading}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
