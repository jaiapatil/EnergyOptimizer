export default function DashboardHeader({ company }) {

  

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white mb-6">
      <div className="bg-[#111827] p-4 rounded">
        <p className="text-sm text-gray-400">Current Consumption</p>
        <h2 className="text-2xl font-bold"> {company.energyMetrics.actualConsumption} kW</h2>
        <p className="text-xs text-green-400">▲ 5.2% from yesterday</p>
      </div>
      <div className="bg-[#111827] p-4 rounded">
        <p className="text-sm text-gray-400">Today's Cost</p>
        <h2 className="text-2xl font-bold">${company.energyMetrics.actualCost}</h2>
        <p className="text-xs text-green-400">▼ 12.3% savings vs. target</p>
      </div>
      <div className="bg-[#111827] p-4 rounded">
        <p className="text-sm text-gray-400">System Efficiency</p>
        <h2 className="text-2xl font-bold">{company.energyMetrics.actualEfficiency}%</h2>
      </div>
      <div className="bg-[#111827] p-4 rounded">
        <p className="text-sm text-gray-400">Active Alerts</p>
        <h2 className="text-2xl font-bold">{company.alerts.active.length}</h2>
        <p className="text-xs text-yellow-400">
          {company.energyMetrics.actualEfficiency < company.energyMetrics.idealEfficiency
            ? "Efficiency is below ideal!"
            : "Efficiency is OK"}
        </p>
      </div>
    </div>
  );
}
