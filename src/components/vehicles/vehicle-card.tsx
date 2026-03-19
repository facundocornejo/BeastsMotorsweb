import Link from "next/link";
import Image from "next/image";
import type { Vehicle } from "@/types";
import { vehicleTitle, formatPrice, formatMileage } from "@/lib/utils/format";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import { catalogImageUrl } from "@/lib/cloudinary/config";
import WhatsAppButton from "./whatsapp-button";

interface VehicleCardProps {
  vehicle: Vehicle;
  priority?: boolean;
}

const TYPE_LABELS: Record<string, string> = {
  "0km": "0 Km",
  moto: "Moto",
  "next-gen": "Next Gen",
};

export default function VehicleCard({ vehicle, priority = false }: VehicleCardProps) {
  const title = vehicleTitle(vehicle.brand, vehicle.model, vehicle.version, vehicle.year);
  const price = formatPrice(vehicle.price_usd);
  const firstImage = vehicle.images[0];
  const imageUrl = firstImage?.public_id
    ? catalogImageUrl(firstImage.public_id)
    : firstImage?.url;

  const waLink = buildWhatsAppLink({
    vehicleName: title,
    priceUsd: vehicle.price_usd,
    slug: vehicle.slug,
  });

  return (
    <article className="bg-white rounded-[var(--radius)] shadow-sm hover:shadow-md hover:-translate-y-[3px] transition-all duration-200 overflow-hidden group flex flex-col h-full">
      {/* Image */}
      <Link href={`/vehiculos/${vehicle.slug}`} className="block relative aspect-[4/3] bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            Sin foto
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {TYPE_LABELS[vehicle.vehicle_type] && (
            <span className="bg-blue-deep text-white text-[10px] font-semibold uppercase px-2 py-0.5 rounded">
              {TYPE_LABELS[vehicle.vehicle_type]}
            </span>
          )}
          {vehicle.is_new_arrival && (
            <span className="bg-green-wa text-dark-900 text-[10px] font-semibold uppercase px-2 py-0.5 rounded">
              Nuevo
            </span>
          )}
          {vehicle.is_featured && (
            <span className="bg-rose text-white text-[10px] font-semibold uppercase px-2 py-0.5 rounded">
              Destacado
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/vehiculos/${vehicle.slug}`}>
          <h3 className="font-semibold text-dark-900 text-sm leading-tight mb-1 line-clamp-2 group-hover:text-blue-deep transition-colors">
            {title}
          </h3>
        </Link>

        <p className="font-display text-lg font-bold text-blue-deep mb-2">
          {price}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3 mt-auto">
          <span className="text-xs text-dark-600 bg-gray-100 px-2 py-0.5 rounded">
            {formatMileage(vehicle.mileage)}
          </span>
          <span className="text-xs text-dark-600 bg-gray-100 px-2 py-0.5 rounded">
            {vehicle.fuel_type}
          </span>
          <span className="text-xs text-dark-600 bg-gray-100 px-2 py-0.5 rounded">
            {vehicle.transmission}
          </span>
          {vehicle.financing_available && (
            <span className="text-xs text-green-800 bg-green-100 px-2 py-0.5 rounded font-medium">
              Financiación
            </span>
          )}
        </div>

        <WhatsAppButton
          href={waLink}
          vehicleName={title}
          className="flex items-center justify-center gap-2 w-full bg-blue-deep text-white text-sm font-medium py-2 rounded-[var(--radius-sm)] hover:bg-blue-mid transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-green-wa" />
          Consultar
        </WhatsAppButton>
      </div>
    </article>
  );
}
