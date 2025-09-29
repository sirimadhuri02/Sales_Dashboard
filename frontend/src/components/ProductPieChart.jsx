
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProductPieChart() {
  const data = {
    labels: ["Shoes", "Bags", "Watches", "Clothes"],
    datasets: [
      {
        label: "Product Sales",
        data: [300, 150, 100, 200],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",   // Blue
          "rgba(16, 185, 129, 0.7)",   // Green
          "rgba(249, 115, 22, 0.7)",   // Orange
          "rgba(239, 68, 68, 0.7)",    // Red
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl mb-2">Product Distribution</h2>
      <Pie data={data} />
    </div>
  );
}
