import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";

import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import Products from "./pages/admin/Products";
import Blogs from "./pages/admin/Blogs";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import MyOrdersAdmin from "./pages/admin/MyOrdersAdmin";

import TopNav from "./components/TopNav";
import AdminShell from "./components/AdminShell";
import { RequireAuth, RequireAdmin, RedirectIfLoggedIn } from "./routes/guards";

export default function App() {
  const [cart, setCart] = useState([]); // [{ product, qty }]

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((c) => c.product._id === product._id);
      return found
        ? prev.map((c) => (c.product._id === product._id ? { ...c, qty: c.qty + 1 } : c))
        : [...prev, { product, qty: 1 }];
    });
  };
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <Routes>
      <Route path="/login" element={<RedirectIfLoggedIn><Login /></RedirectIfLoggedIn>} />
      <Route path="/signup" element={<RedirectIfLoggedIn><Signup /></RedirectIfLoggedIn>} />

      {/* Customer storefront */}
      <Route
        path="/shop"
        element={
          <RequireAuth>
            <TopNav cartCount={cartCount} />
            <Shop onAddToCart={addToCart} />
          </RequireAuth>
        }
      />
      <Route
        path="/cart"
        element={
          <RequireAuth>
            <TopNav cartCount={cartCount} />
            <Cart cart={cart} setCart={setCart} />
          </RequireAuth>
        }
      />
      <Route
        path="/orders"
        element={
          <RequireAuth>
            <TopNav cartCount={cartCount} />
            <MyOrders />
          </RequireAuth>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <TopNav cartCount={cartCount} />
            <Profile />
          </RequireAuth>
        }
      />

      {/* Admin panel */}
      <Route path="/admin" element={<RequireAdmin><AdminShell><Dashboard /></AdminShell></RequireAdmin>} />
      <Route path="/admin/profile" element={<RequireAdmin><AdminShell><Profile /></AdminShell></RequireAdmin>} />
      <Route path="/admin/my-orders" element={<RequireAdmin><AdminShell><MyOrdersAdmin /></AdminShell></RequireAdmin>} />
      <Route path="/admin/users" element={<RequireAdmin><AdminShell><Users /></AdminShell></RequireAdmin>} />
      <Route path="/admin/categories" element={<RequireAdmin><AdminShell><Categories /></AdminShell></RequireAdmin>} />
      <Route path="/admin/products" element={<RequireAdmin><AdminShell><Products /></AdminShell></RequireAdmin>} />
      <Route path="/admin/blogs" element={<RequireAdmin><AdminShell><Blogs /></AdminShell></RequireAdmin>} />
      <Route path="/admin/orders" element={<RequireAdmin><AdminShell><Orders /></AdminShell></RequireAdmin>} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
