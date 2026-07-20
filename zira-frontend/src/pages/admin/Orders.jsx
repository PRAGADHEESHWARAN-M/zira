import React, { useEffect, useState } from "react";
import { api } from "../../api/client";
import { currency, StatusPill } from "../../components/ui";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const load = () => api.allOrders().then(setOrders);
  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    await api.updateOrderStatus(id, status);
    load();
  };

  return (
    <div className="fade">
      <p className="serif" style={{ fontSize: 30, marginBottom: 24 }}>All Orders</p>
      <div className="card" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2d3d4f", color: "#8fa3b5", textAlign: "left" }}>
              <th style={{ padding: 12 }}>Order</th>
              <th style={{ padding: 12 }}>Customer</th>
              <th style={{ padding: 12 }}>Date</th>
              <th style={{ padding: 12 }}>Total</th>
              <th style={{ padding: 12 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} style={{ borderBottom: "1px solid #1f2d3c" }}>
                <td style={{ padding: 12, color: "#87ceeb" }}>{o.orderNumber}</td>
                <td style={{ padding: 12, color: "#d4dce6" }}>{o.userId?.name || "—"}</td>
                <td style={{ padding: 12, color: "#d4dce6" }}>{new Date(o.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: 12, color: "#d4dce6" }}>{currency(o.total)}</td>
                <td style={{ padding: 12 }}>
                  <select className="input" style={{ padding: "5px 8px", fontSize: 12 }} value={o.status} onChange={(e) => setStatus(o._id, e.target.value)}>
                    <option>Pending</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && <tr><td colSpan={5} style={{ padding: 16, color: "#8fa3b5" }}>No orders.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
