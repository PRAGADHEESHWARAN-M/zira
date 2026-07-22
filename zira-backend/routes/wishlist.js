const express = require("express");
const User = require("../models/User");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// GET /api/wishlist — get user's wishlist
router.get("/", requireAuth, async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  res.json(user.wishlist || []);
});

// POST /api/wishlist/:productId — add to wishlist
router.post("/:productId", requireAuth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user.wishlist.includes(req.params.productId)) {
    user.wishlist.push(req.params.productId);
    await user.save();
  }
  const updated = await User.findById(req.user._id).populate("wishlist");
  res.json(updated.wishlist);
});

// DELETE /api/wishlist/:productId — remove from wishlist
router.delete("/:productId", requireAuth, async (req, res) => {
  const user = await User.findById(req.user._id);
  user.wishlist = user.wishlist.filter(
    (id) => id.toString() !== req.params.productId
  );
  await user.save();
  const updated = await User.findById(req.user._id).populate("wishlist");
  res.json(updated.wishlist);
});

module.exports = router;

