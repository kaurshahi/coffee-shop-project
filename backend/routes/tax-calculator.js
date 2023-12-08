// Import necessary modules and database configuration
import express from "express";
import db from "../config/db.js";
import oracledb from "oracledb";

const router = express.Router();

router.post("/api/calculate-tax", async (req, res) => {
  let connection;
  try {
    const { state, subtotal } = req.body;

    // Validate inputs
    if (!state || subtotal === undefined) {
      return res
        .status(400)
        .json({ message: "State and subtotal are required" });
    }

    connection = await db.getConnection();
    const sql = `CALL TAX_COST_SP(:sp_shopper_state, :sp_basket_subtotal, :sp_tax_amount)`;
    const binds = {
      sp_shopper_state: state,
      sp_basket_subtotal: subtotal,
      sp_tax_amount: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    };

    const result = await connection.execute(sql, binds);

    const taxAmount = result.outBinds.sp_tax_amount;
    res.json({ taxAmount });
  } catch (error) {
    console.error("Error on /api/calculate-tax:", error);
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
