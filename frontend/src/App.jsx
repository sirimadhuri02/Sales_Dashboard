import React, { useEffect, useState } from "react";
import SummaryCards from "./components/SummaryCards";
import RegionBarChart from "./components/RegionBarChart";
import ProductPieChart from "./components/ProductPieChart";
import MonthlyLineChart from "./components/MonthlyLineChart";

function App() {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    fetch("/api/insights")
      .then(res => res.json())
      .then(data => setInsights(data))
      .catch(err => console.error("❌ Error fetching insights:", err));
  }, []);

  if (!insights) return <p className="text-center mt-10">Loading Dashboard...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📊 Sales Dashboard</h1>

      <SummaryCards totalSales={insights.totalSales} totalProfit={insights.totalProfit} />

      <div className="grid grid-cols-2 gap-4">
        <RegionBarChart data={insights.regionSales} />
        <MonthlyLineChart data={insights.monthlySales} />
      </div>

      <ProductPieChart data={insights.topProducts} />

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold mb-2">AI Insights</h2>
        <p>{insights.aiSummary}</p>
      </div>
    </div>
  );
}

export default App;
