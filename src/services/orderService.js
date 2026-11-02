import { USE_MOCK } from "@/config/env.js";
import { http, delay } from "./api.js";

// Expected endpoint: POST /orders -> created order
export async function placeOrder(order, token) {
  if (!USE_MOCK) return http("/orders", { method: "POST", body: order, token });
  await delay(900);
  return { ...order, id: `NX${Date.now().toString().slice(-8)}`, status: "Processing", createdAt: new Date().toISOString() };
}
