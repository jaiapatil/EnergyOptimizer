
export default function EquipmentPerformance({company}) {
  const equipment = [
    { name: `${company.equipments.slice(0,1)[0].name}`, efficiency: `${company.equipments.slice(0,1)[0].efficiency}`, consumption: `${company.energyMetrics.actualConsumption}`, status: 'Optimal' },
    { name: `${company.equipments.slice(1,2)[0].name}`, efficiency: `${company.equipments.slice(1,2)[0].efficiency}`, consumption: 890, status: 'Warning' },
    { name: `${company.equipments.slice(2,3)[0].name}`, efficiency: `${company.equipments.slice(2,3)[0].efficiency}`, consumption: 340, status: 'Optimal' },
    { name: 'Compressors', efficiency: 65, consumption: 1560, status: 'Alert' },
  ];
  const statusColors = {
    Optimal: 'text-green-400',
    Warning: 'text-yellow-400',
    Alert: 'text-red-400'
  };

  return (
    <div className="bg-[#111827] p-6 rounded text-white mb-6">
      <h4 className="text-lg font-bold mb-4">Equipment Performance</h4>
      {equipment.map((item, i) => (
        <div key={i} className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>{item.name}</span>
            <span className={statusColors[item.status]}>{item.status}</span>
          </div>
          <div className="h-2 bg-gray-700 rounded overflow-hidden">
            <div
              className="bg-green-500 h-full"
              style={{ width: `${item.efficiency}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">Efficiency: {item.efficiency}% · Consumption: {item.consumption} kW</p>
        </div>
      ))}
    </div>
  );
}
