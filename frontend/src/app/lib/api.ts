// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function getToken(): string | null {
  return typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
}

export function setToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", token);
  }
}

export function clearToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
  }
}

export function authHeaders(): Record<string, string> {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {},
  responseType: "json" | "text" = "json"
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { ...authHeaders(), ...(options.headers || {}) },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errorText}`);
  }

  if (responseType === "text") {
    return (await res.text()) as T;
  }

  return (await res.json()) as T;
}
