import express from "express";
import SalesData from "../models/SalesData.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// Setup Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// GET /api/insights
router.get("/", async (req, res) => {
  try {
    const data = await SalesData.find();

    // Aggregations
    const totalSales = data.reduce((sum, d) => sum + d.sales, 0);
    const totalProfit = data.reduce((sum, d) => sum + d.profit, 0);

    const monthlySales = {};
    data.forEach(d => {
      const month = new Date(d.date).toLocaleString("default", { month: "short", year: "numeric" });
      monthlySales[month] = (monthlySales[month] || 0) + d.sales;
    });

    const regionSales = {};
    data.forEach(d => {
      regionSales[d.region] = (regionSales[d.region] || 0) + d.sales;
    });

    const productSales = {};
    data.forEach(d => {
      productSales[d.product] = (productSales[d.product] || 0) + d.sales;
    });
    const topProducts = Object.entries(productSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Gemini AI prompt
    const prompt = `
      Analyze this company's sales data and summarize insights:
      - Total Sales: ${totalSales}
      - Total Profit: ${totalProfit}
      - Monthly Sales: ${JSON.stringify(monthlySales)}
      - Region Sales: ${JSON.stringify(regionSales)}
      - Top Products: ${JSON.stringify(topProducts)}
      Provide a clear, business-friendly summary.
    `;

    const result = await model.generateContent(prompt);

    res.json({
      totalSales,
      totalProfit,
      monthlySales,
      regionSales,
      topProducts,
      aiSummary: result.response.text()
    });

  } catch (err) {
    console.error("❌ Error fetching insights:", err.message);
    res.status(500).json({ error: "Failed to fetch insights" });
  }
});

export default router;
