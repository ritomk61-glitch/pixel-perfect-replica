// Central API configuration. Set these in a .env file when the Express backend is ready:
//   VITE_API_BASE_URL=http://localhost:5000/api
//   VITE_USE_MOCK=false
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
export const USE_MOCK = (import.meta.env.VITE_USE_MOCK ?? "true") !== "false";
