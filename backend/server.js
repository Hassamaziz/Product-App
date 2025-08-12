import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

// Load environment variables
dotenv.config();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // allows us to accept JSON data in req.body

// API Routes
app.use("/api/products", productRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));

	// Express 5 compatible catch-all route
app.get(/.*/, (req, res) => {
	res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});
}

// Connect to DB, then start server
connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`✅ Server started at http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error("❌ Database connection failed:", err.message);
		process.exit(1);
	});
