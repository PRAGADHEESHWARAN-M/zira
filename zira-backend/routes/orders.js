const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

// GET /api/orders/mine  (logged-in user's own orders)
router.get("/mine", requireAuth, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
});

// GET /api/orders  (admin: every order, with customer joined)
router.get("/", requireAuth, requireAdmin, async (req, res) => {
  const orders = await Order.find().populate("userId", "name email").sort({ createdAt: -1 });
  res.json(orders);
});

// POST /api/orders  (checkout — body: { items: [{ productId, qty }] })
router.post("/", requireAuth, async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !items.length) return res.status(400).json({ message: "Cart is empty." });

    // Price from the DB, never trust the client's price
    let total = 0;
    const lineItems = [];
    for (const it of items) {
      const product = await Product.findById(it.productId);
      if (!product) return res.status(404).json({ message: `Product ${it.productId} not found.` });
      if (product.stock < it.qty) return res.status(400).json({ message: `${product.name} is out of stock.` });
      lineItems.push({ productId: product._id, qty: it.qty, price: product.price });
      total += product.price * it.qty;
      product.stock -= it.qty;
      await product.save();
    }

    const orderNumber = "ZRA-" + Date.now().toString().slice(-6);
    const order = await Order.create({
      orderNumber, userId: req.user.id, items: lineItems, total, status: "Pending",
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Checkout failed.", error: err.message });
  }
});

// PUT /api/orders/:id/status  (admin updates order status)
router.put("/:id/status", requireAuth, requireAdmin, async (req, res) => {
  const { status } = req.body;
  if (!["Pending", "Shipped", "Delivered"].includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(order);
});

module.exports = router;
