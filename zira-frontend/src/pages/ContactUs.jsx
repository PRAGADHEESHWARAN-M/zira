import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, User, AlertCircle } from "lucide-react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    // Simulate sending
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="fade" style={{ maxWidth: 800, margin: "0 auto", padding: "50px 20px 80px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <p style={{ fontSize: 11, letterSpacing: ".3em", color: "var(--apricot)", marginBottom: 10 }}>GET IN TOUCH</p>
        <p className="serif" style={{ fontSize: 36, lineHeight: 1.15 }}>Contact Us</p>
        <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 10 }}>
          We'd love to hear from you. Drop us a message and we'll get back to you within 24 hours.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
        {/* Contact Form */}
        <div className="card" style={{ padding: 28 }}>
          <p className="serif" style={{ fontSize: 20, color: "var(--apricot)", marginBottom: 20 }}>
            Send a Message
          </p>
          <form onSubmit={submit}>
            <div style={{ position: "relative", marginBottom: 14 }}>
              <User size={15} style={{ position: "absolute", left: 12, top: 13, color: "var(--muted)" }} />
              <input
                className="input"
                style={{ paddingLeft: 34 }}
                placeholder="Your Name"
                value={form.name}
                onChange={set("name")}
                required
              />
            </div>
            <div style={{ position: "relative", marginBottom: 14 }}>
              <Mail size={15} style={{ position: "absolute", left: 12, top: 13, color: "var(--muted)" }} />
              <input
                className="input"
                style={{ paddingLeft: 34 }}
                placeholder="Your Email"
                type="email"
                value={form.email}
                onChange={set("email")}
                required
              />
            </div>
            <div style={{ position: "relative", marginBottom: 14 }}>
              <MessageSquare size={15} style={{ position: "absolute", left: 12, top: 13, color: "var(--muted)" }} />
              <input
                className="input"
                style={{ paddingLeft: 34 }}
                placeholder="Subject"
                value={form.subject}
                onChange={set("subject")}
                required
              />
            </div>
            <div style={{ position: "relative", marginBottom: 14 }}>
              <textarea
                className="input"
                style={{ paddingLeft: 12, paddingTop: 12, minHeight: 110, resize: "vertical" }}
                placeholder="Your Message"
                value={form.message}
                onChange={set("message")}
                required
              />
            </div>
            <button className="btn btn-solid" type="submit" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Send size={14} /> {sent ? "Message Sent!" : "Send Message"}
            </button>
            {sent && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: 12, color: "var(--success)" }}>
                <AlertCircle size={13} /> Thank you! We'll get back to you shortly.
              </div>
            )}
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <div className="card" style={{ padding: 28, marginBottom: 20 }}>
            <p className="serif" style={{ fontSize: 20, color: "var(--apricot)", marginBottom: 20 }}>
              Reach Us
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Mail size={16} style={{ color: "var(--apricot)", flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500 }}>Email</p>
                  <p style={{ fontSize: 12, color: "var(--muted)" }}>ziragrooming@zira.in</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Phone size={16} style={{ color: "var(--apricot)", flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500 }}>Phone</p>
                  <p style={{ fontSize: 12, color: "var(--muted)" }}>+91 98765 43210</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <MapPin size={16} style={{ color: "var(--apricot)", flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500 }}>Address</p>
                  <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>
                    135, ZIRA House, Simmakal<br />
                    Madurai,Tamilnadu 625014<br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="card" style={{ padding: 24 }}>
            <p className="serif" style={{ fontSize: 18, color: "var(--apricot)", marginBottom: 12 }}>
              Business Hours
            </p>
            <div style={{ fontSize: 13, color: "#b5aac4", lineHeight: 2 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Mon – Fri</span><span>9:00 AM – 7:00 PM</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Saturday</span><span>10:00 AM – 5:00 PM</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Sunday</span><span>Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

