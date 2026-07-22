import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, Star } from "lucide-react";
import { api } from "../api/client";
import { currency } from "../components/ui";

export default function Wishlist({ onAddToCart }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getWishlist().then((data) => {
      setWishlist(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const remove = async (productId) => {
    const updated = await api.removeFromWishlist(productId);
    setWishlist(updated);
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px", textAlign: "center" }}>
        <p style={{ color: "var(--muted)" }}>Loading your wishlist…</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
        <Heart size={24} style={{ color: "var(--apricot)" }} />
        <p className="serif" style={{ fontSize: 30 }}>Your Wishlist</p>
        <span style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>
          ({wishlist.length} {wishlist.length === 1 ? "item" : "items"})
        </span>
      </div>

      {wishlist.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <Heart size={48} style={{ color: "var(--muted)", marginBottom: 16, opacity: 0.4 }} />
          <p style={{ color: "var(--muted)", marginBottom: 16, fontSize: 16 }}>
            Your wishlist is empty.
          </p>
          <Link to="/shop" className="btn btn-solid" style={{ padding: "10px 24px" }}>
            Browse Products
          </Link>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 20 }}>
        {wishlist.map((product) => (
          <div key={product._id} className="card" style={{ padding: 16, position: "relative" }}>
            {/* Remove button */}
            <button
              onClick={() => remove(product._id)}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "rgba(0,0,0,0.3)",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--muted)",
                zIndex: 2,
              }}
            >
              <Trash2 size={14} />
            </button>

            {/* Image */}
            <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  loading="lazy"
                  style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 6 }}
                />
              ) : (
                <div style={{ fontSize: 40, textAlign: "center", color: "var(--apricot)" }}>
                  {product.icon || "◆"}
                </div>
              )}
            </div>

            {/* Brand */}
            <p style={{ fontSize: 10, color: "var(--muted)", letterSpacing: ".05em", marginBottom: 4 }}>
              {product.brand || "Zira"}
            </p>

            {/* Name */}
            <p style={{ fontSize: 14, fontWeight: "500", marginBottom: 6 }}>{product.name}</p>

            {/* Price */}
            <p className="serif" style={{ fontSize: 18, color: "var(--apricot-light)", marginBottom: 10 }}>
              {currency(product.price)}
            </p>

            {/* Add to Cart */}
            <button
              className="btn"
              style={{ width: "100%", padding: "8px 12px", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
              onClick={() => onAddToCart(product)}
            >
              <ShoppingBag size={13} />
              Add to Bag
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

