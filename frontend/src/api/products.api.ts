import { apiFetch } from "./client";
import type { Product, ProductStatus } from "../types";

export interface ProductData {
  name: string;
  description: string;
  status: ProductStatus;
}

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

export async function createProduct(data: ProductData): Promise<Product> {
  const response = await apiFetch("/products", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("No se pudo crear el producto");
  }

  return response.json() as Promise<Product>;
}

export async function updateProduct(
  id: number,
  data: ProductData,
): Promise<Product> {
  const response = await apiFetch(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("No se pudo actualizar el producto");
  }

  return response.json() as Promise<Product>;
}

export async function changeProductStatus(
  id: number,
  status: ProductStatus,
): Promise<Product> {
  const response = await apiFetch(`/products/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("No se pudo cambiar el estado del producto");
  }

  return response.json() as Promise<Product>;
}

export async function deleteProduct(id: number): Promise<void> {
  const response = await apiFetch(`/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar el producto");
  }
}
