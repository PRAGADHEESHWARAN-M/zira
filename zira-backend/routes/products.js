const express = require("express");
const Product = require("../models/Product");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

// GET /api/products?category=<id>&q=<search>  (public)
router.get("/", async (req, res) => {
  const { category, q } = req.query;
  const filter = {};
  if (category) filter.categoryId = category;
  if (q) filter.name = { $regex: q, $options: "i" };
  const products = await Product.find(filter).populate("categoryId", "name");
  res.json(products);
});

// GET /api/products/:id  (public)
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("categoryId", "name");
  if (!product) return res.status(404).json({ message: "Product not found." });
  res.json(product);
});

// POST /api/products  (admin)
router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// PUT /api/products/:id  (admin)
router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

// DELETE /api/products/:id  (admin)
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted." });
});

module.exports = router;
