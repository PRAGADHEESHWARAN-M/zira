import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Shield, Leaf, Award, ArrowRight } from "lucide-react";

const heroImage = "/Zira_Products_Images/Gemini_Generated_Image_gdipmlgdipmlgdip (1).png";

const values = [
  { Icon: Sparkles, title: "Clean Formulations", desc: "Every product is crafted with premium, skin-safe ingredients." },
  { Icon: Shield, title: "Men's Wellness First", desc: "Designed specifically for the modern man's grooming needs." },
  { Icon: Leaf, title: "Sustainable & Ethical", desc: "Eco-friendly packaging & cruelty-free testing." },
  { Icon: Award, title: "Premium Quality", desc: "Luxury grooming that doesn't break the bank." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Home() {
  return (
    <div>
      {/* ─── HERO SECTION ─── */}
      <section
        style={{
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            filter: "brightness(0.45) saturate(1.1)",
          }}
        />

        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(18,8,36,0.88) 0%, rgba(18,8,36,0.4) 50%, rgba(18,8,36,0.85) 100%)",
          }}
        />

        {/* Hero Content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            maxWidth: 700,
            padding: "0 24px",
          }}
        >
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              fontSize: 11,
              letterSpacing: ".35em",
              color: "var(--apricot)",
              marginBottom: 14,
              textTransform: "uppercase",
            }}
          >
            Men's Grooming, Elevated
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="serif"
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              lineHeight: 1.08,
              marginBottom: 18,
              color: "var(--cream)",
            }}
          >
            Ritual, Not{" "}
            <span style={{ color: "var(--apricot-light)" }}>Routine.</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              fontSize: 14,
              color: "var(--muted-light)",
              lineHeight: 1.8,
              maxWidth: 520,
              margin: "0 auto 32px",
            }}
          >
            Premium grooming essentials crafted for the modern man.
            Every product is a ritual of confidence, care, and
            intention — because you deserve more than just a routine.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link
              to="/shop"
              className="btn btn-solid"
              style={{
                padding: "14px 36px",
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Shop Now <ArrowRight size={14} />
            </Link>
            <Link
              to="/about"
              className="btn"
              style={{
                padding: "14px 36px",
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Learn More
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ marginTop: 48, opacity: 0.3 }}
          >
            <div
              style={{
                width: 1,
                height: 32,
                background: "var(--apricot)",
                margin: "0 auto",
              }}
            />
            <p style={{ fontSize: 9, letterSpacing: ".2em", marginTop: 6, color: "var(--muted)" }}>
              SCROLL
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── BRAND VALUES ─── */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "80px 20px 60px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: ".3em",
              color: "var(--apricot)",
              marginBottom: 10,
            }}
          >
            WHY ZIRA
          </p>
          <p
            className="serif"
            style={{ fontSize: 32, lineHeight: 1.15, marginBottom: 12 }}
          >
            Crafted with purpose. Designed for you.
          </p>
          <p style={{ fontSize: 13, color: "var(--muted)", maxWidth: 480, margin: "0 auto" }}>
            Every detail matters — from the ingredients we choose to the
            experience we deliver.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {values.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="card"
              style={{ padding: 28, textAlign: "center" }}
            >
              <Icon size={28} style={{ color: "var(--apricot)", marginBottom: 14 }} />
              <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>{title}</p>
              <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── COLLECTION PREVIEW ─── */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "40px 20px 80px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="card"
          style={{
            padding: "40px 36px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative monogram */}
          <div
            style={{
              position: "absolute",
              fontSize: 180,
              fontFamily: "'Cormorant Garamond', serif",
              color: "var(--apricot)",
              opacity: 0.03,
              right: -20,
              bottom: -40,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            Z
          </div>

          <p
            className="serif"
            style={{ fontSize: 28, marginBottom: 12, position: "relative", zIndex: 1 }}
          >
            Ready to Elevate Your Ritual?
          </p>
          <p
            style={{
              fontSize: 13,
              color: "var(--muted)",
              maxWidth: 440,
              margin: "0 auto 28px",
              lineHeight: 1.7,
              position: "relative",
              zIndex: 1,
            }}
          >
            Explore our full collection of premium grooming essentials —
            from face care to beard grooming, all designed for the modern man.
          </p>
          <Link
            to="/shop"
            className="btn btn-solid"
            style={{
              padding: "14px 40px",
              fontSize: 12,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              position: "relative",
              zIndex: 1,
            }}
          >
            Browse Collection <ArrowRight size={14} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

