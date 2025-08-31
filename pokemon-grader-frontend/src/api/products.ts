import { api } from "./client";

export type Product = {
  id?: string;
  name: string;
  type: "single" | "sealed";
  imageUrl: string;
  price: number;
  quantity: number;
};

export async function listProducts(storefront = false) {
  const qs = storefront ? "?storefront=true" : "";
  const { data } = await api.get(`/products${qs}`);
  return data; // [{id,name,imageUrl,price,quantity,...}]
}

export async function getProduct(id: string): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}

export async function createProduct(p: Product): Promise<Product> {
  const { data } = await api.post<Product>("/products", p);
  return data;
}

export async function updateProduct(id: string, p: Product): Promise<Product> {
  const { data } = await api.put<Product>(`/products/${id}`, p);
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  await api.delete(`/products/${id}`);
}
