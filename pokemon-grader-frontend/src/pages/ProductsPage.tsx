import { useEffect, useState } from "react";
import { listProducts, createProduct, Product } from "../api/products";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await listProducts();
        setProducts(data);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load products");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addSample = async () => {
    try {
      const created = await createProduct({
        name: "Pikachu V",
        type: "single",
        imageUrl: "https://example.com/pika.jpg",
        price: 19.99,
        quantity: 5,
      });
      setProducts((prev) => [created, ...prev]);
    } catch (e: any) {
      alert(e?.response?.data?.error ?? e.message);
    }
  };

  if (loading) return <div>Loading…</div>;
  if (error) return <div>Oops: {error}</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Products</h1>
      <button onClick={addSample}>Add Sample Product</button>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <img src={p.imageUrl} alt={p.name} width={48} height={48} style={{objectFit:"cover"}}/>
            <div>
              <strong>{p.name}</strong> — ${p.price.toFixed(2)} ({p.type}) x {p.quantity}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
