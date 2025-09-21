const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:8080";

export async function createPaymentIntent(items) {
  const res = await fetch(`${API_BASE}/api/payments/create-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) throw new Error(`Create intent failed: ${res.status}`);
  return res.json(); // { clientSecret, paymentIntentId, total }
}
