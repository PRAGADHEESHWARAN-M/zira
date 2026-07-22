const express = require("express");
const User = require("../models/User");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

/**
 * Tier thresholds (in points)
 * Bronze: 0-499, Silver: 500-1499, Gold: 1500-4999, Platinum: 5000+
 */
const TIER_THRESHOLDS = [
  { tier: "Platinum", min: 5000 },
  { tier: "Gold", min: 1500 },
  { tier: "Silver", min: 500 },
  { tier: "Bronze", min: 0 },
];

const TIER_MULTIPLIERS = {
  Bronze: 1,
  Silver: 1.2,
  Gold: 1.5,
  Platinum: 2,
};

// Points earned per rupee spent (base)
const POINTS_PER_RUPEE = 1;

function computeTier(points) {
  for (const t of TIER_THRESHOLDS) {
    if (points >= t.min) return t.tier;
  }
  return "Bronze";
}

// GET /api/loyalty/me — Get current user's loyalty details
router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id).select("loyaltyPoints loyaltyTier referralCode");
  if (!user) return res.status(404).json({ message: "User not found." });
  res.json({
    points: user.loyaltyPoints,
    tier: user.loyaltyTier,
    referralCode: user.referralCode,
    pointsToNextTier: computePointsToNextTier(user.loyaltyPoints),
    multiplier: TIER_MULTIPLIERS[user.loyaltyTier] || 1,
  });
});

function computePointsToNextTier(points) {
  for (const t of TIER_THRESHOLDS) {
    if (points < t.min) return t.min - points;
  }
  return 0;
}

// POST /api/loyalty/redeem — Redeem points for discount (100 points = ₹10)
router.post("/redeem", requireAuth, async (req, res) => {
  try {
    const { points } = req.body;
    if (!points || points < 100) {
      return res.status(400).json({ message: "Minimum 100 points to redeem." });
    }
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    if (user.loyaltyPoints < points) {
      return res.status(400).json({ message: "Insufficient points." });
    }
    user.loyaltyPoints -= points;
    await user.save();
    const discountAmount = Math.floor(points / 10); // 10 points = ₹1
    res.json({
      points: user.loyaltyPoints,
      tier: user.loyaltyTier,
      discountAmount,
      message: `Redeemed ${points} points for ₹${discountAmount} discount.`,
    });
  } catch (err) {
    res.status(500).json({ message: "Redemption failed.", error: err.message });
  }
});

// Helper: Award points to a user (exported for use in orders route)
async function awardPoints(userId, totalSpent) {
  const user = await User.findById(userId);
  if (!user) return;
  const multiplier = TIER_MULTIPLIERS[user.loyaltyTier] || 1;
  const earned = Math.floor(totalSpent * POINTS_PER_RUPEE * multiplier);
  user.loyaltyPoints += earned;
  user.loyaltyTier = computeTier(user.loyaltyPoints);
  await user.save();
  return { earned, points: user.loyaltyPoints, tier: user.loyaltyTier };
}

// POST /api/loyalty/referral — Apply a referral code
router.post("/referral", requireAuth, async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ message: "Referral code required." });

    const referrer = await User.findOne({ referralCode: code });
    if (!referrer) return res.status(404).json({ message: "Invalid referral code." });
    if (referrer._id.toString() === req.user.id) {
      return res.status(400).json({ message: "Cannot refer yourself." });
    }

    const user = await User.findById(req.user.id);
    if (user.referredBy) {
      return res.status(400).json({ message: "Referral already applied." });
    }

    // Award bonus points to both
    user.referredBy = referrer._id;
    user.loyaltyPoints += 100;
    user.loyaltyTier = computeTier(user.loyaltyPoints);
    await user.save();

    referrer.loyaltyPoints += 200;
    referrer.loyaltyTier = computeTier(referrer.loyaltyPoints);
    await referrer.save();

    res.json({
      points: user.loyaltyPoints,
      tier: user.loyaltyTier,
      message: "Referral applied! You earned 100 bonus points.",
    });
  } catch (err) {
    res.status(500).json({ message: "Referral failed.", error: err.message });
  }
});

module.exports = { router, awardPoints, computeTier };

