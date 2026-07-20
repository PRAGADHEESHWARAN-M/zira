const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

function signToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// POST /api/auth/signup  (customers only — admins are created directly in the DB)
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, address, username, password } = req.body;
    if (!name || !username || !password) {
      return res.status(400).json({ message: "Name, username and password are required." });
    }
    const exists = await User.findOne({ username });
    if (exists) return res.status(409).json({ message: "Username already taken." });

    const user = await User.create({ name, email, phone, address, username, password, role: "customer" });
    const token = signToken(user);
    res.status(201).json({ token, user: user.toSafeObject() });
  } catch (err) {
    res.status(500).json({ message: "Signup failed.", error: err.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid username or password." });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: "Invalid username or password." });

    const token = signToken(user);
    res.json({ token, user: user.toSafeObject() });
  } catch (err) {
    res.status(500).json({ message: "Login failed.", error: err.message });
  }
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found." });
  res.json(user.toSafeObject());
});

module.exports = router;
