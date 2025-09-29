
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function MonthlyLineChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Monthly Sales ($)",
        data: [12000, 15000, 18000, 10000, 17000, 22000, 19000],
        borderColor: "rgba(59, 130, 246, 1)",   // Blue
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.3, // smooth curve
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl mb-2">Monthly Sales Trend</h2>
      <Line data={data} />
    </div>
  );
}
