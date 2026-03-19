import { z } from "zod";

export const vehicleSchema = z.object({
  brand: z.string().min(1, "La marca es requerida"),
  model: z.string().min(1, "El modelo es requerido"),
  version: z.string().default(""),
  year: z.coerce.number().int().min(1990).max(2030),
  mileage: z.coerce.number().int().min(0).default(0),
  price_usd: z.coerce.number().positive("El precio debe ser mayor a 0"),
  fuel_type: z.enum(["nafta", "diesel", "eléctrico", "híbrido"]),
  transmission: z.enum(["manual", "automático", "CVT"]),
  vehicle_type: z.enum(["usado", "0km", "moto", "next-gen"]),
  description: z.string().default(""),
  is_featured: z.boolean().default(false),
  is_new_arrival: z.boolean().default(false),
  financing_available: z.boolean().default(false),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;
