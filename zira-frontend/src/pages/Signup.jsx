import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Lock } from "lucide-react";
import { Logo, Field } from "../components/ui";
import { GoogleButton, AppleButton, Divider } from "../components/SocialAuth";
import { useAuth } from "../context/AuthContext";

import loginHero from "../assets/login-hero.jpg";

export default function Signup() {
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", username: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.username || !form.password) {
      setError("Please fill name, username & password.");
      return;
    }
    setError("");
    setBusy(true);
    try {
      await signup(form);
      navigate("/shop");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = () => loginWithGoogle();
  const handleApple = () => alert("Apple Sign-In coming soon.");

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
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(18,8,36,0.85) 0%, rgba(30,14,58,0.75) 50%, rgba(18,8,36,0.85) 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{ width: 440, maxWidth: "100%", position: "relative", zIndex: 1 }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <motion.div whileHover={{ scale: 1.05 }}><Logo size={36} /></motion.div>
        </div>

        <div
          className="card-glass"
          style={{
            padding: 30,
            borderRadius: 8,
            background: "linear-gradient(135deg, rgba(45,27,78,0.5) 0%, rgba(30,14,58,0.35) 100%)",
          }}
        >
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <p className="serif" style={{ fontSize: 24, marginBottom: 4, textAlign: "center" }}>Create your account</p>
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 18, textAlign: "center" }}>Join Zira — grooming, elevated.</p>
          </motion.div>

          <form onSubmit={submit}>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <Field icon={User} placeholder="Full name" value={form.name} onChange={set("name")} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Field icon={Mail} placeholder="Email" value={form.email} onChange={set("email")} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
              <Field icon={Phone} placeholder="Phone" value={form.phone} onChange={set("phone")} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Field icon={MapPin} placeholder="Address, City, Tamil Nadu" value={form.address} onChange={set("address")} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
              <Field icon={User} placeholder="Choose a username" value={form.username} onChange={set("username")} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Field icon={Lock} type="password" placeholder="Choose a password" value={form.password} onChange={set("password")} />
            </motion.div>
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: "var(--danger)", fontSize: 12, marginBottom: 10 }}>{error}</motion.p>
            )}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              whileHover={{ scale: 1.01 }}
            >
              <button className="btn btn-solid" style={{ width: "100%", marginTop: 6 }} type="submit" disabled={busy}>
                {busy ? "Creating…" : "Create Account"}
              </button>
            </motion.div>
          </form>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <GoogleButton onClick={handleGoogle} label="Sign up with Google" />
              <AppleButton onClick={handleApple} label="Sign up with Apple" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            style={{ fontSize: 12, color: "var(--muted)", marginTop: 16, textAlign: "center" }}
          >
            Already registered? <Link to="/login" style={{ color: "var(--apricot)" }}>Sign in</Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

