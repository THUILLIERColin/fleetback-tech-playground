import axios from "axios";
import type { Vehicle, JsonPlaceholderUser } from "@/types/vehicle";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

export async function fetchVehicles(): Promise<Vehicle[]> {
  const { data } = await api.get<JsonPlaceholderUser[]>("/users");

  return data.map((user, i) => ({
    id: `v-${String(user.id).padStart(3, "0")}`,
    plate: `AB-${100 + i}-CD`,
    brand: ["Renault", "Peugeot", "Citroën", "BMW", "Mercedes"][i % 5],
    model: ["Clio", "308", "C3", "Série 3", "Classe A"][i % 5],
    year: 2018 + (i % 6),
    mileage: 10000 + i * 1500,
    status: (["available", "in_repair", "rented"] as const)[i % 3],
    client: {
      name: user.name,
      email: user.email,
    },
  }));
}
