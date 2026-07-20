import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Lock } from "lucide-react";
import { Logo, Field } from "../components/ui";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
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

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div className="fade" style={{ width: 420, maxWidth: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}><Logo size={40} /></div>
        <div className="card" style={{ padding: 30 }}>
          <p className="serif" style={{ fontSize: 26, marginBottom: 4 }}>Create your account</p>
          <p style={{ fontSize: 13, color: "#8fa3b5", marginBottom: 22 }}>Join Zira — grooming, elevated.</p>
          <form onSubmit={submit}>
            <Field icon={User} placeholder="Full name" value={form.name} onChange={set("name")} />
            <Field icon={Mail} placeholder="Email" value={form.email} onChange={set("email")} />
            <Field icon={Phone} placeholder="Phone" value={form.phone} onChange={set("phone")} />
            <Field icon={MapPin} placeholder="Address, City, Tamil Nadu" value={form.address} onChange={set("address")} />
            <Field icon={User} placeholder="Choose a username" value={form.username} onChange={set("username")} />
            <Field icon={Lock} type="password" placeholder="Choose a password" value={form.password} onChange={set("password")} />
            {error && <p style={{ color: "#e74c3c", fontSize: 12, marginBottom: 10 }}>{error}</p>}
            <button className="btn btn-solid" style={{ width: "100%", marginTop: 6 }} type="submit" disabled={busy}>
              {busy ? "Creating…" : "Create Account"}
            </button>
          </form>
          <p style={{ fontSize: 12, color: "#8fa3b5", marginTop: 18, textAlign: "center" }}>
            Already registered? <Link to="/login" style={{ color: "#4a90e2" }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
