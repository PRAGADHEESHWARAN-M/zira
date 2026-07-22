import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, LogOut, Heart } from "lucide-react";
import { Logo } from "./ui";
import { useAuth } from "../context/AuthContext";

const navItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function TopNav({ cartCount }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const storeItems = user
    ? [
        ["/shop", "Shop"],
        ["/wishlist", "Wishlist"],
        ["/loyalty", "Loyalty"],
        ["/orders", "My Orders"],
        ["/profile", "My Profile"],
      ]
    : [];

  const infoItems = [
    ["/about", "About"],
    ["/contact", "Contact"],
  ];

  const allItems = [["/", "Home"], ...storeItems, ...infoItems];

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{
        borderBottom: "1px solid rgba(63,45,99,0.3)",
        position: "sticky",
        top: 0,
        background: "rgba(18,8,36,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to={user ? "/shop" : "/about"}><Logo /></Link>
        </motion.div>
        <div style={{ display: "flex", gap: 26, alignItems: "center" }}>
          {allItems.map(([to, label], i) => (
            <motion.div
              key={to}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              whileHover={{ y: -1 }}
            >
              <Link
                to={to}
                style={{
                  fontSize: 13,
                  letterSpacing: ".04em",
                  color: pathname === to ? "var(--apricot-light)" : "var(--muted-light)",
                  borderBottom: pathname === to ? "1px solid var(--apricot-light)" : "1px solid transparent",
                  paddingBottom: 4,
                  transition: "color 0.2s",
                }}
              >
                {label}
              </Link>
            </motion.div>
          ))}
          {user && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
            >
              <Link to="/wishlist" style={{ position: "relative" }}>
                <Heart size={19} color={pathname === "/wishlist" ? "var(--apricot-light)" : "var(--muted-light)"} />
              </Link>
            </motion.div>
          )}
          {user && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/cart" style={{ position: "relative" }}>
                <ShoppingBag size={19} color={pathname === "/cart" ? "var(--apricot-light)" : "var(--muted-light)"} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                    style={{
                      position: "absolute",
                      top: -8,
                      right: -10,
                      background: "var(--apricot)",
                      color: "var(--bg)",
                      fontSize: 10,
                      borderRadius: "50%",
                      width: 16,
                      height: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>
            </motion.div>
          )}
          {user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <span style={{ fontSize: 12, color: "var(--muted)" }}>Hi, {user?.name?.split(" ")[0]}</span>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ cursor: "pointer", display: "flex" }}
              >
                <LogOut size={16} style={{ color: "var(--muted)" }} onClick={() => { logout(); navigate("/login"); }} />
              </motion.div>
            </motion.div>
          )}
          {!user && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
            >
              <Link to="/login" className="btn" style={{ padding: "6px 14px", fontSize: 11 }}>
                Sign In
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
