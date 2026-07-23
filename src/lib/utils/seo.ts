import type { Metadata } from "next";
import type { Vehicle } from "@/types";
import { formatPrice, formatPriceARS, vehicleTitle } from "./format";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://beastmotors.com.ar";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
const INSTAGRAM_URL = "https://www.instagram.com/beastmotors.oficial/";
const SITE_NAME = "Beast Motors";

interface OgImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

const DEFAULT_OG_IMAGE: OgImage = {
  url: "/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "Beast Motors — Concesionaria en Paraná, Entre Ríos",
};

interface PageMetadataInput {
  title: string;
  description: string;
  /* Ruta relativa canónica, sin query params (ej: "/vehiculos") */
  path: string;
  image?: OgImage;
  /* true = el title no pasa por el template "%s | Beast Motors" (solo home) */
  absoluteTitle?: boolean;
}

/**
 * Metadata completo y consistente para cualquier página pública:
 * title, description, canonical, Open Graph y Twitter Card.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImage.url],
    },
  };
}

function vehicleOgImageUrl(vehicle: Vehicle): string | undefined {
  const rawUrl = vehicle.images[0]?.url;
  return rawUrl
    ? rawUrl.replace("/upload/", "/upload/w_1200,h_800,c_fill,q_auto,f_auto/")
    : undefined;
}

export function vehicleMetadata(vehicle: Vehicle): Metadata {
  const title = vehicleTitle(
    vehicle.brand,
    vehicle.model,
    vehicle.version,
    vehicle.year
  );
  const priceText = vehicle.price_usd != null ? formatPrice(vehicle.price_usd) : vehicle.price_ars != null ? formatPriceARS(vehicle.price_ars) : "";
  const description = `${title}${priceText ? ` - ${priceText}` : ""}. ${vehicle.fuel_type}, ${vehicle.transmission}, ${vehicle.mileage} km. Consultá por WhatsApp.`;
  const imageUrl = vehicleOgImageUrl(vehicle);

  return pageMetadata({
    title,
    description,
    path: `/vehiculos/${vehicle.slug}`,
    image: imageUrl
      ? { url: imageUrl, width: 1200, height: 800, alt: title }
      : undefined,
  });
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
    itemCondition:
      vehicle.vehicle_type === "0km"
        ? "https://schema.org/NewCondition"
        : "https://schema.org/UsedCondition",
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileage,
      unitCode: "KMT",
    },
    fuelType: vehicle.fuel_type,
    vehicleTransmission: vehicle.transmission,
    offers: {
      "@type": "Offer",
      price: vehicle.price_usd ?? vehicle.price_ars,
      priceCurrency: vehicle.price_usd != null ? "USD" : "ARS",
      availability: "https://schema.org/InStock",
      itemCondition:
        vehicle.vehicle_type === "0km"
          ? "https://schema.org/NewCondition"
          : "https://schema.org/UsedCondition",
      seller: { "@id": `${SITE_URL}/#dealer` },
    },
    image: vehicleOgImageUrl(vehicle),
    url: `${SITE_URL}/vehiculos/${vehicle.slug}`,
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["AutoDealer", "LocalBusiness"],
    "@id": `${SITE_URL}/#dealer`,
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/og-default.jpg`,
    telephone: WHATSAPP_NUMBER ? `+${WHATSAPP_NUMBER}` : undefined,
    sameAs: [INSTAGRAM_URL],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Circunvalación José Hernández 2718",
      addressLocality: "Paraná",
      addressRegion: "Entre Ríos",
      postalCode: "E3100",
      addressCountry: "AR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -31.748742,
      longitude: -60.48274,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "14:00",
      },
    ],
    priceRange: "$$",
    areaServed: { "@type": "City", name: "Paraná" },
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/vehiculos?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: `${SITE_URL}${item.path}` } : {}),
    })),
  };
}
