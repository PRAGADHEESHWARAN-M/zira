import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Twitter, Youtube } from "lucide-react";
import { Logo } from "./ui";

export default function Footer() {
  const linkStyle = {
    fontSize: 13,
    color: "#b5aac4",
    transition: "color 0.2s",
    cursor: "pointer",
  };

  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        background: "var(--bg)",
        marginTop: 60,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "50px 20px 30px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 32,
        }}
      >
        {/* Brand Column */}
        <div>
          <Logo size={26} />
          <p style={{ fontSize: 12, color: "#9b8ead", marginTop: 14, lineHeight: 1.7, maxWidth: 220 }}>
            Premium grooming essentials for the modern man. Ritual, not routine.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <Instagram size={16} style={{ color: "#9b8ead", cursor: "pointer" }} />
            <Twitter size={16} style={{ color: "#9b8ead", cursor: "pointer" }} />
            <Youtube size={16} style={{ color: "#9b8ead", cursor: "pointer" }} />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p style={{ fontSize: 12, color: "var(--apricot)", letterSpacing: ".08em", marginBottom: 14, fontWeight: 500 }}>
            QUICK LINKS
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Link to="/shop" style={linkStyle}>Shop</Link>
            <Link to="/about" style={linkStyle}>About Us</Link>
            <Link to="/contact" style={linkStyle}>Contact</Link>
            <Link to="/faq" style={linkStyle}>FAQ</Link>
          </div>
        </div>

        {/* Policies */}
        <div>
          <p style={{ fontSize: 12, color: "var(--apricot)", letterSpacing: ".08em", marginBottom: 14, fontWeight: 500 }}>
            POLICIES
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Link to="/privacy-policy" style={linkStyle}>Privacy Policy</Link>
            <Link to="/terms" style={linkStyle}>Terms & Conditions</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <p style={{ fontSize: 12, color: "var(--apricot)", letterSpacing: ".08em", marginBottom: 14, fontWeight: 500 }}>
            CONTACT
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13, color: "#b5aac4" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Mail size={13} /> Ziragrooming@zira.in
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Phone size={13} /> +91 98765 43210
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <MapPin size={13} /> Tamilnadu, India
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid var(--line)",
          padding: "16px 20px",
          textAlign: "center",
          fontSize: 11,
          color: "#6a5c7a",
        }}
      >
        &copy; {new Date().getFullYear()} ZIRA. All rights reserved. Crafted with purpose.
      </div>
    </footer>
  );
}

