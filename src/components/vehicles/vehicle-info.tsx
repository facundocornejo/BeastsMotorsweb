import Link from "next/link";
import type { Vehicle } from "@/types";
import { vehicleTitle, formatPrice, formatPriceARS, formatMileage } from "@/lib/utils/format";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import WhatsAppButton from "./whatsapp-button";
import PaymentLogos, {
  AUTO_FINANCING_PARTNERS,
  MOTO_FINANCING_PARTNERS,
} from "@/components/ui/payment-logos";

interface VehicleInfoProps {
  vehicle: Vehicle;
}

const SPEC_ITEMS = (vehicle: Vehicle) => [
  { label: "Año", value: String(vehicle.year) },
  { label: "Kilometraje", value: formatMileage(vehicle.mileage) },
  { label: "Combustible", value: vehicle.fuel_type },
  { label: "Transmisión", value: vehicle.transmission },
  { label: "Tipo", value: vehicle.vehicle_type },
];

export default function VehicleInfo({ vehicle }: VehicleInfoProps) {
  const title = vehicleTitle(vehicle.brand, vehicle.model, vehicle.version, vehicle.year);
  const waLink = buildWhatsAppLink({
    vehicleName: title,
    priceUsd: vehicle.price_usd,
    priceArs: vehicle.price_ars,
    slug: vehicle.slug,
  });

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl text-dark-900 mb-2">
        {title}
      </h1>

      <div className="mb-6">
        {vehicle.price_usd != null && (
          <p className="font-display text-3xl md:text-4xl text-blue-deep leading-tight">
            {formatPrice(vehicle.price_usd)}
          </p>
        )}
        {vehicle.price_ars != null && (
          <p className="text-xl md:text-2xl text-dark-600 mt-1">
            {formatPriceARS(vehicle.price_ars)}
          </p>
        )}
      </div>

      {/* Specs grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {SPEC_ITEMS(vehicle).map((spec) => (
          <div key={spec.label} className="bg-gray-100 rounded-[var(--radius-sm)] p-3">
            <p className="text-xs text-dark-600 uppercase tracking-wider">{spec.label}</p>
            <p className="text-sm font-medium text-dark-900 capitalize">{spec.value}</p>
          </div>
        ))}
      </div>

      {/* Financiación */}
      {vehicle.financing_available && (
        <div className="border border-gray-300 border-l-4 border-l-green-wa rounded-[var(--radius-sm)] p-4 mb-6">
          <p className="text-sm font-semibold text-dark-900 mb-3">
            Financialo hasta en 24 cuotas
          </p>
          <PaymentLogos
            size="sm"
            partners={vehicle.vehicle_type === "moto" ? MOTO_FINANCING_PARTNERS : AUTO_FINANCING_PARTNERS}
            className="justify-start"
          />
          <Link
            href="/financiacion"
            className="inline-block text-sm font-medium text-blue-light hover:text-blue-mid transition-colors mt-3"
          >
            Ver opciones de financiación
            <span aria-hidden="true" className="ml-1">→</span>
          </Link>
        </div>
      )}

      {/* Description */}
      {vehicle.description && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-dark-700 mb-2">Descripción</h2>
          <p className="text-sm text-dark-600 leading-relaxed whitespace-pre-line">
            {vehicle.description}
          </p>
        </div>
      )}

      {/* WhatsApp CTA */}
      <WhatsAppButton
        href={waLink}
        vehicleName={title}
        className="flex items-center justify-center gap-2 w-full bg-blue-deep text-white font-medium py-3.5 rounded-[var(--radius)] hover:bg-blue-mid transition-colors text-base"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-green-wa" />
        Consultar por WhatsApp
      </WhatsAppButton>
    </div>
  );
}
