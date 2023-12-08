import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/api/change-product-description", async (req, res) => {
  const connection = await db.getConnection();
  try {
    const { productId, newDescription } = req.body;
    if (!productId || !newDescription) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const sql = `BEGIN CHANGE_PRODUCT_DESCRIPTION(:productId, :newDescription); END;`;

    await connection.execute(sql, {
      productId: {
        dir: db.BIND_IN,
        val: productId,
        type: db.NUMBER,
      },
      newDescription: {
        dir: db.BIND_IN,
        val: newDescription,
        type: db.STRING,
      },
    });

    await connection.commit();
    res
      .status(200)
      .json({ message: "Product description updated successfully" });
  } catch (error) {
    console.error("Error updating product description:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

export default router;
