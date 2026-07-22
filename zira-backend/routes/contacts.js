const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// POST /api/contacts — Submit a contact inquiry (public)
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const contact = await Contact.create({ name, email, subject, message });
    res.status(201).json({ message: "Thank you! We'll get back to you shortly.", contact });
  } catch (err) {
    res.status(500).json({ message: "Failed to send message.", error: err.message });
  }
});

module.exports = router;

