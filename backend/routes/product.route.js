import express from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ success: true, products });
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});



router.post("/",async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success:false ,message: "Name, price and image are required" });
    }

    const newProduct = new Product(product);
    try {
        await newProduct.save();
        return res.status(201).json({ success: true, product: newProduct });

    } catch (error) {
        console.error("Error saving product:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
        
    }
});



router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        return res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const product = req.body;

   if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        return res.status(200).json({ success: true, updatedProduct });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error Updating Product" });
    }
})


export default router;