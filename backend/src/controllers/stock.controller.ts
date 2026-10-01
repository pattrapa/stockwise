import type { Request, Response } from "express";
import pool from "../config/db";

export const stockIn = async (req: Request, res: Response) => {
  const client = await pool.connect();

  try {
    const { product_id, quantity, note } = req.body;

    if (!product_id || !quantity || Number(quantity) <= 0) {
      return res.status(400).json({
        message: "กรุณาระบุสินค้าและจำนวนที่ถูกต้อง",
      });
    }

    await client.query("BEGIN");

    const productResult = await client.query(
      `
      SELECT id, stock
      FROM products
      WHERE id = $1
      FOR UPDATE
      `,
      [product_id]
    );

    if (productResult.rowCount === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        message: "ไม่พบสินค้า",
      });
    }

    await client.query(
      `
      UPDATE products
      SET
        stock = stock + $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      `,
      [quantity, product_id]
    );

    const transactionResult = await client.query(
      `
      INSERT INTO stock_transactions
      (
        product_id,
        type,
        quantity,
        note
      )
      VALUES ($1, 'IN', $2, $3)
      RETURNING *
      `,
      [
        product_id,
        quantity,
        note ?? null,
      ]
    );

    await client.query("COMMIT");

    res.status(201).json({
      message: "รับสินค้าเข้าสำเร็จ",
      transaction: transactionResult.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Stock in error:", error);

    res.status(500).json({
      message: "Failed to stock in product",
    });
  } finally {
    client.release();
  }
};