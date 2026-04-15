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

const VIEW_LABELS: Record<string, string> = {
  moto: "Ver moto",
  "next-gen": "Ver vehículo",
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
    <article className="bg-cream-soft rounded-[var(--radius)] shadow-sm hover:shadow-md hover:-translate-y-[3px] transition-all duration-200 overflow-hidden group flex flex-col h-full border border-gray-300">
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

        <p className="font-display text-lg text-blue-deep mb-2">
          {price}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3 mt-auto">
          <span className="text-xs text-dark-800 bg-cream px-2 py-0.5 rounded">
            {formatMileage(vehicle.mileage)}
          </span>
          <span className="text-xs text-dark-800 bg-cream px-2 py-0.5 rounded">
            {vehicle.fuel_type}
          </span>
          <span className="text-xs text-dark-800 bg-cream px-2 py-0.5 rounded">
            {vehicle.transmission}
          </span>
          {vehicle.financing_available && (
            <span className="text-xs font-medium text-green-wa bg-green-wa/15 px-2 py-0.5 rounded">
              Financiación
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href={`/vehiculos/${vehicle.slug}`}
            className="flex items-center justify-center w-full text-sm font-medium py-2 rounded-[var(--radius-sm)] border border-gray-300 text-dark-900 hover:bg-cream transition-colors"
          >
            {VIEW_LABELS[vehicle.vehicle_type] || "Ver vehículo"}
          </Link>
          <WhatsAppButton
            href={waLink}
            vehicleName={title}
            className="flex items-center justify-center gap-2 w-full bg-green-wa text-[#051313] text-sm font-semibold py-2 rounded-[var(--radius-sm)] hover:brightness-110 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.347 0-4.518-.809-6.233-2.163l-.436-.348-3.2 1.073 1.073-3.2-.348-.436A9.956 9.956 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
            Consultar
          </WhatsAppButton>
        </div>
      </div>
    </article>
  );
}
