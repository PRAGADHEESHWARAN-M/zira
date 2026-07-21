import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  { q: "What is ZIRA's return policy?", a: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, contact us within 30 days of delivery for a full refund or exchange. Products must be unused and in their original packaging." },
  { q: "Are ZIRA products tested on animals?", a: "Absolutely not. ZIRA is 100% cruelty-free. We never test our products on animals, and we are committed to maintaining this standard across our entire supply chain." },
  { q: "What skin types are your products suitable for?", a: "Our products are formulated to suit all skin types — including sensitive, oily, dry, and combination skin. Each product page includes specific recommendations for skin type compatibility." },
  { q: "How long does shipping take?", a: "Standard shipping takes 3–7 business days within India. Express shipping is available at checkout for 1–3 business day delivery. We ship to all major cities and towns." },
  { q: "Do you ship internationally?", a: "Currently, we ship within India. We're working on expanding to international markets — stay tuned by subscribing to our newsletter for updates." },
  { q: "How do I know which product is right for me?", a: "Browse our Shop page by category or use the search and filter tools. Each product has detailed descriptions, key benefits, ingredients, and skin-type recommendations. You can also reach out to us via the Contact page for personalized advice." },
  { q: "Can I cancel or modify my order?", a: "Orders can be canceled or modified within 1 hour of placement. After that, the order enters processing and cannot be changed. Contact us immediately if you need assistance." },
  { q: "How do I track my order?", a: "Once your order is shipped, you'll receive a tracking link via email and SMS. You can also view your order status in the 'My Orders' section of your account." },
  { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, UPI, Net Banking, and popular digital wallets. All transactions are secure and encrypted." },
  { q: "Do you offer subscription or refill options?", a: "Not yet, but we're developing a subscription model for our most-loved essentials. Sign up for our newsletter to be the first to know when it launches." },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <div className="fade" style={{ maxWidth: 760, margin: "0 auto", padding: "50px 20px 80px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <p style={{ fontSize: 11, letterSpacing: ".3em", color: "var(--apricot)", marginBottom: 10 }}>GOT QUESTIONS?</p>
        <p className="serif" style={{ fontSize: 36, lineHeight: 1.15 }}>Frequently Asked Questions</p>
        <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 10 }}>
          Everything you need to know about ZIRA products, shipping, and more.
        </p>
      </div>

      {/* FAQ List */}
      <div className="card" style={{ overflow: "hidden" }}>
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => toggle(i)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                padding: "18px 22px",
                background: "none",
                border: "none",
                borderBottom: i < faqs.length - 1 ? "1px solid var(--line)" : "none",
                color: open === i ? "var(--apricot)" : "var(--cream)",
                fontFamily: '"Jost", sans-serif',
                fontSize: 14,
                cursor: "pointer",
                textAlign: "left",
                transition: "color 0.2s",
              }}
            >
              <span>{faq.q}</span>
              {open === i ? (
                <ChevronUp size={16} style={{ flexShrink: 0, color: "var(--apricot)" }} />
              ) : (
                <ChevronDown size={16} style={{ flexShrink: 0, color: "var(--muted)" }} />
              )}
            </button>
            {open === i && (
              <div
                style={{
                  padding: "0 22px 18px",
                  fontSize: 13,
                  color: "#b5aac4",
                  lineHeight: 1.7,
                }}
              >
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Still Have Questions */}
      <div style={{ textAlign: "center", marginTop: 36 }}>
        <p style={{ fontSize: 14, color: "var(--muted)" }}>Still have questions?</p>
        <a href="/contact" className="btn" style={{ marginTop: 12, display: "inline-block" }}>
          Contact Us
        </a>
      </div>
    </div>
  );
}

