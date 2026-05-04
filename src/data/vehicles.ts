import type { Vehicle } from "@/types/vehicle";

const BRANDS = ["Renault", "Peugeot", "Citroën", "BMW", "Mercedes"] as const;
const MODELS = ["Clio", "308", "C3", "Série 3", "Classe A"] as const;
const STATUSES = ["available", "in_repair", "rented"] as const;

export const VEHICLES_MOCK: Vehicle[] = Array.from({ length: 200 }, (_, i) => ({
  id: `v-${String(i).padStart(3, "0")}`,
  plate: `AB-${100 + i}-CD`,
  brand: BRANDS[i % BRANDS.length]!,
  model: MODELS[i % MODELS.length]!,
  year: 2018 + (i % 6),
  mileage: 10000 + i * 1500,
  status: STATUSES[i % STATUSES.length]!,
}));
