import express from "express";
import db from "../config/db.js";
import oracledb from "oracledb";

const router = express.Router();

router.post("/api/checkSale", async (req, res) => {
  const { productId, date } = req.body;

  let connection;

  try {
    connection = await db.getConnection();
    const result = await connection.execute(
      `BEGIN :ret := ck_sale_sf(TO_DATE(:p_date, 'YYYY-MM-DD'), :p_productID); END;`,
      {
        ret: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 100 },
        p_date: date,
        p_productID: productId,
      }
    );
    console.log(result);
    res.status(200).json(result.outBinds.ret);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred while checking sale status");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

export default router;
