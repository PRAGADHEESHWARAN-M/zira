import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import { currency, StatusPill } from "../components/ui";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.myOrders().then(setOrders);
    api.listProducts().then(setProducts);
  }, []);

  const productName = (id) => products.find((p) => p._id === id)?.name || "Item";

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px" }}>
      <p className="serif" style={{ fontSize: 30, marginBottom: 24 }}>My Orders</p>
      {orders.length === 0 && <p style={{ color: "var(--muted)" }}>No orders yet.</p>}
      {orders.map((o) => (
        <div key={o._id} className="card" style={{ padding: 18, marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
            <span className="serif" style={{ fontSize: 17, color: "var(--apricot-light)" }}>{o.orderNumber}</span>
            <StatusPill status={o.status} />
          </div>
          <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>{new Date(o.createdAt).toLocaleDateString()}</p>
          <ul style={{ fontSize: 13, color: "#d5cce0", marginBottom: 8, paddingLeft: 18 }}>
            {o.items.map((it, i) => <li key={i}>{productName(it.productId)} × {it.qty}</li>)}
          </ul>
          <p style={{ fontSize: 14 }}>Total: <b style={{ color: "var(--apricot-light)" }}>{currency(o.total)}</b></p>
        </div>
      ))}
    </div>
  );
}
