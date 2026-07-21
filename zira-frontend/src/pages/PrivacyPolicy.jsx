import React from "react";
import { Shield, Lock, Eye, Trash2 } from "lucide-react";

const sections = [
  {
    Icon: Shield,
    title: "Information We Collect",
    content: `When you create an account, place an order, or contact us, we collect personal information such as your name, email address, phone number, shipping address, and payment details. We also collect non-personal data such as browser type, device information, and site usage analytics to improve your experience.`,
  },
  {
    Icon: Lock,
    title: "How We Use Your Information",
    content: `We use your information to process and fulfill orders, communicate with you about your purchases, send promotional offers (with your consent), improve our website and product offerings, and comply with legal obligations. We do not sell your personal data to third parties.`,
  },
  {
    Icon: Eye,
    title: "Data Protection & Security",
    content: `ZIRA implements industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology. We regularly review our data collection, storage, and processing practices to prevent unauthorized access.`,
  },
  {
    Icon: Trash2,
    title: "Your Rights & Choices",
    content: `You have the right to access, update, or delete your personal information at any time. You can do this through your account settings or by contacting us directly. You may opt out of marketing communications at any time by clicking the unsubscribe link in our emails.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="fade" style={{ maxWidth: 800, margin: "0 auto", padding: "50px 20px 80px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <p style={{ fontSize: 11, letterSpacing: ".3em", color: "var(--apricot)", marginBottom: 10 }}>LEGAL</p>
        <p className="serif" style={{ fontSize: 36, lineHeight: 1.15 }}>Privacy Policy</p>
        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
          Last updated: January 2025
        </p>
      </div>

      {/* Intro */}
      <div className="card" style={{ padding: 24, marginBottom: 28 }}>
        <p style={{ fontSize: 14, color: "#d5cce0", lineHeight: 1.8 }}>
          At ZIRA, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
          and safeguard your information when you visit our website or make a purchase. By using our services, 
          you consent to the practices described in this policy.
        </p>
      </div>

      {/* Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {sections.map(({ Icon, title, content }) => (
          <div key={title} className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <Icon size={20} style={{ color: "var(--apricot)", flexShrink: 0 }} />
              <p className="serif" style={{ fontSize: 20, color: "var(--apricot)" }}>{title}</p>
            </div>
            <p style={{ fontSize: 14, color: "#d5cce0", lineHeight: 1.8 }}>{content}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div style={{ textAlign: "center", marginTop: 36 }}>
        <p style={{ fontSize: 13, color: "var(--muted)" }}>
          If you have any questions about this Privacy Policy, please{" "}
          <a href="/contact" style={{ color: "var(--apricot)" }}>contact us</a>.
        </p>
      </div>
    </div>
  );
}

