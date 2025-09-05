// src/api/orders.ts
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export async function quoteOrder(lines) {
  const r = await fetch(`${API_BASE}/api/orders/quote`, {
    method: "POST", headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ items: lines }),
  });
  if (!r.ok) throw new Error(`Quote failed: ${r.status}`); 
  return r.json();
}

export async function createOrder(email, lines) {
  const r = await fetch(`${API_BASE}/api/orders`, {
    method: "POST", headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ email, items: lines }),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
