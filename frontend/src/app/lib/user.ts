// lib/user.ts
import { apiFetch, setToken } from "./api";

export async function createUser(userName: string, password: string) {
  return apiFetch("/public/create-user", {
    method: "POST",
    body: JSON.stringify({ userName, password })
  });
}

export async function login(userName: string, password: string) {
  const res = await apiFetch("/public/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, password })
  }) as Response;

  if (!res.ok) throw new Error(await res.text());
  const token = await res.text(); 
  setToken(token);
  return token;
}

export async function updateUser(userName: string, password: string) {
  return apiFetch("/user", {
    method: "PUT",
    body: JSON.stringify({ userName, password })
  });
}

export async function deleteUser() {
  return apiFetch("/user", { method: "DELETE" });
}
