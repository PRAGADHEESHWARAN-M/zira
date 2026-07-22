import React, { useEffect, useState } from "react";
import { DollarSign, ShoppingBag, Box, Users as UsersIcon, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { api } from "../../api/client";
import { currency, StatusPill } from "../../components/ui";

// Simple inline bar chart using pure SVG
function BarChart({ data, height = 120, color = "var(--apricot-light)" }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const barW = Math.min(30, (600 / data.length) - 4);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height, paddingTop: 8 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 9, color: "var(--muted)" }}>{d.value}</span>
          <div
            style={{
              width: "100%",
              height: `${(d.value / max) * (height - 30)}px`,
              background: d.color || color,
              borderRadius: "3px 3px 0 0",
              minHeight: 4,
              transition: "height 0.5s",
              opacity: 0.85,
            }}
          />
          <span style={{ fontSize: 8, color: "var(--muted)", textAlign: "center", whiteSpace: "nowrap" }}>
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

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
  const avgOrderValue = orders.length > 0 ? revenue / orders.length : 0;
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;

  // Calculate growth (compare first half vs second half of orders)
  const ordersSorted = [...orders].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const midPoint = Math.floor(ordersSorted.length / 2);
  const firstHalf = ordersSorted.slice(0, midPoint);
  const secondHalf = ordersSorted.slice(midPoint);
  const firstHalfRev = firstHalf.reduce((s, o) => s + o.total, 0);
  const secondHalfRev = secondHalf.reduce((s, o) => s + o.total, 0);
  const growthRate = firstHalfRev > 0 ? ((secondHalfRev - firstHalfRev) / firstHalfRev * 100).toFixed(1) : 0;

  // Monthly revenue data for chart
  const monthlyMap = {};
  orders.forEach((o) => {
    const d = new Date(o.createdAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    monthlyMap[key] = (monthlyMap[key] || 0) + o.total;
  });
  const monthlyData = Object.entries(monthlyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([label, value]) => ({ label: label.slice(-2), value }));

  // Order status distribution
  const statusCount = {};
  orders.forEach((o) => { statusCount[o.status] = (statusCount[o.status] || 0) + 1; });
  const statusColors = {
    Pending: "var(--apricot)",
    Processing: "#60a5fa",
    Shipped: "var(--apricot-light)",
    "Out for Delivery": "#34d399",
    Delivered: "var(--success)",
    Cancelled: "#ef4444",
  };

  const stats = [
    { label: "Total Revenue", value: currency(revenue), Icon: DollarSign, sub: `${growthRate}% growth` },
    { label: "Total Orders", value: orders.length, Icon: ShoppingBag, sub: `${pendingOrders} pending` },
    { label: "Avg Order Value", value: currency(avgOrderValue), Icon: TrendingUp, sub: "per order" },
    { label: "Products", value: products.length, Icon: Box, sub: "in catalog" },
    { label: "Customers", value: users.length, Icon: UsersIcon, sub: "registered" },
    { label: "Delivered", value: deliveredOrders, Icon: Calendar, sub: `${((deliveredOrders / (orders.length || 1)) * 100).toFixed(0)}% rate` },
  ];

  // Top selling products (by qty ordered)
  const productSales = {};
  orders.forEach((o) => {
    o.items.forEach((it) => {
      const pid = typeof it.productId === "object" ? it.productId?._id || it.productId : it.productId;
      productSales[pid] = (productSales[pid] || 0) + it.qty;
    });
  });
  const topProducts = Object.entries(productSales)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([id, qty]) => {
      const p = products.find((pr) => pr._id === id);
      return { name: p?.name || "Unknown", qty };
    });

  return (
    <div className="fade">
      <p className="serif" style={{ fontSize: 30, marginBottom: 6 }}>Analytics Dashboard</p>
      <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 24 }}>Your store at a glance</p>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 28 }}>
        {stats.map((s) => (
          <div key={s.label} className="card" style={{ padding: 16 }}>
            <s.Icon size={16} color="var(--apricot)" style={{ marginBottom: 8 }} />
            <p className="serif" style={{ fontSize: 20, color: "var(--apricot-light)", marginBottom: 2 }}>{s.value}</p>
            <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 0 }}>{s.label}</p>
            <p style={{ fontSize: 9, color: growthRate > 0 ? "var(--success)" : "var(--muted)" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        {/* Revenue Chart */}
        <div className="card" style={{ padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontSize: 13, color: "var(--apricot)", fontWeight: 500 }}>Revenue Trend</p>
            <span style={{ fontSize: 10, color: "var(--muted)" }}>Last 6 months</span>
          </div>
          {monthlyData.length > 0 ? (
            <BarChart data={monthlyData} height={130} />
          ) : (
            <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", padding: 20 }}>No revenue data yet.</p>
          )}
        </div>

        {/* Order Status Distribution */}
        <div className="card" style={{ padding: 18 }}>
          <p style={{ fontSize: 13, color: "var(--apricot)", fontWeight: 500, marginBottom: 14 }}>Order Status</p>
          {Object.keys(statusCount).length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {Object.entries(statusCount).map(([status, count]) => {
                const pct = ((count / orders.length) * 100).toFixed(0);
                return (
                  <div key={status}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
                      <span style={{ color: statusColors[status] || "var(--muted)" }}>{status}</span>
                      <span style={{ color: "var(--muted)" }}>{count} ({pct}%)</span>
                    </div>
                    <div style={{ height: 6, background: "var(--line)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: statusColors[status] || "var(--apricot)", borderRadius: 3, transition: "width 0.5s" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", padding: 20 }}>No orders yet.</p>
          )}
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="card" style={{ padding: 18, marginBottom: 28 }}>
        <p style={{ fontSize: 13, color: "var(--apricot)", fontWeight: 500, marginBottom: 14 }}>Top Selling Products</p>
        {topProducts.length > 0 ? (
          <div style={{ display: "grid", gap: 8 }}>
            {topProducts.map((p, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "var(--panel)", borderRadius: 4, fontSize: 13 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "var(--apricot)", fontSize: 11 }}>#{i + 1}</span>
                  {p.name}
                </span>
                <span style={{ color: "var(--apricot-light)" }}>{p.qty} sold</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", padding: 20 }}>No sales data yet.</p>
        )}
      </div>

      {/* Recent Orders */}
      <p className="serif" style={{ fontSize: 18, marginBottom: 12 }}>Recent Orders</p>
      <div className="card" style={{ padding: 4 }}>
        {orders.slice(0, 5).map((o) => (
          <div key={o._id} style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid var(--line)", fontSize: 13, flexWrap: "wrap", gap: 8 }}>
            <span style={{ color: "var(--apricot-light)" }}>{o.orderNumber}</span>
            <span style={{ color: "#d5cce0" }}>{o.userId?.name || "—"}</span>
            <span>{currency(o.total)}</span>
            <StatusPill status={o.status} />
          </div>
        ))}
        {orders.length === 0 && <p style={{ padding: 16, color: "var(--muted)" }}>No orders yet.</p>}
      </div>
    </div>
  );
}

