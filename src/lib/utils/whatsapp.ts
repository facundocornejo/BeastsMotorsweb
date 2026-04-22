const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

interface WhatsAppLinkParams {
  vehicleName: string;
  priceUsd?: number | null;
  priceArs?: number | null;
  slug: string;
}

export function buildWhatsAppLink({
  vehicleName,
  priceUsd,
  priceArs,
  slug,
}: WhatsAppLinkParams): string {
  const url = `${SITE_URL}/vehiculos/${slug}`;

  let priceText = "";
  if (priceUsd && priceArs) {
    const usd = new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(priceUsd);
    const ars = `$ ${new Intl.NumberFormat("es-AR").format(Math.round(priceArs))}`;
    priceText = `${usd} (${ars} en pesos)`;
  } else if (priceUsd) {
    priceText = new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(priceUsd);
  } else if (priceArs) {
    priceText = `$ ${new Intl.NumberFormat("es-AR").format(Math.round(priceArs))}`;
  }

  const message = `Hola! Me interesa el ${vehicleName}${priceText ? ` publicado a ${priceText}` : ""}.\n\n${url}`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralWhatsAppLink(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola! Quisiera consultar sobre los vehículos disponibles.")}`;
}

export function buildFinanceWhatsAppLink(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola! Quiero consultar sobre opciones de financiación para la compra de un vehículo.")}`;
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

interface FinanceFormData {
  entregaInicial: "si" | "no";
  cuotaMensual: string;
  reciboSueldo: "si" | "no";
  garante: "si" | "no";
  telefono: string;
  email: string;
}

export function buildFinanceFormWhatsAppLink(data: FinanceFormData): string {
  const lines = [
    "Hola! Quiero consultar sobre financiación. Mis datos:",
    "",
    `Entrega inicial: ${data.entregaInicial === "si" ? "Sí" : "No"}`,
    `Cuota mensual que puedo pagar: $${data.cuotaMensual}`,
    `Recibo de sueldo: ${data.reciboSueldo === "si" ? "Sí" : "No"}`,
    `Garante con recibo de sueldo: ${data.garante === "si" ? "Sí" : "No"}`,
    `Teléfono: ${data.telefono}`,
    `Email: ${data.email}`,
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
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
    "Hola! Quiero vender/entregar mi vehículo:",
    "",
    `Marca: ${data.brand}`,
    `Modelo: ${data.model}`,
    `Año: ${data.year}`,
    `Km: ${data.mileage}`,
    `Transmisión: ${data.transmission}`,
    `Estado: ${data.condition}`,
  ];

  if (data.comment.trim()) {
    lines.push(`Comentario: ${data.comment.trim()}`);
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
