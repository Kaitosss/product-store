import { sql } from "../config/db.js";
import cloudinary from "../lib/cloudinary.js";

export const getProducts = async (req, res) => {
  try {
    const products = await sql`
    SELECT * FROM products 
    ORDER BY create_at DESC
    `;

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in getProducts function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await sql`
    SELECT * FROM products WHERE id = ${id}
    `;

    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.log("Error in getProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, image, price } = req.body;

  const result = await cloudinary.uploader.upload(image, {
    folder: "product-store",
  });

  if (!name || !image || !price) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const newProduct = await sql`
      INSERT INTO products (name,image,price,"imagePublicId")
      VALUES (${name},${result.secure_url},${price},${result.public_id})
      RETURNING *
    `;

    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.log("Error in createProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  if (!name || !image || !price) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const result_publicId = await sql`
    SELECT image,"imagePublicId" FROM products WHERE id=${id}
    `;

    let public_id = result_publicId[0].imagePublicId;
    let ImageUrl = result_publicId[0].image;

    if (image.startsWith("data:image")) {
      await cloudinary.uploader.destroy(public_id);

      const result = await cloudinary.uploader.upload(image, {
        folder: "product-store",
      });

      ImageUrl = result.secure_url;
      public_id = result.public_id;
    }

    const updateProduct = await sql`
      UPDATE products
      SET name=${name}, price=${price}, image=${ImageUrl}, "imagePublicId"=${public_id}
      WHERE id=${id}
      RETURNING *
    `;

    if (updateProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({ success: true, data: updateProduct[0] });
  } catch (error) {
    console.log("Error in updateProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql`
      SELECT "imagePublicId" FROM products WHERE id=${id}
    `;

    const public_id = result[0]?.imagePublicId;

    if (public_id) {
      await cloudinary.uploader.destroy(public_id);
    }

    const deletedProduct = await sql`
      DELETE FROM products WHERE id=${id} RETURNING *
    `;

    if (deletedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Proๆduct not found",
      });
    }

    res.status(200).json({ success: true, data: deletedProduct[0] });
  } catch (error) {
    console.log("Error in deleteProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
