import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/api/change-product-description", async (req, res) => {
  try {
    const { productId, newDescription } = req.body;
    const connection = await db.getConnection();
    const sql = `
        BEGIN
          CHANGE_PRODUCT_DESCRIPTION(:productId, :newDescription);
        END;
      `;
    const result = await connection.execute(sql, {
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

    await connection.close();
    res
      .status(200)
      .json({ message: "Product description updated successfully" });
  } catch (error) {
    console.error("Error updating product description:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default router;
