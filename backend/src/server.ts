import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";
import stockRoutes from "./routes/stock.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/stock", stockRoutes);

app.get("/", (_req, res) => {
  res.json({
    message: "Inventory API is running",
  });
});

pool
  .query("SELECT NOW()")
  .then((result) => {
    console.log("Database connected:", result.rows[0]);
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});