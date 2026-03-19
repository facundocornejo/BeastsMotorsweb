export interface VehicleImage {
  url: string;
  public_id: string;
  order: number;
}

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  version: string | null;
  year: number;
  mileage: number;
  price_usd: number;
  fuel_type: "nafta" | "diesel" | "eléctrico" | "híbrido";
  transmission: "manual" | "automático" | "CVT";
  vehicle_type: "usado" | "0km" | "moto" | "next-gen";
  description: string | null;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_sold: boolean;
  financing_available: boolean;
  images: VehicleImage[];
  created_at: string;
  updated_at: string;
}

export interface HappySale {
  id: string;
  vehicle_title: string;
  images: Omit<VehicleImage, "order">[];
  created_at: string;
}

export interface SiteConfig {
  key: string;
  value: string;
}

export type VehicleType = Vehicle["vehicle_type"];
export type FuelType = Vehicle["fuel_type"];
export type Transmission = Vehicle["transmission"];

export interface VehicleFilters {
  type?: VehicleType;
  brand?: string;
  min_price?: number;
  max_price?: number;
  min_year?: number;
  max_year?: number;
  min_km?: number;
  max_km?: number;
  sort?: "price_asc" | "price_desc" | "year_desc" | "year_asc" | "newest";
  search?: string;
}
