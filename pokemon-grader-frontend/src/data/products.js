// import { api } from "./client";

// export async function listProducts(storefront = false) {
//   const qs = storefront ? "?storefront=true" : "";
//   const { data } = await api.get(`/products${qs}`);
//   return data;
// }
import { api } from "./client";

/** All products (optionally storefront-only) */
export async function listProducts(storefront = false) {
  const qs = storefront ? "?storefront=true" : "";
  const { data } = await api.get(`/products${qs}`);
  return data;
}

/** Filter by type (e.g., "pack", "sealed", "new") and optional set (e.g., "sv", "ss") */
export async function listProductsByType(type, { storefront = true, set } = {}) {
  const params = new URLSearchParams();
  if (storefront) params.set("storefront", "true");
  if (type) params.set("type", type);
  if (set) params.set("set", set); // only if your backend supports it

  const { data } = await api.get(`/products?${params.toString()}`);
  return data; // [{ id, name/title, imageUrl/image, price, quantity, set, ... }]
}
