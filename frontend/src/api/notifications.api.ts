import { apiFetch } from "./client";
import type { Notification } from "../types";

export async function getNotifications(): Promise<Notification[]> {
  const response = await apiFetch("/notifications");

  if (!response.ok) {
    throw new Error("No se pudieron obtener las notificaciones");
  }

  return response.json() as Promise<Notification[]>;
}

export async function markNotificationAsRead(id: number): Promise<void> {
  const response = await apiFetch(`/notifications/${id}/read`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("No se pudo marcar la notificación como leída");
  }
}
