
import { useEffect, useState } from "react";
import SummaryCards from "./components/SummaryCards";
import RegionBarChart from "./components/RegionBarChart";
import ProductPieChart from "./components/ProductPieChart";
import MonthlyLineChart from "./components/MonthlyLineChart";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/insights`)
      .then(res => res.json())
      .then(setData)
      .catch(() => setError("Failed to load data"));
  }, []);
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p className="p-4">Loading...</p>;
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Sales Dashboard</h1>
      <SummaryCards sales={data.totalSales} profit={data.totalProfit}/>
      <RegionBarChart data={data.salesPerRegion}/>
      <ProductPieChart data={data.topProducts}/>
      <MonthlyLineChart data={data.monthlyTrend}/>
    </div>
  );
}
