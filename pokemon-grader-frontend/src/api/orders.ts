// // src/api/orders.ts
// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

// export async function quoteOrder(lines) {
//   const r = await fetch(`${API_BASE}/api/orders/quote`, {
//     method: "POST", headers: {"Content-Type":"application/json"},
//     body: JSON.stringify({ items: lines }),
//   });
//   if (!r.ok) throw new Error(`Quote failed: ${r.status}`); 
//   return r.json();
// }

// export async function createOrder(email, lines) {
//   const r = await fetch(`${API_BASE}/api/orders`, {
//     method: "POST", headers: {"Content-Type":"application/json"},
//     body: JSON.stringify({ email, items: lines }),
//   });
//   if (!r.ok) throw new Error(await r.text());
//   return r.json();
// }
// src/api/orders.ts


// const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:8080";
const BASE = import.meta.env.VITE_API_BASE || "http://localhost:8081";

export type OrderLine = { productId: string; quantity: number };

export async function quoteOrder(lines: OrderLine[]) {
  const res = await fetch(`${BASE}/api/orders/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: lines }),
  });
  if (!res.ok) throw new Error(`Quote failed: ${res.status}`);
  return res.json();
}

type Address = {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
};

export async function createOrder(
  email: string,
  lines: OrderLine[],
  shippingAddress: Address,
  billingAddress: Address
) {
  const payload = { email, items: lines, shippingAddress, billingAddress };

  const res = await fetch(`${BASE}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    // Try to parse JSON {error,message,...}; otherwise show raw text
    const text = await res.text();
    try {
      const j = JSON.parse(text);
      // When insufficient stock etc.
      if (j.error === "INSUFFICIENT_STOCK" && j.name) {
        throw new Error(
          `Not enough stock for “${j.name}”. Available: ${j.available}, requested: ${j.requested}.`
        );
      }
      throw new Error(j.message || `Order failed (${res.status})`);
    } catch {
      throw new Error(text || `Order failed (${res.status})`);
    }
  }

  return res.json();
}
