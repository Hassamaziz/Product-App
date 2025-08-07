import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.use(express.json());

app.post("/api/products",async (req, res) => {
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

app.delete("/api/products/:id", async (req, res) => {
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


app.listen(5000, () => {
  connectDB();
  console.log("Server is running on port 5000");
});



