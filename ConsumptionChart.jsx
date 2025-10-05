import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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

export default function ConsumptionChart({ consumptionHistory }) {
  const MAX_POINTS = 30; // Limit to last 50 data points
  const limitedData = consumptionHistory.slice(-MAX_POINTS);

  const labels = limitedData.map(entry =>
    new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  const dataValues = limitedData.map(entry => entry.value);

  const data = {
    labels,
    datasets: [
      {
        label: "Consumption (kW)",
        data: dataValues,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "transparent", 
        tension: 0,                     
        borderWidth: 2,
        pointRadius: 2,              
        pointHoverRadius: 4,
        stepped: false                   
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
    //   legend: { position: "top", labels: { color: "#ffffff" } },
    //   title: { display: true, text: "Consumption History", color: "#ffffff", font: { size: 18 } },
    //   tooltip: { mode: "index", intersect: false }
    },
    scales: {
      x: {
        ticks: { color: "#ffffff" },
        grid: { color: "rgba(255,255,255,0.1)" }
      },
      y: {
        ticks: { color: "#ffffff" },
        grid: { color: "rgba(255,255,255,0.1)" },
        beginAtZero: false
      }
    }
  };

  return <div className="h-96"><Line data={data} options={options} /></div>;
}
