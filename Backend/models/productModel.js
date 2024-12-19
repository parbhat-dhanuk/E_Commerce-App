import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    imageUrl: String,
    imagePublicId:String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number
  },
  { timestamps: true }
);

const Product= mongoose.model("Product", productSchema)

export default Product