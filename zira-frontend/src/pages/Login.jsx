import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";
import { Logo, Field } from "../components/ui";
import { useAuth } from "../context/AuthContext";

import loginHero from "../assets/login-hero.jpg";


export default function Login() {
  const { login } = useAuth();
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
      <img
        src={loginHero}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(6px) brightness(0.55)",
          transform: "scale(1.03)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(15,20,25,0.72)",
        }}
      />

      <div className="fade" style={{ width: 380, maxWidth: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <Logo size={40} />
        </div>
        <div className="card" style={{ padding: 30 }}>

          <p className="serif" style={{ fontSize: 26, marginBottom: 4 }}>Welcome back</p>
          <p style={{ fontSize: 13, color: "#8fa3b5", marginBottom: 22 }}>Sign in to your Zira account</p>
          <form onSubmit={submit}>
            <Field icon={User} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Field icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p style={{ color: "#e74c3c", fontSize: 12, marginBottom: 10 }}>{error}</p>}
            <button className="btn btn-solid" style={{ width: "100%", marginTop: 6 }} type="submit" disabled={busy}>
              {busy ? "Signing in…" : "Sign In"}
            </button>
          </form>
          <p style={{ fontSize: 12, color: "#8fa3b5", marginTop: 18, textAlign: "center" }}>
            New here? <Link to="/signup" style={{ color: "#4a90e2" }}>Create an account</Link>
          </p>
          <div className="hairline" style={{ marginTop: 18, paddingTop: 14 }}>
            <p style={{ fontSize: 11, color: "#5f7a95" }}>
              After running <code>npm run seed</code> on the backend — admin: <b>admin</b> / <b>admin123</b> · customer: <b>karthikeyan0</b> / <b>customer123</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
