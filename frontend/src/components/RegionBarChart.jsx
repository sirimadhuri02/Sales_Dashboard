import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

export default function RegionBarChart() {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetch("http://localhost:5000/api/insights")
      .then(res => res.json())
      .then(res => {
        const labels = Object.keys(res.regionSales);
        const values = Object.values(res.regionSales);

        setData({
          labels,
          datasets: [
            {
              label: "Sales by Region",
              data: values,
              backgroundColor: "rgba(59, 130, 246, 0.7)",
            },
          ],
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl mb-2">Sales by Region</h2>
      <Bar data={data} />
    </div>
  );
}
