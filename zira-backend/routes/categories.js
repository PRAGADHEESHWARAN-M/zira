const express = require("express");
const Category = require("../models/Category");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

// GET /api/categories  (public — storefront needs this)
router.get("/", async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
});

// POST /api/categories  (admin)
router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
});

// PUT /api/categories/:id  (admin)
router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(category);
});

// DELETE /api/categories/:id  (admin)
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted." });
});

module.exports = router;
