import { Schema, model, models } from "mongoose";

// Define the Product schema
const ProductSchema = new Schema(
  {
    productName: { type: String, required: true },
    productTitle: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [String],
  
  },
  { timestamps: true }
);

// Create or reuse the existing model
const Product = models.Product || model("Product", ProductSchema);

export default Product;
