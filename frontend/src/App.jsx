import SummaryCards from "./components/SummaryCards";
import RegionBarChart from "./components/RegionBarChart";
import ProductPieChart from "./components/ProductPieChart";
import MonthlyLineChart from "./components/MonthlyLineChart";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Sales Dashboard</h1>

      {/* Top Summary Cards */}
      <SummaryCards />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Left Side */}
        <RegionBarChart />

        {/* Right Side */}
        <ProductPieChart />
      </div>

      {/* Full width bottom chart */}
      <div className="mt-6">
        <MonthlyLineChart />
      </div>
    </div>
  );
}
