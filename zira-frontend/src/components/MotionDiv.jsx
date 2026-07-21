import React from "react";
import { motion } from "framer-motion";

// Page transition wrapper — Gucci-level smooth entry
export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Staggered children reveal — for grids, lists
export function StaggerContainer({ children, delay = 0.1 }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

// Hover scale lift — for cards
export function HoverLift({ children, scale = 1.02 }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Scroll reveal — element fades in when visible
export function ScrollReveal({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Luxury shimmer skeleton
export function Skeleton({ width = "100%", height = 20, style = {} }) {
  return (
    <div
      className="shimmer"
      style={{ width, height, ...style }}
    />
  );
}

// Loading splash screen
export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        zIndex: 9999,
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "2px solid var(--apricot)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--apricot-light)",
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 22,
          }}
        >
          Z
        </div>
        <span
          className="serif"
          style={{ fontSize: 28, letterSpacing: "0.12em", color: "var(--cream)" }}
        >
          ZIRA
        </span>
      </motion.div>
    </motion.div>
  );
}

