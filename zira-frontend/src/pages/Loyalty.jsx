import React, { useEffect, useState } from "react";
import { Gift, Star, Copy, Check, Share2, Award } from "lucide-react";
import { api } from "../api/client";

const tierColors = {
  Bronze: "#cd7f32",
  Silver: "#c0c0c0",
  Gold: "#ffd700",
  Platinum: "#e5e4e2",
};

const tierIcons = {
  Bronze: "🥉",
  Silver: "🥈",
  Gold: "🥇",
  Platinum: "💎",
};

const tierBenefits = {
  Bronze: "1x points on every purchase",
  Silver: "1.2x points • Free shipping on orders above ₹500",
  Gold: "1.5x points • Free shipping • Exclusive early access",
  Platinum: "2x points • Free shipping • Early access • VIP support",
};

export default function Loyalty() {
  const [loyalty, setLoyalty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redeemPoints, setRedeemPoints] = useState(100);
  const [redeemMsg, setRedeemMsg] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [refMsg, setRefMsg] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    api.getLoyalty()
      .then(setLoyalty)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleRedeem = async () => {
    try {
      const res = await api.redeemPoints(redeemPoints);
      setLoyalty((prev) => ({ ...prev, points: res.points, tier: res.tier }));
      setRedeemMsg(res.message);
      setTimeout(() => setRedeemMsg(""), 3000);
    } catch (err) {
      setRedeemMsg(err.response?.data?.message || "Redemption failed.");
    }
  };

  const handleReferral = async () => {
    try {
      const res = await api.applyReferral(referralCode);
      setLoyalty((prev) => ({ ...prev, points: res.points, tier: res.tier }));
      setRefMsg(res.message);
      setTimeout(() => setRefMsg(""), 3000);
    } catch (err) {
      setRefMsg(err.response?.data?.message || "Referral failed.");
    }
  };

  const copyReferralLink = () => {
    if (loyalty?.referralCode) {
      navigator.clipboard.writeText(loyalty.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 20px", textAlign: "center" }}>
        <p style={{ color: "var(--muted)" }}>Loading loyalty program…</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 20px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <Gift size={32} style={{ color: "var(--apricot)", marginBottom: 12 }} />
        <p className="serif" style={{ fontSize: 30, marginBottom: 4 }}>Zira Loyalty Program</p>
        <p style={{ fontSize: 13, color: "var(--muted)" }}>Earn points on every purchase and unlock exclusive benefits</p>
      </div>

      {/* Current Tier Card */}
      <div className="card" style={{
        padding: 24, marginBottom: 28,
        border: loyalty ? `1px solid ${tierColors[loyalty.tier] || "var(--apricot)"}` : "1px solid var(--line)",
        textAlign: "center",
      }}>
        <span style={{ fontSize: 48, display: "block", marginBottom: 8 }}>
          {loyalty ? tierIcons[loyalty.tier] || "🎖️" : "🎖️"}
        </span>
        <p className="serif" style={{ fontSize: 24, color: loyalty ? tierColors[loyalty.tier] : "var(--apricot-light)", marginBottom: 4 }}>
          {loyalty?.tier || "Bronze"}
        </p>
        <p style={{ fontSize: 36, fontWeight: "bold", color: "var(--apricot-light)", marginBottom: 4 }}>
          {loyalty?.points || 0}
        </p>
        <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 12 }}>Loyalty Points</p>

        {/* Points to next tier */}
        {loyalty?.pointsToNextTier > 0 && (
          <div style={{ marginBottom: 12 }}>
            <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>
              {loyalty.pointsToNextTier} points to next tier
            </p>
            <div style={{ height: 6, background: "var(--line)", borderRadius: 3, maxWidth: 200, margin: "0 auto", overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 3,
                background: "var(--apricot-light)",
                transition: "width 0.5s",
              }} />
            </div>
          </div>
        )}

        {/* Multiplier */}
        <p style={{ fontSize: 12, color: "var(--apricot)" }}>
          {loyalty?.multiplier}x points multiplier
        </p>
      </div>

      {/* Tier Benefits */}
      <div className="card" style={{ padding: 18, marginBottom: 28 }}>
        <p style={{ fontSize: 13, color: "var(--apricot)", fontWeight: 500, marginBottom: 12 }}>Tier Benefits</p>
        {Object.entries(tierBenefits).map(([tier, benefit]) => (
          <div key={tier} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 12px",
            background: loyalty?.tier === tier ? "rgba(201,169,110,0.1)" : "transparent",
            borderRadius: 4, marginBottom: 4,
            border: loyalty?.tier === tier ? `1px solid ${tierColors[tier]}` : "1px solid transparent",
          }}>
            <Star size={14} style={{ color: tierColors[tier] || "var(--apricot)", flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: loyalty?.tier === tier ? "var(--apricot-light)" : "var(--muted)" }}>
              <strong style={{ color: tierColors[tier] }}>{tier}</strong>: {benefit}
            </span>
          </div>
        ))}
      </div>

      {/* Redeem Points */}
      <div className="card" style={{ padding: 18, marginBottom: 28 }}>
        <p style={{ fontSize: 13, color: "var(--apricot)", fontWeight: 500, marginBottom: 12 }}>Redeem Points</p>
        <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 12 }}>
          100 points = ₹10 discount. Minimum 100 points.
        </p>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <input
            type="number" min="100" max={loyalty?.points || 0} step="100"
            value={redeemPoints}
            onChange={(e) => setRedeemPoints(Number(e.target.value))}
            className="input" style={{ width: 120, padding: "8px 12px", fontSize: 13 }}
          />
          <button className="btn btn-solid" onClick={handleRedeem} disabled={!loyalty || loyalty.points < 100}>
            Redeem
          </button>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>
            ≈ ₹{Math.floor(redeemPoints / 10)} discount
          </span>
        </div>
        {redeemMsg && <p style={{ fontSize: 12, color: "var(--apricot)", marginTop: 8 }}>{redeemMsg}</p>}
      </div>

      {/* Referral Program */}
      <div className="card" style={{ padding: 18, marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <Share2 size={16} style={{ color: "var(--apricot)" }} />
          <p style={{ fontSize: 13, color: "var(--apricot)", fontWeight: 500 }}>Refer & Earn</p>
        </div>
        <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 12 }}>
          Share your referral code with friends. You get 200 points, they get 100 points!
        </p>

        {/* Your Referral Code */}
        {loyalty?.referralCode && (
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16, padding: 12, background: "var(--panel)", borderRadius: 4 }}>
            <code style={{ fontSize: 18, color: "var(--apricot-light)", letterSpacing: ".1em", flex: 1, textAlign: "center" }}>
              {loyalty.referralCode}
            </code>
            <button className="btn" onClick={copyReferralLink} style={{ padding: "4px 10px", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}

        {/* Apply Referral Code */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <input
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
            placeholder="Enter referral code"
            className="input" style={{ width: 160, padding: "8px 12px", fontSize: 13 }}
          />
          <button className="btn" onClick={handleReferral}>
            Apply
          </button>
        </div>
        {refMsg && <p style={{ fontSize: 12, color: "var(--apricot)", marginTop: 8 }}>{refMsg}</p>}
      </div>
    </div>
  );
}

