"use client";

import { useState } from "react";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";
import { buildSellWhatsAppLink } from "@/lib/utils/whatsapp";

const CONDITION_OPTIONS = [
  { value: "Muy bueno", label: "Muy bueno" },
  { value: "Bueno", label: "Bueno" },
  { value: "Normal", label: "Normal" },
  { value: "Por debajo de lo normal", label: "Por debajo de lo normal" },
  { value: "No sé", label: "No sé" },
] as const;

const TRANSMISSION_OPTIONS = [
  { value: "Manual", label: "Manual" },
  { value: "Automático", label: "Automático" },
  { value: "CVT", label: "CVT" },
] as const;

export default function SellForm() {
  const [open, setOpen] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [transmission, setTransmission] = useState("");
  const [condition, setCondition] = useState("");
  const [comment, setComment] = useState("");

  const isValid = brand && model && year && mileage && transmission && condition;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    const link = buildSellWhatsAppLink({
      brand,
      model,
      year,
      mileage,
      transmission,
      condition,
      comment,
    });

    window.open(link, "_blank", "noopener,noreferrer");
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 bg-rose text-white font-medium px-6 py-3 rounded-[var(--radius-sm)] hover:bg-rose-dark transition-colors"
      >
        <span className="w-2 h-2 rounded-full bg-green-wa" />
        Quiero vender mi auto
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-[var(--radius)] p-6 shadow-sm">
      <p className="text-sm font-semibold text-dark-900 mb-4">
        Completá los datos de tu vehículo
      </p>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Marca"
            placeholder="Ej: Toyota"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
          <Input
            label="Modelo"
            placeholder="Ej: Corolla"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Año"
            type="number"
            placeholder="Ej: 2020"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            min={1990}
            max={2030}
            required
          />
          <Input
            label="Kilometraje"
            type="number"
            placeholder="Ej: 45000"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            min={0}
            required
          />
        </div>

        <Select
          label="Transmisión"
          placeholder="Seleccioná"
          options={TRANSMISSION_OPTIONS}
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
          required
        />

        <Select
          label="Estado del vehículo"
          placeholder="Seleccioná"
          options={CONDITION_OPTIONS}
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          required
        />

        <Textarea
          label="Comentario (opcional)"
          placeholder="Ej: Único dueño, service al día..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={2}
        />

        <div className="flex gap-3 mt-1">
          <Button type="submit" disabled={!isValid} className="flex-1">
            <span className="w-2 h-2 rounded-full bg-green-wa" />
            Enviar por WhatsApp
          </Button>
          <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  );
}
