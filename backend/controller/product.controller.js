import { sql } from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const products = await sql`
    SELECT * FROM products 
    ORDER BY create_at DESC
    `;

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error getProducts", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getProduct = (req, res) => {};
export const createProduct = (req, res) => {};
export const updateProduct = (req, res) => {};
export const deleteProduct = (req, res) => {};
