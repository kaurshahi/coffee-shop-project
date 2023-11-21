import express from "express";
import cors from "cors";
import basketsRouter from "./routes/change-product-description.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", basketsRouter);

export default app;
