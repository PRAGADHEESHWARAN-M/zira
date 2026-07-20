import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, LogOut } from "lucide-react";
import { Logo } from "./ui";
import { useAuth } from "../context/AuthContext";

export default function TopNav({ cartCount }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const items = [
    ["/shop", "Shop"],
    ["/orders", "My Orders"],
    ["/profile", "My Profile"],
  ];

  return (
    <div style={{ borderBottom: "1px solid #2d3d4f", position: "sticky", top: 0, background: "#0f1419", zIndex: 10 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}>
        <Link to="/shop"><Logo /></Link>
        <div style={{ display: "flex", gap: 26, alignItems: "center" }}>
          {items.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              style={{
                fontSize: 13, letterSpacing: ".04em", color: pathname === to ? "#87ceeb" : "#d4dce6",
                borderBottom: pathname === to ? "1px solid #87ceeb" : "1px solid transparent", paddingBottom: 4,
              }}
            >
              {label}
            </Link>
          ))}
          <Link to="/cart" style={{ position: "relative" }}>
            <ShoppingBag size={19} color={pathname === "/cart" ? "#87ceeb" : "#d4dce6"} />
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: -8, right: -10, background: "#4a90e2", color: "#0f1419", fontSize: 10, borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {cartCount}
              </span>
            )}
          </Link>
          <span style={{ fontSize: 12, color: "#8fa3b5" }}>Hi, {user?.name?.split(" ")[0]}</span>
          <LogOut size={16} style={{ cursor: "pointer", color: "#8fa3b5" }} onClick={() => { logout(); navigate("/login"); }} />
        </div>
      </div>
    </div>
  );
}
