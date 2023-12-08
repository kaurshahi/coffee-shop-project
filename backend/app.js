import express from "express";
import cors from "cors";
import basketsRouter from "./routes/change-product-description.js";
import productRouter from "./routes/products.js";
import taxRouter from "./routes/tax-calculator.js";
import updateOrderStatusRouter from "./routes/update-order-status.js";
import addItemRouter from "./routes/add-item.js";
import saleCheckerRouter from "./routes/sale-checker.js";
import reportsRouter from "./routes/reports.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", basketsRouter);
app.use("/", productRouter);
app.use("/", taxRouter);
app.use("/", updateOrderStatusRouter);
app.use("/", addItemRouter);
app.use("/", saleCheckerRouter);
app.use("/", reportsRouter);

export default app;
