// src/services/vehicleService.ts
import axios from 'axios';
import type { Vehicle } from '../data/vehicles';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // mock API publique
  timeout: 5000,
});

// on simule une réponse typée Vehicle[]
export async function fetchVehicles(): Promise<Vehicle[]> {
  // JSONPlaceholder n'a pas de véhicules — on mocke la réponse
  await new Promise(resolve => setTimeout(resolve, 1200)); // simule la latence

  // simule une erreur aléatoire pour tester le cas d'erreur
  if (Math.random() < 0.3) throw new Error('Erreur réseau simulée');

  return Array.from({ length: 50 }, (_, i) => ({
    id: `v-${String(i).padStart(3, '0')}`,
    plate: `AB-${100 + i}-CD`,
    brand: ['Renault', 'Peugeot', 'Citroën', 'BMW', 'Mercedes'][i % 5],
    model: ['Clio', '308', 'C3', 'Série 3', 'Classe A'][i % 5],
    year: 2018 + (i % 6),
    mileage: 10000 + i * 1500,
    status: (['available', 'in_repair', 'rented'] as const)[i % 3],
    client : `Client ${i + 1}`,
  }));
}