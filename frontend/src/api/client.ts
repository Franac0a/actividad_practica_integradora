const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = localStorage.getItem("token");

  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000);

  try {
    return await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}
