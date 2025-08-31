/// <reference types="vite/client" />
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api", // Vite proxy -> :8080
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});
