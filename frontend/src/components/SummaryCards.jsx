
import React from "react";

function SummaryCards({ totalSales, totalProfit }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white shadow p-4 rounded-lg">
        <p className="text-gray-600">Total Sales</p>
        <h2 className="text-xl font-bold">{totalSales}</h2>
      </div>
      <div className="bg-white shadow p-4 rounded-lg">
        <p className="text-gray-600">Total Profit</p>
        <h2 className="text-xl font-bold">{totalProfit}</h2>
      </div>
    </div>
  );
}

export default SummaryCards;
