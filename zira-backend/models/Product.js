const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    icon: { type: String, default: "◆" },
    imageUrl: { type: String, default: "" },
    brand: { type: String, default: "Zira" },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },
    ingredients: [String],
    benefits: [String],
    bestFor: [String],
    skinType: [String],
    size: { type: String, default: "Standard" },
    discount: { type: Number, default: 0, min: 0, max: 100 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
