import { API_BASE_URL } from "@/config/env.js";

// Thin REST client for the future Node/Express backend.
export async function http(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error((await res.text()) || `Request failed: ${res.status}`);
  return res.json();
}

export const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));
