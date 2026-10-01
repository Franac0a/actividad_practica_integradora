import { apiFetch } from "./client";
import type { User } from "../types";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export async function loginRequest(data: LoginData): Promise<LoginResponse> {
  const response = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Email o contraseña incorrectos");
  }

  return response.json() as Promise<LoginResponse>;
}

export async function registerRequest(data: RegisterData): Promise<void> {
  const response = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("No se pudo registrar el usuario");
  }
}
