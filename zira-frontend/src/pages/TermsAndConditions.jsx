import React from "react";
import { FileText, ShoppingCart, RefreshCw, Ban, Scale } from "lucide-react";

const sections = [
  {
    Icon: ShoppingCart,
    title: "Orders & Payments",
    content: `By placing an order on ZIRA, you agree to provide accurate and complete information. All prices are listed in Indian Rupees (INR) and include applicable taxes. We reserve the right to refuse or cancel any order if fraud or unauthorized activity is suspected. Payment is due at the time of purchase.`,
  },
  {
    Icon: RefreshCw,
    title: "Returns & Refunds",
    content: `We offer a 30-day return policy on unused and unopened products in their original packaging. To initiate a return, contact our support team. Refunds will be processed within 7–10 business days after we receive the returned item. Shipping costs are non-refundable unless the return is due to our error.`,
  },
  {
    Icon: Ban,
    title: "Prohibited Uses",
    content: `You agree not to use our website for any unlawful purpose, to violate any laws, to infringe upon our intellectual property rights, to transmit harmful code, or to attempt to gain unauthorized access to our systems. Violation may result in immediate termination of your account.`,
  },
  {
    Icon: Scale,
    title: "Limitation of Liability",
    content: `ZIRA shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our products or website. Our total liability is limited to the amount you paid for the product in question. We are not responsible for allergic reactions — please review ingredient lists carefully.`,
  },
  {
    Icon: FileText,
    title: "Intellectual Property",
    content: `All content on this website — including product names, logos, images, text, and designs — is the intellectual property of ZIRA. You may not reproduce, distribute, or create derivative works without our explicit written consent.`,
  },
];

export default function TermsAndConditions() {
  return (
    <div className="fade" style={{ maxWidth: 800, margin: "0 auto", padding: "50px 20px 80px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <p style={{ fontSize: 11, letterSpacing: ".3em", color: "var(--apricot)", marginBottom: 10 }}>LEGAL</p>
        <p className="serif" style={{ fontSize: 36, lineHeight: 1.15 }}>Terms & Conditions</p>
        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
          Last updated: January 2025
        </p>
      </div>

      {/* Intro */}
      <div className="card" style={{ padding: 24, marginBottom: 28 }}>
        <p style={{ fontSize: 14, color: "#d5cce0", lineHeight: 1.8 }}>
          Welcome to ZIRA. By accessing or using our website and purchasing our products, you agree to be bound 
          by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our 
          services.
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
          For questions about these terms, please{" "}
          <a href="/contact" style={{ color: "var(--apricot)" }}>contact our support team</a>.
        </p>
      </div>
    </div>
  );
}

