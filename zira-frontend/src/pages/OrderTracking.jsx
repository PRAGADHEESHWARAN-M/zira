import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, Package, Truck, MapPin, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import { api } from "../api/client";

const statusIcons = {
  Pending: Clock,
  Processing: Package,
  Shipped: Truck,
  "Out for Delivery": MapPin,
  Delivered: CheckCircle2,
  Cancelled: XCircle,
};

const statusColors = {
  Pending: "var(--apricot)",
  Processing: "#60a5fa",
  Shipped: "var(--apricot-light)",
  "Out for Delivery": "#34d399",
  Delivered: "var(--success)",
  Cancelled: "#ef4444",
};

export default function OrderTracking() {
  const { id } = useParams();
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTracking(id)
      .then((data) => setTracking(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 20px", textAlign: "center" }}>
        <p style={{ color: "var(--muted)" }}>Loading tracking…</p>
      </div>
    );
  }

  if (!tracking) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 20px", textAlign: "center" }}>
        <p style={{ color: "var(--muted)" }}>Tracking not available.</p>
        <Link to="/orders" className="btn" style={{ marginTop: 16 }}>Back to Orders</Link>
      </div>
    );
  }

  const statusFlow = ["Pending", "Processing", "Shipped", "Out for Delivery", "Delivered"];
  const currentStep = tracking.status === "Cancelled" ? -1 : statusFlow.indexOf(tracking.status);

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 20px" }}>
      {/* Back button */}
      <Link to="/orders" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--muted)", marginBottom: 24 }}>
        <ArrowLeft size={14} /> Back to Orders
      </Link>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <p className="serif" style={{ fontSize: 26, marginBottom: 4 }}>Order Tracking</p>
        <p style={{ fontSize: 13, color: "var(--muted)" }}>{tracking.orderNumber}</p>
      </div>

      {/* Cancelled banner */}
      {tracking.status === "Cancelled" && (
        <div style={{ padding: 16, background: "rgba(239,68,68,0.1)", border: "1px solid #ef4444", borderRadius: 6, marginBottom: 28, textAlign: "center" }}>
          <XCircle size={24} style={{ color: "#ef4444", marginBottom: 8 }} />
          <p style={{ fontSize: 14, color: "#ef4444" }}>This order has been cancelled.</p>
        </div>
      )}

      {/* Tracking Timeline */}
      <div style={{ position: "relative", marginBottom: 40 }}>
        {/* Progress Line */}
        {currentStep >= 0 && (
          <div style={{ position: "absolute", left: 15, top: 0, bottom: 0, width: 2, background: "var(--line)" }}>
            <div style={{ height: `${((currentStep + 1) / statusFlow.length) * 100}%`, width: "100%", background: "var(--apricot-light)", transition: "height 0.5s" }} />
          </div>
        )}

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {statusFlow.map((step, i) => {
            const Icon = statusIcons[step];
            const isActive = i <= currentStep;
            const isCurrent = i === currentStep;
            const isCompleted = i < currentStep;
            const historyEntry = tracking.trackingHistory?.find(h => h.status === step);

            return (
              <div key={step} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                {/* Icon */}
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: isActive ? statusColors[step] : "var(--line)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, position: "relative", zIndex: 1,
                  transition: "background 0.3s",
                }}>
                  <Icon size={14} style={{ color: isActive ? "var(--bg)" : "var(--muted)" }} />
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingTop: 4 }}>
                  <p style={{
                    fontSize: 14,
                    fontWeight: isCurrent ? "600" : "400",
                    color: isActive ? statusColors[step] : "var(--muted)",
                    marginBottom: 2,
                  }}>
                    {step}
                    {isCurrent && <span style={{ fontSize: 11, marginLeft: 8, color: "var(--apricot)" }}>● Current</span>}
                  </p>
                  {historyEntry && (
                    <p style={{ fontSize: 11, color: "var(--muted)" }}>
                      {new Date(historyEntry.timestamp).toLocaleString()}
                      {historyEntry.note && ` — ${historyEntry.note}`}
                    </p>
                  )}
                  {isCompleted && !historyEntry && (
                    <p style={{ fontSize: 11, color: "var(--muted)" }}>Completed</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estimated Delivery */}
      {tracking.estimatedDelivery && (
        <div className="card" style={{ padding: 16, marginBottom: 20 }}>
          <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>ESTIMATED DELIVERY</p>
          <p className="serif" style={{ fontSize: 18, color: "var(--apricot-light)" }}>
            {new Date(tracking.estimatedDelivery).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
          </p>
        </div>
      )}
    </div>
  );
}

