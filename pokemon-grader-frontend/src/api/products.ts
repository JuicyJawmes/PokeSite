// import { api } from "./client";

// export type Product = {
//   id?: string;
//   name: string;
//   type: "single" | "sealed";
//   imageUrl: string;
//   price: number;
//   quantity: number;
// };

// export async function listProducts(storefront = false) {
//   const qs = storefront ? "?storefront=true" : "";
//   const { data } = await api.get(`/products${qs}`);
//   return data; // [{id,name,imageUrl,price,quantity,...}]
// }

// export async function getProduct(id: string): Promise<Product> {
//   const { data } = await api.get<Product>(`/products/${id}`);
//   return data;
// }

// export async function createProduct(p: Product): Promise<Product> {
//   const { data } = await api.post<Product>("/products", p);
//   return data;
// }

// export async function updateProduct(id: string, p: Product): Promise<Product> {
//   const { data } = await api.put<Product>(`/products/${id}`, p);
//   return data;
// }

// export async function deleteProduct(id: string): Promise<void> {
//   await api.delete(`/products/${id}`);
// }
// src/api/products.ts
import { api } from "./client";

export type Product = {
  id?: string;
  name: string;
  type: "single" | "sealed";
  imageUrl: string;
  price: number;
  quantity: number;
};

// Fallback image (kept client-side; server can still return its own URL)
const FALLBACK_IMG =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

// Normalize any server shape into our Product type
function normalizeProduct(x: any): Product {
  const price =
    typeof x?.price === "number"
      ? x.price
      : typeof x?.marketValue === "number"
      ? x.marketValue
      : typeof x?.market_value === "number"
      ? x.market_value
      : 0;

  const qty =
    typeof x?.quantity === "number"
      ? x.quantity
      : typeof x?.qty === "number"
      ? x.qty
      : 0;

  const img =
    x?.imageUrl && String(x.imageUrl).trim()
      ? x.imageUrl
      : x?.image && String(x.image).trim()
      ? x.image
      : FALLBACK_IMG;

  const type: "single" | "sealed" =
    x?.type === "sealed" ? "sealed" : "single";

  return {
    id: x?.id ?? x?.sku ?? x?.docId,
    name: x?.name ?? x?.title ?? "Product",
    type,
    imageUrl: img,
    price: Number(price) || 0,
    quantity: Number(qty) || 0,
  };
}

// Helper to build the path. `api.baseURL` already points at `/api`, so
// build paths relative to that base to avoid double `/api` in requests.
const path = (p: string) => p;

export async function listProducts(storefront = false): Promise<Product[]> {
  const qs = storefront ? "?storefront=true" : "";
  const { data } = await api.get<any[]>(path(`/products${qs}`));
  return (Array.isArray(data) ? data : []).map(normalizeProduct);
}

export async function getProduct(id: string): Promise<Product> {
  const { data } = await api.get<any>(path(`/products/${id}`));
  return normalizeProduct(data);
}

export async function createProduct(p: Product): Promise<Product> {
  const { data } = await api.post<any>(path(`/products`), p);
  return normalizeProduct(data);
}

export async function updateProduct(id: string, p: Product): Promise<Product> {
  const { data } = await api.put<any>(path(`/products/${id}`), p);
  return normalizeProduct(data);
}

export async function deleteProduct(id: string): Promise<void> {
  await api.delete(path(`/products/${id}`));
}
