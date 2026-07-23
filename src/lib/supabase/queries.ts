import { createClient } from "./server";
import type { Vehicle, HappySale, VehicleFilters } from "@/types";
import { sortVehiclesByPrice } from "@/lib/utils/pricing";

export async function getAvailableVehicles(
  filters?: VehicleFilters
): Promise<Vehicle[]> {
  const supabase = await createClient();

  let query = supabase
    .from("vehicles")
    .select("*")
    .eq("is_sold", false);

  if (filters?.type === "0km") {
    query = query.in("vehicle_type", ["0km", "next-gen"]);
  } else if (filters?.type) {
    query = query.eq("vehicle_type", filters.type);
  }
  if (filters?.brand) query = query.eq("brand", filters.brand);
  if (filters?.min_price) query = query.gte("price_usd", filters.min_price);
  if (filters?.max_price) query = query.lte("price_usd", filters.max_price);
  if (filters?.min_year) query = query.gte("year", filters.min_year);
  if (filters?.max_year) query = query.lte("year", filters.max_year);
  if (filters?.min_km) query = query.gte("mileage", filters.min_km);
  if (filters?.max_km) query = query.lte("mileage", filters.max_km);
  if (filters?.search) {
    query = query.or(
      `brand.ilike.%${filters.search}%,model.ilike.%${filters.search}%`
    );
  }

  switch (filters?.sort) {
    case "price_asc":
    case "price_desc":
      // El orden por precio se hace en JS: hay precios en USD y en ARS
      // y compararlos requiere convertirlos a una moneda común.
      query = query.order("created_at", { ascending: false });
      break;
    case "year_desc":
      query = query.order("year", { ascending: false });
      break;
    case "year_asc":
      query = query.order("year", { ascending: true });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data } = await query;
  const vehicles = (data as Vehicle[]) || [];

  if (filters?.sort === "price_asc" || filters?.sort === "price_desc") {
    return sortVehiclesByPrice(vehicles, filters.sort === "price_asc" ? "asc" : "desc");
  }
  return vehicles;
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("vehicles")
    .select("*")
    .eq("is_featured", true)
    .eq("is_sold", false)
    .order("created_at", { ascending: false })
    .limit(8);
  return (data as Vehicle[]) || [];
}

export async function getNewArrivals(): Promise<Vehicle[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("vehicles")
    .select("*")
    .eq("is_new_arrival", true)
    .eq("is_sold", false)
    .order("created_at", { ascending: false })
    .limit(8);
  return (data as Vehicle[]) || [];
}

export async function getVehicleBySlug(
  slug: string
): Promise<Vehicle | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("vehicles")
    .select("*")
    .eq("slug", slug)
    .eq("is_sold", false)
    .single();
  return (data as Vehicle) || null;
}

export async function getRelatedVehicles(
  vehicle: Vehicle,
  limit = 3
): Promise<Vehicle[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("vehicles")
    .select("*")
    .eq("is_sold", false)
    .neq("id", vehicle.id)
    .or(`vehicle_type.eq.${vehicle.vehicle_type},brand.eq.${vehicle.brand}`)
    .limit(limit);
  return (data as Vehicle[]) || [];
}

export async function getHappySales(): Promise<HappySale[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("happy_sales")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as HappySale[]) || [];
}

export async function getAvailableStockCount(): Promise<number> {
  const supabase = await createClient();
  const { count } = await supabase
    .from("vehicles")
    .select("*", { count: "exact", head: true })
    .eq("is_sold", false);
  return count ?? 0;
}
