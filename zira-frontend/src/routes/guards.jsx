import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Logo } from "../components/ui";

export function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <CenteredLogo />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export function RequireAdmin({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <CenteredLogo />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/shop" replace />;
  return children;
}

export function RedirectIfLoggedIn({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <CenteredLogo />;
  if (user) return <Navigate to={user.role === "admin" ? "/admin" : "/shop"} replace />;
  return children;
}

function CenteredLogo() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Logo size={34} />
    </div>
  );
}
