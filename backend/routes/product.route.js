import express from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProduct);



router.post("/", createProduct);



router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct)


export default router;