import React, { useEffect, useState } from "react";
import { api } from "../../api/client";
import { currency, StatusPill } from "../../components/ui";

export default function MyOrdersAdmin() {
  const [orders, setOrders] = useState([]);
  useEffect(() => { api.myOrders().then(setOrders); }, []);

  return (
    <div className="fade">
      <p className="serif" style={{ fontSize: 30, marginBottom: 24 }}>My Orders</p>
      {orders.length === 0 && <p style={{ color: "#8fa3b5" }}>No orders yet — Zira admins can shop too.</p>}
      {orders.map((o) => (
        <div key={o._id} className="card" style={{ padding: 18, marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
            <span className="serif" style={{ fontSize: 17, color: "#87ceeb" }}>{o.orderNumber}</span>
            <StatusPill status={o.status} />
          </div>
          <p style={{ fontSize: 12, color: "#8fa3b5", marginBottom: 8 }}>{new Date(o.createdAt).toLocaleDateString()}</p>
          <p style={{ fontSize: 14 }}>Total: <b style={{ color: "#87ceeb" }}>{currency(o.total)}</b></p>
        </div>
      ))}
    </div>
  );
}
