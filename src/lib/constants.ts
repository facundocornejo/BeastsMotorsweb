export const VEHICLE_TYPES = [
  { value: "usado", label: "Usado" },
  { value: "0km", label: "0 Km" },
  { value: "moto", label: "Moto" },
  { value: "next-gen", label: "Next Generation" },
] as const;

export const FUEL_TYPES = [
  { value: "nafta", label: "Nafta" },
  { value: "diesel", label: "Diesel" },
  { value: "eléctrico", label: "Eléctrico" },
  { value: "híbrido", label: "Híbrido" },
] as const;

export const TRANSMISSIONS = [
  { value: "manual", label: "Manual" },
  { value: "automático", label: "Automático" },
  { value: "CVT", label: "CVT" },
] as const;

export const SORT_OPTIONS = [
  { value: "newest", label: "Más recientes" },
  { value: "price_asc", label: "Menor precio" },
  { value: "price_desc", label: "Mayor precio" },
  { value: "year_desc", label: "Más nuevo" },
  { value: "year_asc", label: "Más antiguo" },
] as const;

export const POPULAR_BRANDS = [
  "Toyota",
  "Volkswagen",
  "Fiat",
  "Chevrolet",
  "Renault",
  "Peugeot",
  "Ford",
  "Citroën",
  "Nissan",
  "Jeep",
  "Honda",
  "Hyundai",
  "Kia",
  "Mercedes-Benz",
  "BMW",
  "Audi",
  "Chery",
  "Haval",
  "JAC",
  "GWM",
  "Great Wall",
  "DS Automobiles",
  "Alfa Romeo",
  "Ram",
  "Mitsubishi",
  "Suzuki",
] as const;
