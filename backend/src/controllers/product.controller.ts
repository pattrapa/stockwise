import type { Request, Response } from "express";
import pool from "../config/db";

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        p.id,
        p.sku,
        p.name,
        c.name AS category,
        p.cost,
        p.price,
        p.stock,
        p.minimum_stock,
        p.image_url,
        p.created_at,
        p.updated_at
      FROM products p
      LEFT JOIN categories c
        ON p.category_id = c.id
      ORDER BY p.id ASC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      message: "Failed to get products",
    });
  }
};

// เพิ่มสินค้าใหม่
export const createProduct = async (_req: Request, res: Response) => {
  try {
    const {
      sku,
      name,
      category_id,
      cost,
      price,
      stock,
      minimum_stock,
      image_url,
    } = _req.body;

    if (!sku || !name || !category_id) {
      return res.status(400).json({
        message: "sku, name และ category_id จำเป็นต้องมี",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO products
      (
        sku,
        name,
        category_id,
        cost,
        price,
        stock,
        minimum_stock,
        image_url
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
      `,
      [
        sku,
        name,
        category_id,
        cost ?? 0,
        price ?? 0,
        stock ?? 0,
        minimum_stock ?? 5,
        image_url ?? null,
      ],
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error("Create product error:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "รหัสสินค้า SKU นี้มีอยู่แล้ว",
      });
    }

    if (error.code === "23503") {
      return res.status(400).json({
        message: "ไม่พบหมวดหมู่ที่เลือก",
      });
    }

    res.status(500).json({
      message: "Failed to create product",
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        p.id,
        p.sku,
        p.name,
        p.category_id,
        c.name AS category,
        p.cost,
        p.price,
        p.stock,
        p.minimum_stock,
        p.image_url,
        p.created_at,
        p.updated_at
      FROM products p
      LEFT JOIN categories c
        ON p.category_id = c.id
      WHERE p.id = $1
      `,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "ไม่พบสินค้า",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Get product by id error:", error);

    res.status(500).json({
      message: "Failed to get product",
    });
  }
};

// Delete a product by ID
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM products
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "ไม่พบสินค้าที่ต้องการลบ",
      });
    }

    res.json({
      message: "ลบสินค้าสำเร็จ",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Delete product error:", error);

    res.status(500).json({
      message: "Failed to delete product",
    });
  }
};

// Update a product by ID (Optional, if needed in the future)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      sku,
      name,
      category_id,
      cost,
      price,
      stock,
      minimum_stock,
      image_url,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE products
      SET
        sku = $1,
        name = $2,
        category_id = $3,
        cost = $4,
        price = $5,
        stock = $6,
        minimum_stock = $7,
        image_url = $8,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
      RETURNING *
      `,
      [
        sku,
        name,
        category_id,
        cost,
        price,
        stock,
        minimum_stock,
        image_url ?? null,
        id,
      ],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "ไม่พบสินค้าที่ต้องการแก้ไข",
      });
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    console.error("Update product error:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "รหัสสินค้า SKU นี้มีอยู่แล้ว",
      });
    }

    if (error.code === "23503") {
      return res.status(400).json({
        message: "ไม่พบหมวดหมู่ที่เลือก",
      });
    }

    res.status(500).json({
      message: "Failed to update product",
    });
  }
};
