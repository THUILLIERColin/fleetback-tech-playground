import type { Vehicle } from "@/types/Vehicle";

export const STATUS_COLOR: Record<Vehicle["status"], string> = {
  available: "#16a34a",
  in_repair: "#d97706",
  rented: "#2563eb",
};

export const STATUS_LABEL: Record<Vehicle["status"], string> = {
  available: "Disponible",
  in_repair: "En réparation",
  rented: "Loué",
};
