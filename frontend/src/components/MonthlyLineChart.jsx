import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

export default function MonthlyLineChart() {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetch("http://localhost:5000/api/insights")
      .then(res => res.json())
      .then(res => {
        const labels = Object.keys(res.monthlySales);
        const values = Object.values(res.monthlySales);

        setData({
          labels,
          datasets: [
            {
              label: "Monthly Sales ($)",
              data: values,
              borderColor: "rgba(59, 130, 246, 1)",
              backgroundColor: "rgba(59, 130, 246, 0.5)",
              tension: 0.3,
              fill: true,
            },
          ],
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl mb-2">Monthly Sales Trend</h2>
      <Line data={data} />
    </div>
  );
}
