const express = require("express");
const Blog = require("../models/Blog");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

// GET /api/blogs  (public)
router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

// POST /api/blogs  (admin)
router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const blog = await Blog.create(req.body);
  res.status(201).json(blog);
});

// PUT /api/blogs/:id  (admin)
router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(blog);
});

// DELETE /api/blogs/:id  (admin)
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted." });
});

module.exports = router;
