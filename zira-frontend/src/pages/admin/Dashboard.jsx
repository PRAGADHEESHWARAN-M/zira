import React, { useEffect, useState } from "react";
import { DollarSign, ShoppingBag, Box, Users as UsersIcon } from "lucide-react";
import { api } from "../../api/client";
import { currency, StatusPill } from "../../components/ui";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.allOrders().then(setOrders);
    api.listProducts().then(setProducts);
    api.listUsers().then(setUsers);
  }, []);

  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const stats = [
    { label: "Revenue", value: currency(revenue), Icon: DollarSign },
    { label: "Orders", value: orders.length, Icon: ShoppingBag },
    { label: "Products", value: products.length, Icon: Box },
    { label: "Customers", value: users.length, Icon: UsersIcon },
  ];

  return (
    <div className="fade">
      <p className="serif" style={{ fontSize: 30, marginBottom: 24 }}>Dashboard</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 32 }}>
        {stats.map((s) => (
          <div key={s.label} className="card" style={{ padding: 18 }}>
            <s.Icon size={18} color="#4a90e2" style={{ marginBottom: 10 }} />
            <p className="serif" style={{ fontSize: 24, color: "#87ceeb" }}>{s.value}</p>
            <p style={{ fontSize: 12, color: "#8fa3b5" }}>{s.label}</p>
          </div>
        ))}
      </div>
      <p className="serif" style={{ fontSize: 20, marginBottom: 14 }}>Recent Orders</p>
      <div className="card" style={{ padding: 4 }}>
        {orders.slice(0, 5).map((o) => (
          <div key={o._id} style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid #2d3d4f", fontSize: 13, flexWrap: "wrap", gap: 8 }}>
            <span style={{ color: "#87ceeb" }}>{o.orderNumber}</span>
            <span style={{ color: "#d4dce6" }}>{o.userId?.name || "—"}</span>
            <span>{currency(o.total)}</span>
            <StatusPill status={o.status} />
          </div>
        ))}
        {orders.length === 0 && <p style={{ padding: 16, color: "#8fa3b5" }}>No orders yet.</p>}
      </div>
    </div>
  );
}
