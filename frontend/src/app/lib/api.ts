// lib/api.ts
export const API_URL = "http://localhost:8080";

export function getToken(): string | null {
  return typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
}

export function setToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", token);
  }
}

export function clearToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
  }
}

export function authHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { ...authHeaders(), ...(options.headers || {}) },
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
