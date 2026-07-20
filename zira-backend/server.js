require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");
const blogRoutes = require("./routes/blogs");
const orderRoutes = require("./routes/orders");

const app = express();

connectDB();

app.use(cors({ origin: (process.env.CLIENT_ORIGIN || "*").split(",") }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "Zira API is running." }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/orders", orderRoutes);

// 404 fallback
app.use((req, res) => res.status(404).json({ message: "Route not found." }));

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong.", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Zira API listening on port ${PORT}`));
