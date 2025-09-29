import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import insightsRoute from "./routes/insights.js";
import cors from "cors";
app.use(cors());


dotenv.config();

const app = express();
connectDB();

app.use("/api/insights", insightsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
