import { z } from "zod";

const optionalPrice = z.preprocess(
  (v) => (!v && v !== 0 ? undefined : Number(v)),
  z.number().positive().optional()
);

export const vehicleSchema = z.object({
  brand: z.string().min(1, "La marca es requerida"),
  model: z.string().min(1, "El modelo es requerido"),
  version: z.string().default(""),
  year: z.coerce.number().int().min(1900).max(2030),
  mileage: z.coerce.number().int().min(0).default(0),
  price_usd: optionalPrice,
  price_ars: optionalPrice,
  fuel_type: z.enum(["nafta", "diesel", "eléctrico", "híbrido"]),
  transmission: z.enum(["manual", "automático", "CVT"]),
  vehicle_type: z.enum(["usado", "0km", "moto", "next-gen"]),
  description: z.string().default(""),
  is_featured: z.boolean().default(false),
  is_new_arrival: z.boolean().default(false),
  financing_available: z.boolean().default(false),
}).superRefine((data, ctx) => {
  if (!data.price_usd && !data.price_ars) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Ingresá al menos un precio (USD o pesos)",
      path: ["price_usd"],
    });
  }
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;
