import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db.js";
import insightsRoute from "./routes/insights.js";

dotenv.config();       // 1️⃣ Load env variables

const app = express(); // 2️⃣ Initialize Express app

app.use(cors());       // 3️⃣ Middleware
app.use(express.json());

connectDB();           // 4️⃣ Connect to MongoDB

// 5️⃣ Routes
app.use("/api/insights", insightsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
