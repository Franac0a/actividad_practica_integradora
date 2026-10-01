import { apiFetch } from "./client";
import type { User } from "../types";

export type RoleName = "admin" | "operador" | "usuario";

export async function getUsers(): Promise<User[]> {
  const response = await apiFetch("/users");

  if (!response.ok) {
    throw new Error("No se pudieron obtener los usuarios");
  }

  return response.json() as Promise<User[]>;
}

export async function assignRole(
  userId: number,
  role: RoleName,
): Promise<void> {
  const response = await apiFetch(`/users/${userId}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });

  if (!response.ok) {
    throw new Error("No se pudo asignar el rol");
  }
}
