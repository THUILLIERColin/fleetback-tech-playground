export type Vehicle = {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  status: "available" | "in_repair" | "rented";
  client?: Client;
};

export type Client = {
  name: string;
  email: string;
};

export type JsonPlaceholderUser = {
  id: number;
  name: string;
  email: string;
};
