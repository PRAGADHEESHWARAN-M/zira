import React, { useState } from "react";
import { User, Mail, Phone, MapPin } from "lucide-react";
import { Field } from "../components/ui";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState(user);
  const [saved, setSaved] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = async () => {
    const updated = await api.updateProfile(form);
    updateUser(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "40px 20px" }}>
      <p className="serif" style={{ fontSize: 30, marginBottom: 24 }}>My Profile</p>
      <div className="card" style={{ padding: 24 }}>
        <Field icon={User} value={form.name || ""} onChange={set("name")} placeholder="Name" />
        <Field icon={Mail} value={form.email || ""} onChange={set("email")} placeholder="Email" />
        <Field icon={Phone} value={form.phone || ""} onChange={set("phone")} placeholder="Phone" />
        <Field icon={MapPin} value={form.address || ""} onChange={set("address")} placeholder="Address" />
        <button className="btn btn-solid" onClick={save}>Save Changes</button>
        {saved && <p style={{ color: "#C9A96E", fontSize: 12, marginTop: 10 }}>Profile updated.</p>}
      </div>
    </div>
  );
}
