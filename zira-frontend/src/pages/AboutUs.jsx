import React from "react";
import { Sparkles, Shield, Leaf, Award } from "lucide-react";

const values = [
  { Icon: Sparkles, title: "Clean Formulations", desc: "Every product is crafted with premium, skin-safe ingredients free from harsh chemicals." },
  { Icon: Shield, title: "Men’s Wellness First", desc: "We understand men's skin. Our range is designed specifically for the modern man's grooming needs." },
  { Icon: Leaf, title: "Sustainable & Ethical", desc: "We're committed to eco-friendly packaging, cruelty-free testing, and responsible sourcing." },
  { Icon: Award, title: "Premium Quality", desc: "Luxury that doesn't break the bank. We believe everyone deserves high-quality grooming." },
];

export default function AboutUs() {
  return (
    <div className="fade" style={{ maxWidth: 900, margin: "0 auto", padding: "50px 20px" }}>
      {/* Hero Section */}
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <p style={{ fontSize: 11, letterSpacing: ".3em", color: "var(--apricot)", marginBottom: 12 }}>OUR STORY</p>
        <p className="serif" style={{ fontSize: 42, lineHeight: 1.15, marginBottom: 16 }}>
          Ritual, Not Routine.
        </p>
        <p style={{ fontSize: 14, color: "var(--muted)", maxWidth: 580, margin: "0 auto", lineHeight: 1.8 }}>
          ZIRA was born from a simple belief — that grooming is more than just a daily chore. It's a ritual of 
          self-care, confidence, and intention. We set out to create a brand that elevates the everyday.
        </p>
      </div>

      {/* Story */}
      <div className="card" style={{ padding: "32px 28px", marginBottom: 40 }}>
        <p className="serif" style={{ fontSize: 24, color: "var(--apricot)", marginBottom: 14 }}>Our Beginning</p>
        <p style={{ fontSize: 14, color: "#d5cce0", lineHeight: 1.8, marginBottom: 14 }}>
          Founded in 2023, ZIRA started with a small but passionate team of grooming enthusiasts who were tired 
          of the "one-size-fits-all" approach to men's care. We noticed a gap in the market — products that either 
          compromised on quality or charged luxury prices for basic ingredients.
        </p>
        <p style={{ fontSize: 14, color: "#d5cce0", lineHeight: 1.8 }}>
          We spent months researching, formulating, and testing. Every product in our lineup is developed with 
          dermatologists, uses clean ingredients, and is designed to work with men's unique skin biology. From 
          face washes that deeply cleanse without stripping, to beard oils that nourish without greasiness — 
          every detail matters.
        </p>
      </div>

      {/* Mission */}
      <div className="card" style={{ padding: "32px 28px", marginBottom: 40 }}>
        <p className="serif" style={{ fontSize: 24, color: "var(--apricot)", marginBottom: 14 }}>Our Mission</p>
        <p style={{ fontSize: 14, color: "#d5cce0", lineHeight: 1.8 }}>
          To empower every man to look, feel, and present his best self through thoughtfully designed grooming 
          essentials. We believe that taking those few extra minutes each day to care for yourself isn't vanity 
          — it's self-respect. Whether it's the perfect shave, a nourishing beard routine, or simply the right 
          moisturizer, ZIRA is here to make every ritual a moment of confidence.
        </p>
      </div>

      {/* Values */}
      <p className="serif" style={{ fontSize: 28, textAlign: "center", marginBottom: 28 }}>What We Stand For</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
        {values.map(({ Icon, title, desc }) => (
          <div key={title} className="card" style={{ padding: 24, textAlign: "center" }}>
            <Icon size={28} style={{ color: "var(--apricot)", marginBottom: 12 }} />
            <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>{title}</p>
            <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

