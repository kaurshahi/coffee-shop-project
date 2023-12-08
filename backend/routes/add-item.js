import express from "express";
import db from "../config/db.js";
import oracledb from "oracledb";

const router = express.Router();

router.post("/api/add-basket-item", async (req, res) => {
  let connection;
  try {
    const productId = parseInt(req.body.productId, 10);
    const basketId = parseInt(req.body.basketId, 10);
    const price = parseFloat(req.body.price);
    const quantity = parseInt(req.body.quantity, 10);
    const sizeCode = parseInt(req.body.sizeCode, 10);
    const formCode = parseInt(req.body.formCode, 10);

    if (
      isNaN(productId) ||
      isNaN(basketId) ||
      isNaN(price) ||
      isNaN(quantity) ||
      isNaN(sizeCode) ||
      isNaN(formCode)
    ) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    connection = await db.getConnection();
    const sql = `CALL BASKET_ADD_SP(:p_idproduct, :p_idbasket, :p_price, :p_quantity, :p_option1, :p_option2)`;

    await connection.execute(sql, {
      p_idproduct: {
        val: productId,
        dir: oracledb.BIND_IN,
        type: oracledb.NUMBER,
      },
      p_idbasket: {
        val: basketId,
        dir: oracledb.BIND_IN,
        type: oracledb.NUMBER,
      },
      p_price: { val: price, dir: oracledb.BIND_IN, type: oracledb.NUMBER },
      p_quantity: {
        val: quantity,
        dir: oracledb.BIND_IN,
        type: oracledb.NUMBER,
      },
      p_option1: {
        val: sizeCode,
        dir: oracledb.BIND_IN,
        type: oracledb.NUMBER,
      },
      p_option2: {
        val: formCode,
        dir: oracledb.BIND_IN,
        type: oracledb.NUMBER,
      },
    });

    res.status(200).json({ message: "Item added to basket successfully" });
  } catch (error) {
    console.error("Error on /api/add-basket-item:", error);
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
