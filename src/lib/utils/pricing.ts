import type { Vehicle } from "@/types";

/*
 * Tasa de respaldo USD→ARS usada SOLO si ningún vehículo del inventario
 * tiene ambos precios cargados. Nunca se muestra al usuario: sirve
 * únicamente para comparar precios entre monedas al ordenar.
 */
const FALLBACK_USD_ARS_RATE = 1500;

/*
 * Tasa implícita del inventario: mediana de price_ars/price_usd entre los
 * vehículos que tienen ambos precios. Refleja cómo la concesionaria valúa
 * el peso frente al dólar y se actualiza sola con cada carga de stock.
 */
export function inventoryUsdArsRate(vehicles: Vehicle[]): number {
  const rates = vehicles
    .filter((v) => v.price_usd != null && v.price_usd > 0 && v.price_ars != null && v.price_ars > 0)
    .map((v) => v.price_ars! / v.price_usd!)
    .sort((a, b) => a - b);
  if (rates.length === 0) return FALLBACK_USD_ARS_RATE;
  return rates[Math.floor(rates.length / 2)];
}

/* Precio comparable en USD: usa price_usd si existe, si no convierte el ARS. */
export function effectivePriceUsd(vehicle: Vehicle, rate: number): number | null {
  if (vehicle.price_usd != null) return vehicle.price_usd;
  if (vehicle.price_ars != null) return vehicle.price_ars / rate;
  return null;
}

/*
 * Ordena por precio comparando ambas monedas en USD efectivo.
 * Los vehículos sin ningún precio ("consultar") van siempre al final.
 */
export function sortVehiclesByPrice(
  vehicles: Vehicle[],
  direction: "asc" | "desc"
): Vehicle[] {
  const rate = inventoryUsdArsRate(vehicles);
  return [...vehicles].sort((a, b) => {
    const priceA = effectivePriceUsd(a, rate);
    const priceB = effectivePriceUsd(b, rate);
    if (priceA == null && priceB == null) return 0;
    if (priceA == null) return 1;
    if (priceB == null) return -1;
    return direction === "asc" ? priceA - priceB : priceB - priceA;
  });
}
