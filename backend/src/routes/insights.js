import express from "express";
import SalesData from "../models/SalesData.js";
import OpenAI from "openai";

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// GET /api/insights
router.get("/", async (req, res) => {
  try {
    const data = await SalesData.find();

    // Basic insights
    const totalSales = data.reduce((sum, d) => sum + d.sales, 0);
    const totalProfit = data.reduce((sum, d) => sum + d.profit, 0);

    // Monthly trend
    const monthlySales = {};
    data.forEach(d => {
      const month = new Date(d.date).toLocaleString("default", { month: "short", year: "numeric" });
      monthlySales[month] = (monthlySales[month] || 0) + d.sales;
    });

    // Region breakdown
    const regionSales = {};
    data.forEach(d => {
      regionSales[d.region] = (regionSales[d.region] || 0) + d.sales;
    });

    // Top products
    const productSales = {};
    data.forEach(d => {
      productSales[d.product] = (productSales[d.product] || 0) + d.sales;
    });
    const topProducts = Object.entries(productSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // AI summary
    const prompt = `
      You are analyzing company sales data.
      - Total Sales: ${totalSales}
      - Total Profit: ${totalProfit}
      - Monthly Sales: ${JSON.stringify(monthlySales)}
      - Region Sales: ${JSON.stringify(regionSales)}
      - Top Products: ${JSON.stringify(topProducts)}
      Write a concise summary highlighting key business insights.
    `;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({
      totalSales,
      totalProfit,
      monthlySales,
      regionSales,
      topProducts,
      aiSummary: aiResponse.choices[0].message.content
    });
  } catch (err) {
    console.error("❌ Error fetching insights:", err.message);
    res.status(500).json({ error: "Failed to fetch insights" });
  }
});

export default router;
