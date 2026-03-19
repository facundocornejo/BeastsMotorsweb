const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

interface WhatsAppLinkParams {
  vehicleName: string;
  priceUsd: number;
  slug: string;
}

export function buildWhatsAppLink({
  vehicleName,
  priceUsd,
  slug,
}: WhatsAppLinkParams): string {
  const url = `${SITE_URL}/vehiculos/${slug}`;
  const price = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(priceUsd);

  const message = `Hola! Me interesa el ${vehicleName} publicado a ${price}.\n\n${url}`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralWhatsAppLink(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola! Quisiera consultar sobre los vehiculos disponibles.")}`;
}

export function buildFinanceWhatsAppLink(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola! Quiero consultar sobre opciones de financiacion para la compra de un vehiculo.")}`;
}

export function buildPlanesWhatsAppLink(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola! Quiero consultar sobre financiación y planes de ahorro.")}`;
}

export function buildAppointmentWhatsAppLink(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola! Quisiera agendar una cita para visitar la concesionaria fuera del horario de atención.")}`;
}

export function buildGestoriaWhatsAppLink(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola! Quiero consultar sobre el servicio de gestoría automotor.")}`;
}

interface SellFormData {
  brand: string;
  model: string;
  year: string;
  mileage: string;
  transmission: string;
  condition: string;
  comment: string;
}

export function buildSellWhatsAppLink(data: SellFormData): string {
  const lines = [
    "Hola! Quiero vender/entregar mi vehiculo:",
    "",
    `Marca: ${data.brand}`,
    `Modelo: ${data.model}`,
    `Ano: ${data.year}`,
    `Km: ${data.mileage}`,
    `Transmision: ${data.transmission}`,
    `Estado: ${data.condition}`,
  ];

  if (data.comment.trim()) {
    lines.push(`Comentario: ${data.comment.trim()}`);
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
