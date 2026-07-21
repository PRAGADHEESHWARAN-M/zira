import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Lock, Sparkles } from "lucide-react";
import { Logo, Field } from "../components/ui";
import { GoogleButton, AppleButton, Divider } from "../components/SocialAuth";
import { useAuth } from "../context/AuthContext";

import loginHero from "../assets/login-hero.jpg";

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const user = await login(username, password);
      navigate(user.role === "admin" ? "/admin" : "/shop");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = () => {
    loginWithGoogle();
  };

  const handleApple = () => {
    // Apple Sign-In — placeholder for future Apple OAuth integration
    alert("Apple Sign-In coming soon.");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Luxury blurred background */}
      <motion.img
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1.03, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
        src={loginHero}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(8px) brightness(0.4)",
        }}
      />
      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(18,8,36,0.85) 0%, rgba(30,14,58,0.75) 50%, rgba(18,8,36,0.85) 100%)",
        }}
      />

      {/* Floating monogram decoration */}
      <motion.div
        animate={{ y: [0, -15, 0], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          fontSize: 200,
          fontFamily: "'Cormorant Garamond', serif",
          color: "var(--apricot)",
          opacity: 0.03,
          right: "5%",
          top: "10%",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        Z
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{ width: 400, maxWidth: "100%", position: "relative", zIndex: 1 }}
      >
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Logo size={40} />
          </motion.div>
        </div>

        <div
          className="card-glass"
          style={{
            padding: 34,
            borderRadius: 8,
            background: "linear-gradient(135deg, rgba(45,27,78,0.5) 0%, rgba(30,14,58,0.35) 100%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="serif" style={{ fontSize: 26, marginBottom: 4, textAlign: "center" }}>
              Welcome back
            </p>
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 22, textAlign: "center" }}>
              Sign in to your Zira account
            </p>
          </motion.div>

          <form onSubmit={submit}>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
              <Field icon={User} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Field icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </motion.div>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: "var(--danger)", fontSize: 12, marginBottom: 10 }}
              >
                {error}
              </motion.p>
            )}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              whileHover={{ scale: 1.01 }}
            >
              <button className="btn btn-solid" style={{ width: "100%", marginTop: 6 }} type="submit" disabled={busy}>
                {busy ? (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    Signing in…
                  </motion.span>
                ) : (
                  "Sign In"
                )}
              </button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Divider />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <GoogleButton onClick={handleGoogle} />
              <AppleButton onClick={handleApple} />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            style={{ fontSize: 12, color: "var(--muted)", marginTop: 18, textAlign: "center" }}
          >
            New here?{" "}
            <Link to="/signup" style={{ color: "var(--apricot)" }}>
              Create an account
            </Link>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hairline"
            style={{ marginTop: 18, paddingTop: 14 }}
          >
            <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center" }}>
              After running <code>npm run seed</code> — admin: <b>admin</b> / <b>admin123</b>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

