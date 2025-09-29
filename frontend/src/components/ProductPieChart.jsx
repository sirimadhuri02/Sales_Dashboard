import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

export default function ProductPieChart() {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetch("http://localhost:5000/api/insights")
      .then(res => res.json())
      .then(res => {
        const labels = res.topProducts.map(p => p[0]);
        const values = res.topProducts.map(p => p[1]);

        setData({
          labels,
          datasets: [
            {
              label: "Top Products",
              data: values,
              backgroundColor: [
                "rgba(59, 130, 246, 0.7)",
                "rgba(16, 185, 129, 0.7)",
                "rgba(249, 115, 22, 0.7)",
                "rgba(239, 68, 68, 0.7)",
                "rgba(168, 85, 247, 0.7)",
              ],
              borderColor: [
                "rgba(59, 130, 246, 1)",
                "rgba(16, 185, 129, 1)",
                "rgba(249, 115, 22, 1)",
                "rgba(239, 68, 68, 1)",
                "rgba(168, 85, 247, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl mb-2">Top Products</h2>
      <Pie data={data} />
    </div>
  );
}
