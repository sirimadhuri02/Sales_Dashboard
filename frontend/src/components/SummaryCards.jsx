import { useEffect, useState } from "react";

export default function SummaryCards() {
  const [summary, setSummary] = useState({
    totalSales: 0,
    totalProfit: 0,
    regions: 0,
    products: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/insights")
      .then(res => res.json())
      .then(data => {
        setSummary({
          totalSales: data.totalSales,
          totalProfit: data.totalProfit,
          regions: Object.keys(data.regionSales).length,
          products: Object.keys(data.productSales || {}).length,
        });
      })
      .catch(err => console.error("Error fetching summary:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-800 p-4 rounded-lg shadow">
        Total Sales: ${summary.totalSales.toLocaleString()}
      </div>
      <div className="bg-gray-800 p-4 rounded-lg shadow">
        Total Profit: ${summary.totalProfit.toLocaleString()}
      </div>
      <div className="bg-gray-800 p-4 rounded-lg shadow">
        Regions: {summary.regions} | Products: {summary.products}
      </div>
    </div>
  );
}
