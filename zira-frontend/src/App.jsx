import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthCallback from "./pages/AuthCallback";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import ContactUs from "./pages/ContactUs";

import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import Products from "./pages/admin/Products";
import Blogs from "./pages/admin/Blogs";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import MyOrdersAdmin from "./pages/admin/MyOrdersAdmin";

import TopNav from "./components/TopNav";
import AdminShell from "./components/AdminShell";
import Footer from "./components/Footer";
import { RequireAuth, RequireAdmin, RedirectIfLoggedIn } from "./routes/guards";

function PublicPage({ children }) {
  return (
    <>
      <TopNav />
      <div style={{ minHeight: "60vh" }}>{children}</div>
      <Footer />
    </>
  );
}

function CustomerPage({ children }) {
  return (
    <>
      <TopNav />
      <div style={{ minHeight: "60vh" }}>{children}</div>
      <Footer />
    </>
  );
}

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
      <Route path="/" element={<PublicPage><Home /></PublicPage>} />
      <Route path="/login" element={<RedirectIfLoggedIn><Login /></RedirectIfLoggedIn>} />
      <Route path="/signup" element={<RedirectIfLoggedIn><Signup /></RedirectIfLoggedIn>} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Public informational pages */}
      <Route path="/about" element={<PublicPage><AboutUs /></PublicPage>} />
      <Route path="/faq" element={<PublicPage><FAQ /></PublicPage>} />
      <Route path="/privacy-policy" element={<PublicPage><PrivacyPolicy /></PublicPage>} />
      <Route path="/terms" element={<PublicPage><TermsAndConditions /></PublicPage>} />
      <Route path="/contact" element={<PublicPage><ContactUs /></PublicPage>} />

      {/* Customer storefront */}
      <Route
        path="/shop"
        element={
          <RequireAuth>
            <CustomerPage>
              <Shop onAddToCart={addToCart} />
            </CustomerPage>
          </RequireAuth>
        }
      />
      <Route
        path="/cart"
        element={
          <RequireAuth>
            <CustomerPage>
              <Cart cart={cart} setCart={setCart} />
            </CustomerPage>
          </RequireAuth>
        }
      />
      <Route
        path="/orders"
        element={
          <RequireAuth>
            <CustomerPage>
              <MyOrders />
            </CustomerPage>
          </RequireAuth>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <CustomerPage>
              <Profile />
            </CustomerPage>
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

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
