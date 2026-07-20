const express = require("express");
const User = require("../models/User");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

// GET /api/users  (admin: list all customers)
router.get("/", requireAuth, requireAdmin, async (req, res) => {
  const users = await User.find({ role: "customer" }).select("-password");
  res.json(users);
});

// PUT /api/users/me  (any logged-in user updates their own profile)
router.put("/me", requireAuth, async (req, res) => {
  const { name, email, phone, address } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, email, phone, address },
    { new: true }
  ).select("-password");
  res.json(user);
});

// DELETE /api/users/:id  (admin only)
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted." });
});

module.exports = router;
