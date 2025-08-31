import { api } from "./client";

export async function listProducts(storefront = false) {
  const qs = storefront ? "?storefront=true" : "";
  const { data } = await api.get(`/products${qs}`);
  return data;
}
