// src/pages/ConfirmationPage.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useParams } from "react-router-dom";

const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:8080";

const PageWrapper = styled.div`
  padding: 2rem;
  background: #030f2d;
  min-height: 100vh;
  color: white;
  text-align: center;
`;

const Card = styled.div`
  max-width: 720px;
  margin: 1.5rem auto 0;
  text-align: left;
  background: #0a1f44;
  border-radius: 14px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: .4rem 0;
  font-weight: 600;
`;

const Muted = styled.div`
  color: #bcd1ff;
  font-size: .95rem;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid rgba(255,255,255,.15);
  margin: 1rem 0;
`;

function useOrderId() {
  const { orderId: paramId } = useParams();
  const { search } = useLocation();
  const queryId = new URLSearchParams(search).get("id");
  const storedId = typeof window !== "undefined" ? sessionStorage.getItem("lastOrderId") : null;
  return paramId || queryId || storedId || null;
}

export default function ConfirmationPage() {
  const id = useOrderId();
  const [order, setOrder] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await fetch(`${API_BASE}/api/orders/${id}`);
        if (!res.ok) throw new Error(`Failed to load order (${res.status})`);
        const data = await res.json();
        if (!cancelled) setOrder(data);
      } catch (e) {
        if (!cancelled) setErr(e.message || "Failed to load order");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  return (
    <PageWrapper>
      <h1>🎉 Order Confirmed!</h1>
      {!id && (
        <>
          <p>We couldn’t find an order id. If you just placed an order, please try again from your cart.</p>
          <Link to="/" style={{ color: "#fff700", fontWeight: "bold" }}>Return Home</Link>
          <Card><Muted>Tip: if you navigate here without an id, store it in sessionStorage:
            <br/> <code>sessionStorage.setItem("lastOrderId", order.id)</code></Muted></Card>
        </>
      )}

      {id && (
        <>
          <p>Thank you! Your order <code style={{ color:"#fff700" }}>{id}</code> has been placed.</p>

          {loading && <Muted>Loading order details…</Muted>}
          {err && <div style={{ color: "#ff6b6b", fontWeight: 700 }}>Error: {err}</div>}

          {order && (
            <Card>
              <h3 style={{ marginTop: 0 }}>Order Summary</h3>
              <Muted>Placed: {order.createdAt ? new Date(order.createdAt).toLocaleString() : "—"}</Muted>

              <Divider />

              <div>
                {order.items?.map((i) => (
                  <Row key={i.productId}>
                    <span>{i.name} ×{i.quantity}</span>
                    <span>${(i.price * i.quantity).toFixed(2)}</span>
                  </Row>
                ))}
              </div>

              <Divider />

              <Row>
                <span>Subtotal</span>
                <span>${(order.subtotal ?? 0).toFixed(2)}</span>
              </Row>
              <Row>
                <span>Shipping</span>
                <span>{(order.shipping ?? 0) === 0 ? "Free" : `$${(order.shipping ?? 0).toFixed(2)}`}</span>
              </Row>
              <Row>
                <span>Tax</span>
                <span>${(order.tax ?? 0).toFixed(2)}</span>
              </Row>

              <Divider />

              <Row style={{ fontSize: "1.15rem" }}>
                <span>Total</span>
                <span>${(order.total ?? 0).toFixed(2)}</span>
              </Row>

              {order.email && (
                <>
                  <Divider />
                  <Muted>Confirmation sent to: {order.email}</Muted>
                </>
              )}
            </Card>
          )}

          <p style={{ marginTop: "1.25rem" }}>
            <Link to="/" style={{ color: "#fff700", fontWeight: "bold" }}>Return Home</Link>
          </p>
        </>
      )}
    </PageWrapper>
  );
}
