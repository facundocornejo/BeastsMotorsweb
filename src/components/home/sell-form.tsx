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

const CURRENT_YEAR = new Date().getFullYear();

function validateText(v: string, label: string): string | null {
  if (!v.trim()) return `${label} es requerido`;
  if (v.trim().length < 2) return `${label} debe tener al menos 2 caracteres`;
  if (/^\d+$/.test(v.trim())) return `${label} no puede ser solo números`;
  return null;
}

function validateYear(v: string): string | null {
  const n = Number(v);
  if (!v) return "El año es requerido";
  if (!Number.isInteger(n) || n < 1990 || n > CURRENT_YEAR + 1)
    return `Ingresá un año entre 1990 y ${CURRENT_YEAR + 1}`;
  return null;
}

function validateMileage(v: string): string | null {
  const n = Number(v);
  if (!v) return "El kilometraje es requerido";
  if (isNaN(n) || n < 0) return "El kilometraje no puede ser negativo";
  if (!Number.isInteger(n)) return "Ingresá un número entero";
  return null;
}

type ErrorFields = "brand" | "model" | "year" | "mileage";

export default function SellForm() {
  const [open, setOpen] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [transmission, setTransmission] = useState("");
  const [condition, setCondition] = useState("");
  const [comment, setComment] = useState("");

  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<ErrorFields, string>>>({});

  function setError(field: ErrorFields, msg: string | null) {
    setErrors((prev) => {
      const next = { ...prev };
      if (msg) next[field] = msg;
      else delete next[field];
      return next;
    });
  }

  const isValid =
    brand && model && year && mileage && transmission && condition &&
    consent &&
    Object.keys(errors).length === 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const brandErr = validateText(brand, "La marca");
    const modelErr = validateText(model, "El modelo");
    const yearErr = validateYear(year);
    const mileageErr = validateMileage(mileage);

    const newErrors: Partial<Record<ErrorFields, string>> = {};
    if (brandErr) newErrors.brand = brandErr;
    if (modelErr) newErrors.model = modelErr;
    if (yearErr) newErrors.year = yearErr;
    if (mileageErr) newErrors.mileage = mileageErr;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

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
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-cream rounded-[var(--radius)] p-6 shadow-sm border border-gray-300">
      <p className="text-sm font-semibold text-dark-900 mb-4">
        Completá los datos de tu vehículo
      </p>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Marca"
            placeholder="Ej: Toyota"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              setError("brand", null);
            }}
            onBlur={() => setError("brand", validateText(brand, "La marca"))}
            required
            error={errors.brand}
          />
          <Input
            label="Modelo"
            placeholder="Ej: Corolla"
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
              setError("model", null);
            }}
            onBlur={() => setError("model", validateText(model, "El modelo"))}
            required
            error={errors.model}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Año"
            type="number"
            placeholder="Ej: 2020"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setError("year", null);
            }}
            onBlur={() => setError("year", validateYear(year))}
            min={1990}
            max={CURRENT_YEAR + 1}
            required
            error={errors.year}
          />
          <Input
            label="Kilometraje"
            type="number"
            placeholder="Ej: 45000"
            value={mileage}
            onChange={(e) => {
              setMileage(e.target.value);
              setError("mileage", null);
            }}
            onBlur={() => setError("mileage", validateMileage(mileage))}
            min={0}
            required
            error={errors.mileage}
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

        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 accent-blue-deep"
            required
          />
          <span className="text-xs text-gray-400 leading-relaxed">
            Acepto que mis datos sean utilizados para gestionar la consulta sobre mi vehículo, de acuerdo con la{" "}
            <a href="/legal" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">
              Política de Privacidad
            </a>
            .
          </span>
        </label>

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
