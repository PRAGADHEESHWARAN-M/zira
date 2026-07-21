import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { currency } from "../components/ui";
import { api } from "../api/client";

export default function Cart({ cart, setCart }) {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const total = cart.reduce((s, l) => s + l.product.price * l.qty, 0);
  const updateQty = (id, qty) => setCart(cart.map((c) => (c.product._id === id ? { ...c, qty: Math.max(1, qty) } : c)));
  const remove = (id) => setCart(cart.filter((c) => c.product._id !== id));

  const placeOrder = async () => {
    setBusy(true);
    setError("");
    try {
      await api.checkout(cart.map((c) => ({ productId: c.product._id, qty: c.qty })));
      setCart([]);
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Checkout failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 20px" }}>
      <p className="serif" style={{ fontSize: 30, marginBottom: 24 }}>Your Bag</p>
      {cart.length === 0 && <p style={{ color: "var(--muted)" }}>Your bag is empty.</p>}
      {cart.map((l) => (
        <div key={l.product._id} className="card" style={{ display: "flex", alignItems: "center", gap: 16, padding: 16, marginBottom: 12 }}>
          <div style={{ fontSize: 26, color: "var(--apricot)" }}>{l.product.icon || "◆"}</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14 }}>{l.product.name}</p>
            <p style={{ fontSize: 12, color: "var(--muted)" }}>{currency(l.product.price)} each</p>
          </div>
          <input
            type="number" min="1" value={l.qty}
            onChange={(e) => updateQty(l.product._id, Number(e.target.value))}
            className="input" style={{ width: 56, textAlign: "center", padding: 6 }}
          />
          <Trash2 size={16} style={{ cursor: "pointer", color: "var(--muted)" }} onClick={() => remove(l.product._id)} />
        </div>
      ))}
      {error && <p style={{ color: "var(--danger)", fontSize: 13, marginTop: 10 }}>{error}</p>}
      {cart.length > 0 && (
        <div style={{ textAlign: "right", marginTop: 20 }}>
          <p className="serif" style={{ fontSize: 22, marginBottom: 14 }}>
            Total: <span style={{ color: "var(--apricot-light)" }}>{currency(total)}</span>
          </p>
          <button className="btn btn-solid" onClick={placeOrder} disabled={busy}>
            {busy ? "Placing order…" : "Place Order"}
          </button>
        </div>
      )}
    </div>
  );
}
