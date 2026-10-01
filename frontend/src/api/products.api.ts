import { apiFetch } from "./client";
import type { Product } from "../types";

export async function getProducts(): Promise<Product[]> {
  const response = await apiFetch("/products");

  if (!response.ok) {
    throw new Error("No se pudieron obtener los productos");
  }

  return response.json() as Promise<Product[]>;
}

export async function getProductById(id: number): Promise<Product> {
  const response = await apiFetch(`/products/${id}`);

  if (!response.ok) {
    throw new Error("No se pudo obtener el producto");
  }

  return response.json() as Promise<Product>;
}
