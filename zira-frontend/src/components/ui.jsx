import React from "react";
import { X, Clock, Truck, CheckCircle2, Package, MapPin, XCircle } from "lucide-react";

export function Logo({ size = 28 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: size, height: size, borderRadius: "50%", border: "1px solid var(--apricot)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--apricot-light)", fontFamily: "'Cormorant Garamond',serif", fontSize: size * 0.55,
        }}
      >
        Z
      </div>
      <span className="serif" style={{ fontSize: size * 0.75, letterSpacing: "0.12em" }}>ZIRA</span>
    </div>
  );
}

export function Field({ icon: Icon, ...props }) {
  return (
    <div style={{ position: "relative", marginBottom: 14 }}>
      {Icon && <Icon size={16} style={{ position: "absolute", left: 12, top: 13, color: "var(--muted)" }} />}
      <input className="input" style={{ paddingLeft: Icon ? 36 : 14 }} {...props} />
    </div>
  );
}

export function Modal({ title, onClose, children, wide }) {
  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 16 }}
      onClick={onClose}
    >
      <div className="card fade" style={{ width: wide ? 560 : 420, maxWidth: "100%", maxHeight: "88vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid var(--line)" }}>
          <span className="serif" style={{ fontSize: 20, color: "var(--apricot-light)" }}>{title}</span>
          <X size={18} style={{ cursor: "pointer", color: "var(--muted)" }} onClick={onClose} />
        </div>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>
  );
}

export function StatusPill({ status }) {
  const map = {
    Pending: { c: "var(--apricot)", Icon: Clock },
    Processing: { c: "#60a5fa", Icon: Package },
    Shipped: { c: "var(--apricot-light)", Icon: Truck },
    "Out for Delivery": { c: "#34d399", Icon: MapPin },
    Delivered: { c: "var(--success)", Icon: CheckCircle2 },
    Cancelled: { c: "#ef4444", Icon: XCircle },
  };
  const { c, Icon } = map[status] || map.Pending;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: c, fontSize: 12, border: `1px solid ${c}`, padding: "3px 9px" }}>
      <Icon size={12} /> {status}
    </span>
  );
}

export const currency = (n) => "₹" + Number(n).toLocaleString("en-IN");
