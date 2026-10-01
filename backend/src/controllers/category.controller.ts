import type { Request, Response } from "express";
import pool from "../config/db";

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        created_at
      FROM categories
      ORDER BY id ASC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Get categories error:", error);

    res.status(500).json({
      message: "Failed to get categories",
    });
  }
};