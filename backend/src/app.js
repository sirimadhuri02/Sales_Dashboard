
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import insightsRoute from "./routes/insights.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use("/api/insights", insightsRoute);

const PORT = process.env.PORT || 5000;
connectDB().then(() =>
  app.listen(PORT, () => console.log(`🚀 Backend running on ${PORT}`))
);
