import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function DynamicWeeklyChart({ consumptionHistory, token }) {
    const [weeklyData, setWeeklyData] = useState([]);
  
    useEffect(() => {
      const aggregateData = () => {
        if (!consumptionHistory || consumptionHistory.length === 0) return;
  
        const daysOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const dailyMap = {
          Mon: 0,
          Tue: 0,
          Wed: 0,
          Thu: 0,
          Fri: 0,
          Sat: 0,
          Sun: 0
        };
  
        consumptionHistory.forEach(({ timestamp, value }) => {
          const day = new Date(timestamp).toLocaleDateString("en-US", { weekday: "short" });
          if (dailyMap[day] !== undefined) dailyMap[day] += value;
        });
  
        setWeeklyData(daysOrder.map(day => ({ date: day, value: dailyMap[day] })));
      };
  
      aggregateData();
      const interval = setInterval(aggregateData, 60 * 1000); // refresh every minute
      return () => clearInterval(interval);
    }, [consumptionHistory]);
  
    if (!weeklyData.length) return <p className="text-gray-400 text-center">Loading chart...</p>;
  
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={weeklyData} margin={{ top: 20, right: 20, bottom: 20, left: 50 }}>
          <CartesianGrid stroke="#333" strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fill: "white" }} />
          <YAxis tick={{ fill: "white" }} />
          <Tooltip contentStyle={{ backgroundColor: "#111827", border: "none" }} />
          <Line
            type="stepAfter"
            dataKey="value"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  