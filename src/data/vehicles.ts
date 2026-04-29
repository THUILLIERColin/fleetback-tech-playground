// src/data/vehicles.ts
export type Vehicle = {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  status: 'available' | 'in_repair' | 'rented';
  client: string;
};

export const VEHICLES_MOCK: Vehicle[] = Array.from({ length: 200 }, (_, i) => ({
  id: `v-${String(i).padStart(3, '0')}`,
  plate: `AB-${100 + i}-CD`,
  brand: ['Renault', 'Peugeot', 'Citroën', 'BMW', 'Mercedes'][i % 5],
  model: ['Clio', '308', 'C3', 'Série 3', 'Classe A'][i % 5],
  year: 2018 + (i % 6),
  mileage: 10000 + i * 1500,
  status: (['available', 'in_repair', 'rented'] as const)[i % 3],
  client : `Client ${i + 1}`,
}));