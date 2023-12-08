import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/api/update-order-status", async (req, res) => {
  let connection;
  try {
    const basketNumber = parseInt(req.body.basketNumber, 10);
    if (isNaN(basketNumber)) {
      return res.status(400).json({ message: "Invalid basket number" });
    }

    const dateShipped = new Date(req.body.dateShipped);
    if (isNaN(dateShipped.getTime())) {
      return res.status(400).json({ message: "Invalid date shipped" });
    }

    const shipper = req.body.shipper;
    const trackingNumber = req.body.trackingNumber;

    connection = await db.getConnection();

    await connection.execute(
      `CALL STATUS_SHIP_SP(:basketNumber, :dateShipped, :shipper, :trackingNumber)`,
      {
        basketNumber: basketNumber,
        dateShipped: dateShipped,
        shipper: shipper,
        trackingNumber: trackingNumber,
      }
    );

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error on /api/update-order-status:", error);
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
