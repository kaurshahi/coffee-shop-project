import express from "express";
import db from "../config/db.js";
import oracledb from "oracledb";
const router = express.Router();

router.post("/api/checkBasketStock", async (req, res) => {
  const { basketId } = req.body;
  let connection;

  try {
    connection = await db.getConnection();
    const result = await connection.execute(
      `BEGIN allbasket_item_stockstatus_sp(:basketId, :stockStatus); END;`,
      {
        basketId: basketId,
        stockStatus: {
          dir: oracledb.BIND_OUT,
          type: oracledb.STRING,
          maxSize: 100,
        },
      }
    );

    const stockStatus = result.outBinds.stockStatus;
    console.log(stockStatus);
    res.json({ message: stockStatus });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred while checking basket stock");
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
router.get("/api/getBasketNumbers", async (req, res) => {
  let connection;

  try {
    connection = await db.getConnection();
    const result = await connection.execute(
      `SELECT DISTINCT IDBASKET FROM BB_BASKET`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    const basketNumbers = result.rows.map((row) => row.IDBASKET);

    res.json({ baskets: basketNumbers });
  } catch (err) {
    console.error("Error fetching basket numbers:", err);
    res.status(500).send("Error occurred while fetching basket numbers");
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

router.get("/api/shopperTotalSpending/:shopperId", async (req, res) => {
  const { shopperId } = req.params;
  let connection;

  try {
    connection = await db.getConnection();
    const result = await connection.execute(
      `SELECT idshopper, Tot_purch_sf(idshopper) AS totalSpending FROM bb_basket WHERE idshopper = :shopperId GROUP BY idshopper`,
      { shopperId: shopperId },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json(result.rows[0] || { message: "No data found" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred while calculating total spending");
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
