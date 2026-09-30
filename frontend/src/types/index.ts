export type ProductStatus = "DISPONIBLE" | "SIN_STOCK" | "DISCONTINUADO";

export interface Product {
  id: number;
  name: string;
  description: string;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  email: string;
  role: string;
  permissions: string[];
}

export interface Notification {
  id: number;
  message: string;
  read: boolean;
  createdAt: string;
}
