import { USE_MOCK } from "@/config/env.js";
import { http, delay } from "./api.js";

// Expected endpoints: POST /auth/login, POST /auth/register -> { user, token }
export async function login({ email, password }) {
  if (!USE_MOCK) return http("/auth/login", { method: "POST", body: { email, password } });
  await delay(600);
  if (!email || password.length < 6) throw new Error("Invalid email or password");
  return { token: "mock-token", user: { name: email.split("@")[0], email, phone: "", joined: new Date().toISOString() } };
}

export async function register({ name, email, password }) {
  if (!USE_MOCK) return http("/auth/register", { method: "POST", body: { name, email, password } });
  await delay(700);
  if (password.length < 6) throw new Error("Password must be at least 6 characters");
  return { token: "mock-token", user: { name, email, phone: "", joined: new Date().toISOString() } };
}
