
import { Bar } from "react-chartjs-2";

export default function RegionBarChart() {
  const data = {
    labels: ["North", "South", "East", "West"],
    datasets: [
      {
        label: "Sales",
        data: [12000, 19000, 3000, 5000],
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl mb-2">Sales by Region</h2>
      <Bar data={data} />
    </div>
  );
}
