import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function WeeklyOverview({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-400">No weekly data available</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="day" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip />
        <Line type="monotone" dataKey="consumption" stroke="#60A5FA" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
