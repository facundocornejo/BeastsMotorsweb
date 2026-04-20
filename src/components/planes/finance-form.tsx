"use client";

import { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { buildFinanceFormWhatsAppLink } from "@/lib/utils/whatsapp";

type YesNo = "si" | "no" | "";

function validatePhone(v: string): string | null {
  const digits = v.replace(/[\s\-\+\(\)]/g, "");
  if (!digits) return "El teléfono es requerido";
  if (!/^\d{6,15}$/.test(digits)) return "Ingresá solo números (mín. 6 dígitos)";
  return null;
}

function validateEmail(v: string): string | null {
  if (!v) return "El email es requerido";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Ingresá un email válido";
  return null;
}

function validateCuota(v: string): string | null {
  const n = Number(v);
  if (!v) return "Ingresá un monto";
  if (isNaN(n) || n <= 0) return "El monto debe ser mayor a 0";
  return null;
}

interface RadioGroupProps {
  label: string;
  name: string;
  value: YesNo;
  onChange: (v: "si" | "no") => void;
}

function RadioGroup({ label, name, value, onChange }: RadioGroupProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-dark-700">{label}</span>
      <div className="flex gap-4">
        {(["si", "no"] as const).map((opt) => (
          <label
            key={opt}
            className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-[var(--radius-sm)] border text-sm font-medium transition-colors select-none ${
              value === opt
                ? "bg-blue-deep text-white border-blue-deep"
                : "bg-white text-dark-700 border-gray-200 hover:border-blue-mid"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="sr-only"
            />
            {opt === "si" ? "Sí" : "No"}
          </label>
        ))}
      </div>
    </div>
  );
}

export default function FinanceForm() {
  const [entregaInicial, setEntregaInicial] = useState<YesNo>("");
  const [cuotaMensual, setCuotaMensual] = useState("");
  const [reciboSueldo, setReciboSueldo] = useState<YesNo>("");
  const [garante, setGarante] = useState<YesNo>("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<"cuota" | "telefono" | "email", string>>>({});

  function setError(field: "cuota" | "telefono" | "email", msg: string | null) {
    setErrors((prev) => {
      const next = { ...prev };
      if (msg) next[field] = msg;
      else delete next[field];
      return next;
    });
  }

  const isValid =
    entregaInicial !== "" &&
    cuotaMensual !== "" &&
    reciboSueldo !== "" &&
    garante !== "" &&
    telefono !== "" &&
    email !== "" &&
    consent &&
    Object.keys(errors).length === 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const cuotaErr = validateCuota(cuotaMensual);
    const phoneErr = validatePhone(telefono);
    const emailErr = validateEmail(email);

    setErrors({
      ...(cuotaErr ? { cuota: cuotaErr } : {}),
      ...(phoneErr ? { telefono: phoneErr } : {}),
      ...(emailErr ? { email: emailErr } : {}),
    });

    if (cuotaErr || phoneErr || emailErr) return;

    const link = buildFinanceFormWhatsAppLink({
      entregaInicial: entregaInicial as "si" | "no",
      cuotaMensual,
      reciboSueldo: reciboSueldo as "si" | "no",
      garante: garante as "si" | "no",
      telefono,
      email,
    });

    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-[var(--white)] rounded-[var(--radius)] p-6 md:p-8 shadow-sm border border-gray-200"
    >
      <p className="text-sm font-semibold text-dark-900 mb-5">
        Completá tus datos y te asesoramos
      </p>

      <div className="flex flex-col gap-5">
        <RadioGroup
          label="¿Contás con entrega inicial?"
          name="entregaInicial"
          value={entregaInicial}
          onChange={setEntregaInicial}
        />

        <Input
          label="¿Cuánto podés pagar de cuota? (en $)"
          type="number"
          placeholder="Ej: 150000"
          value={cuotaMensual}
          onChange={(e) => {
            setCuotaMensual(e.target.value);
            setError("cuota", null);
          }}
          onBlur={() => setError("cuota", validateCuota(cuotaMensual))}
          min={1}
          required
          error={errors.cuota}
        />

        <RadioGroup
          label="¿Tenés recibo de sueldo?"
          name="reciboSueldo"
          value={reciboSueldo}
          onChange={setReciboSueldo}
        />

        <RadioGroup
          label="¿Tenés posibilidad de garante con recibo de sueldo?"
          name="garante"
          value={garante}
          onChange={setGarante}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Teléfono"
            type="tel"
            placeholder="Ej: 343 4123456"
            value={telefono}
            onChange={(e) => {
              const filtered = e.target.value.replace(/[^\d\s\-\+\(\)]/g, "");
              setTelefono(filtered);
              setError("telefono", null);
            }}
            onBlur={() => setError("telefono", validatePhone(telefono))}
            required
            error={errors.telefono}
          />
          <Input
            label="Email"
            type="email"
            placeholder="tucorreo@mail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("email", null);
            }}
            onBlur={() => setError("email", validateEmail(email))}
            required
            error={errors.email}
          />
        </div>

        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 accent-blue-deep"
            required
          />
          <span className="text-xs text-gray-400 leading-relaxed">
            Acepto que mis datos sean utilizados para contactarme sobre financiación y planes de ahorro, de acuerdo con la{" "}
            <a href="/legal" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">
              Política de Privacidad
            </a>
            .
          </span>
        </label>

        <Button type="submit" disabled={!isValid} className="w-full mt-1">
          <span className="w-2 h-2 rounded-full bg-green-wa" />
          Consultar por WhatsApp
        </Button>
      </div>
    </form>
  );
}
