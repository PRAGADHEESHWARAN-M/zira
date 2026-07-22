import React, { useEffect, useState } from "react";
import { Search, Star, Filter, Heart } from "lucide-react";
import { api } from "../api/client";
import { currency, Modal } from "../components/ui";

export default function Shop({ onAddToCart }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [active, setActive] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [wishlist, setWishlist] = useState([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    api.listCategories().then(setCategories);
  }, []);

  useEffect(() => {
    api.getWishlist().then(setWishlist).catch(() => {});
  }, []);

  useEffect(() => {
    const params = {};
    if (cat !== "all") params.category = cat;
    if (q) params.q = q;
    api.listProducts(params).then(setProducts);
  }, [cat, q]);

  const filteredProducts = products
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const toggleWishlist = async (e, productId) => {
    e.stopPropagation();
    try {
      const inWishlist = wishlist.some((p) => p._id === productId);
      const updated = inWishlist
        ? await api.removeFromWishlist(productId)
        : await api.addToWishlist(productId);
      setWishlist(updated);
    } catch (err) {
      // silently fail
    }
  };

  const safeImage = (url) => {
    if (!url) return "";
    // If backend ever sends an invalid value, don't break rendering.
    if (typeof url !== "string") return "";
    return url;
  };


  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      {/* Header */}
      <div className="fade" style={{ textAlign: "center", marginBottom: 40 }}>
        <p style={{ fontSize: 11, letterSpacing: ".3em", color: "var(--apricot)", marginBottom: 10 }}>MEN'S GROOMING, ELEVATED</p>
        <p className="serif" style={{ fontSize: 44, lineHeight: 1.1, marginBottom: 8 }}>Ritual, not routine.</p>
        <p style={{ fontSize: 13, color: "var(--muted)" }}>Premium grooming essentials for the modern man</p>
      </div>

      {/* Search & Filters */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28, alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 220px" }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: 12, color: "var(--muted)" }} />
          <input 
            className="input" 
            style={{ paddingLeft: 34 }} 
            placeholder="Search products, brands, benefits..." 
            value={q} 
            onChange={(e) => setQ(e.target.value)} 
          />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <button 
            className="btn" 
            style={{ 
              padding: "8px 16px", 
              background: cat === "all" ? "var(--apricot)" : "transparent", 
              color: cat === "all" ? "var(--bg)" : "#d5cce0",
              fontSize: 12
            }} 
            onClick={() => setCat("all")}
          >
            All
          </button>
          {categories.map((c) => (
            <button 
              key={c._id} 
              className="btn" 
              style={{ 
                padding: "8px 16px", 
                background: cat === c._id ? "var(--apricot)" : "transparent", 
                color: cat === c._id ? "var(--bg)" : "#d5cce0",
                fontSize: 12
              }} 
              onClick={() => setCat(c._id)}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div style={{ marginBottom: 28, padding: "16px", background: "var(--panel)", borderRadius: "4px", display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--muted)" }}>
          <Filter size={14} />
          Price Range:
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 12 }}>{currency(priceRange[0])}</span>
          <input 
            type="range" 
            min="0" 
            max="5000" 
            step="100"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
            style={{ width: 100 }}
          />
          <span style={{ fontSize: 12 }}>{currency(priceRange[1])}</span>
          <input 
            type="range" 
            min="0" 
            max="5000" 
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            style={{ width: 100 }}
          />
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Sort:</span>
          <select
            className="input"
            style={{ padding: "6px 10px", fontSize: 12, width: "auto" }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 }}>
        {filteredProducts.map((p) => (
          <div 
            key={p._id} 
            className="card fade" 
            style={{ padding: 16, cursor: "pointer", position: "relative", transition: "transform 0.2s" }}
            onClick={() => setActive(p)}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            {/* Wishlist Heart */}
            <button
              onClick={(e) => toggleWishlist(e, p._id)}
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                background: "rgba(0,0,0,0.3)",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 2,
                color: wishlist.some((w) => w._id === p._id) ? "var(--apricot)" : "var(--muted)",
                transition: "color 0.2s",
              }}
            >
              <Heart
                size={14}
                style={{
                  fill: wishlist.some((w) => w._id === p._id) ? "var(--apricot)" : "none",
                }}
              />
            </button>

            {/* Discount Badge */}
            {p.discount > 0 && (
              <div style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "var(--apricot-light)",
                color: "var(--bg)",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: 11,
                fontWeight: "bold"
              }}>
                -{p.discount}%
              </div>
            )}

            {/* Product Image (Pexels) */}
            <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
              {p.imageUrl ? (
                <img
                  src={safeImage(p.imageUrl)}
                  alt={p.name}

                  loading="lazy"
                  style={{
                    width: "100%",
                    height: 150,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />
              ) : (
                <div style={{ fontSize: 40, textAlign: "center", color: "var(--apricot)" }}>
                  {p.icon || "◆"}
                </div>
              )}
            </div>


            {/* Brand */}
            <p style={{ fontSize: 10, color: "var(--muted)", letterSpacing: ".05em", marginBottom: 4 }}>
              {p.brand || "Zira"}
            </p>

            {/* Product Name */}
            <p style={{ fontSize: 14, fontWeight: "500", marginBottom: 8, lineHeight: 1.3 }}>
              {p.name}
            </p>

            {/* Description */}
            <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 10, minHeight: 24, lineHeight: 1.3 }}>
              {p.desc}
            </p>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10, fontSize: 11 }}>
              <div style={{ display: "flex", gap: 2 }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    style={{
                      fill: i < Math.round(p.rating) ? "var(--apricot-light)" : "none",
                      color: i < Math.round(p.rating) ? "var(--apricot-light)" : "var(--muted)",
                      cursor: "pointer"
                    }}
                  />
                ))}
              </div>
              <span style={{ color: "var(--apricot)" }}>({p.reviews})</span>
            </div>

            {/* Best For */}
            {p.bestFor && p.bestFor.length > 0 && (
              <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 10, display: "flex", gap: 4, flexWrap: "wrap" }}>
                {p.bestFor.slice(0, 2).map((bf, i) => (
                  <span key={i} style={{ background: "var(--line)", padding: "2px 6px", borderRadius: "2px" }}>
                    {bf}
                  </span>
                ))}
              </div>
            )}

            {/* Price & Size */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, fontSize: 12 }}>
              <span className="serif" style={{ fontSize: 18, color: "var(--apricot-light)" }}>
                {currency(p.price)}
              </span>
              {p.size && (
                <span style={{ color: "var(--muted)", fontSize: 10 }}>{p.size}</span>
              )}
            </div>

            {/* Add Button */}
            <button 
              className="btn" 
              style={{ padding: "8px 12px", fontSize: 11, width: "100%", marginBottom: 8 }} 
              onClick={(e) => { e.stopPropagation(); onAddToCart(p); }}
            >
              Add to Bag
            </button>

            {/* Stock Status */}
            <p style={{ fontSize: 10, color: p.stock > 10 ? "var(--muted)" : "var(--apricot-light)", textAlign: "center" }}>
              {p.stock > 10 ? "In Stock" : `Only ${p.stock} left`}
            </p>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <p style={{ color: "var(--muted)", gridColumn: "1 / -1", textAlign: "center", padding: 40 }}>
            No products match your search or price range.
          </p>
        )}
      </div>

      {/* Product Detail Modal */}
      {active && (
        <Modal title={active.name} onClose={() => setActive(null)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* Left: Image & Info */}
            <div>
              {active.imageUrl ? (
                <img
                  src={safeImage(active.imageUrl)}

                  alt={active.name}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: 260,
                    objectFit: "cover",
                    borderRadius: 8,
                    marginBottom: 16,
                  }}
                />
              ) : (
                <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20, color: "var(--apricot)" }}>
                  {active.icon || "◆"}
                </div>
              )}


              {active.discount > 0 && (
                <div style={{
                  background: "var(--apricot-light)",
                  color: "var(--bg)",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  textAlign: "center",
                  marginBottom: 12,
                  fontWeight: "bold"
                }}>
                  Save {active.discount}% Now
                </div>
              )}
            </div>

            {/* Right: Details */}
            <div>
              {/* Brand */}
              <p style={{ color: "var(--muted)", fontSize: 12, letterSpacing: ".05em", marginBottom: 8 }}>
                {active.brand || "Zira"}
              </p>

              {/* Rating */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 2 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      style={{
                      fill: i < Math.round(active.rating) ? "var(--apricot-light)" : "none",
                      color: i < Math.round(active.rating) ? "var(--apricot-light)" : "var(--muted)"
                      }}
                    />
                  ))}
                </div>
                <span style={{ color: "var(--apricot)", fontSize: 13 }}>
                  {active.rating} • {active.reviews} Reviews
                </span>
              </div>

              {/* Description */}
              <p style={{ color: "#d5cce0", fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>
                {active.desc}
              </p>

              {/* Price & Stock */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid var(--line)" }}>
                <span className="serif" style={{ fontSize: 28, color: "var(--apricot-light)" }}>
                  {currency(active.price)}
                </span>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>
                  {active.stock > 0 ? `${active.stock} in stock` : "Out of stock"}
                </span>
              </div>

              {/* Size */}
              {active.size && (
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Size</p>
                  <p style={{ fontSize: 14, color: "var(--apricot-light)" }}>{active.size}</p>
                </div>
              )}

              {/* Skin Type */}
              {active.skinType && active.skinType.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Best for Skin Type</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {active.skinType.map((st, i) => (
                      <span key={i} style={{ background: "var(--line)", padding: "4px 10px", borderRadius: "4px", fontSize: 12 }}>
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Bag */}
              <button 
                className="btn btn-solid" 
                style={{ width: "100%", marginBottom: 12, padding: "12px" }}
                onClick={() => { onAddToCart(active); setActive(null); }}
              >
                Add to Bag
              </button>
            </div>
          </div>

          {/* Bottom Section: Benefits & Ingredients */}
          <div style={{ marginTop: 24, borderTop: "1px solid var(--line)", paddingTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* Benefits */}
            {active.benefits && active.benefits.length > 0 && (
              <div>
                <p style={{ fontSize: 13, fontWeight: "500", color: "var(--apricot)", marginBottom: 10 }}>Key Benefits</p>
                <ul style={{ fontSize: 12, color: "#d5cce0", lineHeight: 2 }}>
                  {active.benefits.map((benefit, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>
                      ✓ {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ingredients */}
            {active.ingredients && active.ingredients.length > 0 && (
              <div>
                <p style={{ fontSize: 13, fontWeight: "500", color: "var(--apricot)", marginBottom: 10 }}>Key Ingredients</p>
                <ul style={{ fontSize: 12, color: "#d5cce0", lineHeight: 2 }}>
                  {active.ingredients.map((ingredient, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>
                      • {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Best For */}
          {active.bestFor && active.bestFor.length > 0 && (
            <div style={{ marginTop: 20, padding: 16, background: "var(--panel)", borderRadius: "4px" }}>
              <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>BEST FOR</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {active.bestFor.map((bf, i) => (
                  <span key={i} style={{ background: "var(--line)", padding: "6px 12px", borderRadius: "4px", fontSize: 12 }}>
                    {bf}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
