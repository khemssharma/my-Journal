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

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  // ✅ If no content, return undefined (for DELETE, etc.)
  if (res.status === 204) {
    return undefined as T;
  }

  // ✅ Handle empty body gracefully
  const text = await res.text();
  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}
