import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, User, Package, Tag, Box, FileText, Users as UsersIcon,
  ShoppingBag, LogOut,
} from "lucide-react";
import { Logo } from "./ui";
import { useAuth } from "../context/AuthContext";

const NAV = [
  ["/admin", "Dashboard", LayoutDashboard],
  ["/admin/profile", "My Profile", User],
  ["/admin/my-orders", "My Orders", Package],
  ["/admin/users", "Users", UsersIcon],
  ["/admin/categories", "Categories", Tag],
  ["/admin/products", "Products", Box],
  ["/admin/blogs", "Blogs", FileText],
  ["/admin/orders", "Orders", ShoppingBag],
];

export default function AdminShell({ children }) {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div className="card" style={{ width: 230, flexShrink: 0, padding: "24px 16px", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
        <div style={{ marginBottom: 30, paddingLeft: 6 }}><Logo size={26} /></div>
        {NAV.map(([to, label, Icon]) => {
          const active = pathname === to;
          return (
            <Link
              key={to} to={to}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "11px 12px",
                color: active ? "#0f1419" : "#d4dce6", background: active ? "#4a90e2" : "transparent",
                fontSize: 13, marginBottom: 3,
              }}
            >
              <Icon size={15} /> {label}
            </Link>
          );
        })}
        <div className="hairline" style={{ margin: "14px 0" }} />
        <div
          onClick={() => { logout(); navigate("/login"); }}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 12px", cursor: "pointer", color: "#e74c3c", fontSize: 13 }}
        >
          <LogOut size={15} /> Logout
        </div>
      </div>
      <div style={{ flex: 1, padding: "34px 32px", maxWidth: 1000 }}>{children}</div>
    </div>
  );
}
