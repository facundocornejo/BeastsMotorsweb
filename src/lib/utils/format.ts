export function formatPrice(priceUsd: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(priceUsd);
}

export function formatPriceARS(priceArs: number): string {
  return `$ ${new Intl.NumberFormat("es-AR").format(Math.round(priceArs))}`;
}

export function formatMileage(km: number): string {
  return `${new Intl.NumberFormat("es-AR").format(km)} km`;
}

export function formatYear(year: number): string {
  return String(year);
}

export function vehicleTitle(
  brand: string,
  model: string,
  version: string | null,
  year: number
): string {
  const parts = [brand, model, version, String(year)].filter(Boolean);
  return parts.join(" ");
}
