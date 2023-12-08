import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/api/add-product", async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const { name, description, imageFileName, price, isActive } = req.body;

    if (
      !name ||
      !description ||
      !imageFileName ||
      price == null ||
      isActive == null
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const sql = `CALL PROD_ADD_SP(:sp_product_name, :sp_description, :sp_productimage, :sp_price, :sp_active)`;
    await connection.execute(sql, {
      sp_product_name: name,
      sp_description: description,
      sp_productimage: imageFileName,
      sp_price: price,
      sp_active: isActive ? 1 : 0,
    });

    await connection.commit();
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeError) {
        console.error("Error closing connection:", closeError);
      }
    }
  }
});

router.get("/api/search-products", async (req, res) => {
  const connection = await db.getConnection();
  try {
    const { query } = req.query;

    const sql = `SELECT * FROM BB_PRODUCT WHERE UPPER(PRODUCTNAME) LIKE UPPER(:query)`;
    const result = await connection.execute(sql, { query: "%" + query + "%" });

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeError) {
        console.error("Error closing connection:", closeError);
      }
    }
  }
});

router.get("/api/products", async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection();
    const sql = "SELECT * FROM BB_PRODUCT";
    const result = await connection.execute(sql);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeError) {
        console.error("Error closing connection:", closeError);
      }
    }
  }
});

export default router;
