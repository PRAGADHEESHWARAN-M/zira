import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function AuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { handleGoogleCallback } = useAuth();

  useEffect(() => {
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");
    const avatar = params.get("avatar");

    if (token) {
      handleGoogleCallback({ token, name, email, avatar });
      // Small delay then redirect
      setTimeout(() => navigate("/shop", { replace: true }), 1500);
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          border: "2px solid var(--apricot)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--apricot-light)",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 26,
        }}
      >
        Z
      </motion.div>
      <p className="serif" style={{ fontSize: 20, color: "var(--cream)" }}>
        Signing you in...
      </p>
    </div>
  );
}

