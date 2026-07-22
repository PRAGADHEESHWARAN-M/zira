require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/db");
require("./config/passport"); // Google OAuth strategy

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");
const blogRoutes = require("./routes/blogs");
const orderRoutes = require("./routes/orders");
const contactRoutes = require("./routes/contacts");
const wishlistRoutes = require("./routes/wishlist");
const { router: loyaltyRoutes } = require("./routes/loyalty");

const app = express();

connectDB();

const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(",").map((s) => s.trim())
  : ["*"];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes("*")) return callback(null, true);
    if (allowedOrigins.some((o) => origin.startsWith(o) || o === origin)) return callback(null, true);
    // Also allow the Netlify frontend explicitly
    if (origin.startsWith("https://zira-luxury-men-grooming.netlify.app")) return callback(null, true);
    callback(null, true); // allow all in dev mode
  },
  credentials: true,
}));
app.use(express.json());
app.use(passport.initialize());

app.get("/api/health", (req, res) => res.json({ status: "Zira API is running." }));

// Seed endpoint — call GET /api/seed once to populate the database
app.get("/api/seed", async (req, res) => {
  try {
    const { exec } = require("child_process");
    exec("node seed.js", { cwd: __dirname }, (error, stdout, stderr) => {
      if (error) {
        console.error("Seed error:", error);
        return res.status(500).json({ message: "Seed failed.", error: error.message, stderr });
      }
      res.json({ message: "Database seeded successfully!", output: stdout });
    });
  } catch (err) {
    res.status(500).json({ message: "Seed failed.", error: err.message });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/loyalty", loyaltyRoutes);

// 404 fallback
app.use((req, res) => res.status(404).json({ message: "Route not found." }));

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong.", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Zira API listening on port ${PORT}`));
