import { apiFetch } from "./client";

export async function subscribeToProduct(productId: number): Promise<void> {
  const response = await apiFetch(`/subscriptions/${productId}`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("No se pudo realizar la suscripción");
  }
}

export async function unsubscribeFromProduct(productId: number): Promise<void> {
  const response = await apiFetch(`/subscriptions/${productId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("No se pudo cancelar la suscripción");
  }
}
