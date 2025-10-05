import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const SixMonthTrend = ({ company }) => {
  if (!company) return <p>No company data available.</p>;

  const consumptionHistory = company?.energyMetrics?.consumptionHistory || [];
  const costHistory = company?.energyMetrics?.costHistory || [];
  const idealCostPerMonth = company?.energyMetrics?.idealCost || 0;

  const data = [];

  for (let i = Math.max(0, consumptionHistory.length - 6); i < consumptionHistory.length; i++) {
    const timestamp = consumptionHistory[i]?.timestamp;
    const month = timestamp
      ? monthNames[new Date(timestamp).getMonth()]
      : `Month ${i + 1}`;

    const actualCost = costHistory[i]?.value || 0;
    const previousCost = costHistory[i - 1]?.value || 0;
    const monthlyActualCost = i === 0 ? actualCost : actualCost - previousCost;

    const monthlySavings = Math.max(0, idealCostPerMonth - monthlyActualCost);

    data.push({
      month,
      consumption: consumptionHistory[i]?.value || 0,
      savings: monthlySavings,
    });
  }

  if (data.length === 0) return <p>No consumption or cost data available.</p>;

  return (
    <div className="bg-[#111827] p-6 rounded h-96">
      <h2 className="text-xl font-bold mb-4">6-Month Consumption & Savings Trend</h2>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1F2937", border: "none", color: "#fff" }}
          />
          <Legend wrapperStyle={{ color: "#fff" }} />
          <Line
            type="monotone"
            dataKey="consumption"
            stroke="#4ade80"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="savings"
            stroke="#facc15"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SixMonthTrend;
