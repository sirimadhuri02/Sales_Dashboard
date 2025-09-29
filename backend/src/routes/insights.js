import express from "express";
import mongoose from "mongoose";
const router = express.Router();

const SalesSchema = new mongoose.Schema({
  date: Date,
  product: String,
  region: String,
  sales: Number,
  profit: Number
}, { collection: "sales_data" });

const Sale = mongoose.model("Sale", SalesSchema);

router.get("/", async (_req, res) => {
  try {
    const totalSales = await Sale.aggregate([{ $group: { _id: null, total: { $sum: "$sales" } } }]);
    const totalProfit = await Sale.aggregate([{ $group: { _id: null, total: { $sum: "$profit" } } }]);
    const salesPerRegion = await Sale.aggregate([{ $group: { _id: "$region", total: { $sum: "$sales" } } }]);
    const topProducts = await Sale.aggregate([
      { $group: { _id: "$product", total: { $sum: "$sales" } } },
      { $sort: { total: -1 } }, { $limit: 5 }
    ]);
    const monthlyTrend = await Sale.aggregate([
      { $group: { 
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          total: { $sum: "$sales" } } },
      { $sort: { "_id": 1 } }
    ]);

    res.json({
      totalSales: totalSales[0]?.total || 0,
      totalProfit: totalProfit[0]?.total || 0,
      salesPerRegion,
      topProducts,
      monthlyTrend
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

