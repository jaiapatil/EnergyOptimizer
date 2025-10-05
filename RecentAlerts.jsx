
export default function RecentAlerts({ company }) {
  const alerts = [
    { message: `${company.alerts.active[0]}`, time: "10 minutes ago", level: "warning" },
    { message: `${company.alerts.active[1]}`, time: "25 minutes ago", level: "critical" },
    { message: `${company.alerts.active[2]}`, time: "1 hour ago", level: "info" },
  ];
  const levelColors = {
    warning: 'text-yellow-400',
    critical: 'text-red-400',
    info: 'text-green-400',
  };

  return (
    <div className="bg-[#111827] p-6 rounded text-white">
      <h4 className="text-lg font-bold mb-4">Recent Alerts</h4>
      <ul className="space-y-3 text-sm">
        {alerts.map((alert, idx) => (
          <li key={idx} className={`flex justify-between ${levelColors[alert.level]}`}>
            <span>{alert.message}</span>
            <span className="text-gray-400">{alert.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
