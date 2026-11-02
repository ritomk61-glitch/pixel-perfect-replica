import { USE_MOCK } from "@/config/env.js";
import { http, delay } from "./api.js";
import { products, categories } from "@/data/products.js";

// Swap to the backend by setting VITE_USE_MOCK=false. Expected endpoints:
// GET /products, GET /products/:id, GET /categories
export async function getProducts() {
  if (!USE_MOCK) return http("/products");
  await delay();
  return products;
}

export async function getProduct(id) {
  if (!USE_MOCK) return http(`/products/${id}`);
  await delay(250);
  const p = products.find((x) => x.id === id);
  if (!p) throw new Error("Product not found");
  return p;
}

export async function getCategories() {
  if (!USE_MOCK) return http("/categories");
  return categories;
}
