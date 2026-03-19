import type { Metadata } from "next";
import type { Vehicle } from "@/types";
import { formatPrice, vehicleTitle } from "./format";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://beastmotors.com.ar";

export function vehicleMetadata(vehicle: Vehicle): Metadata {
  const title = vehicleTitle(
    vehicle.brand,
    vehicle.model,
    vehicle.version,
    vehicle.year
  );
  const description = `${title} - ${formatPrice(vehicle.price_usd)}. ${vehicle.fuel_type}, ${vehicle.transmission}, ${vehicle.mileage} km. Consultá por WhatsApp.`;
  const imageUrl = vehicle.images[0]?.url;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Beast Motors`,
      description,
      url: `${SITE_URL}/vehiculos/${vehicle.slug}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 800 }] : [],
      type: "website",
    },
  };
}

export function vehicleJsonLd(vehicle: Vehicle) {
  const title = vehicleTitle(
    vehicle.brand,
    vehicle.model,
    vehicle.version,
    vehicle.year
  );

  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: title,
    brand: { "@type": "Brand", name: vehicle.brand },
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileage,
      unitCode: "KMT",
    },
    fuelType: vehicle.fuel_type,
    vehicleTransmission: vehicle.transmission,
    offers: {
      "@type": "Offer",
      price: vehicle.price_usd,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "AutoDealer",
        name: "Beast Motors",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Paraná",
          addressRegion: "Entre Ríos",
          addressCountry: "AR",
        },
      },
    },
    image: vehicle.images[0]?.url,
    url: `${SITE_URL}/vehiculos/${vehicle.slug}`,
  };
}
