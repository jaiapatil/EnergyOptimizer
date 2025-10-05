const appliances = [
  { name: "Air Conditioner", usage: "1,200 kWh", percent: "23%" },
  { name: "Lighting", usage: "950 kWh", percent: "18%" },
  { name: "Refrigeration", usage: "840 kWh", percent: "16%" },
  { name: "Heating", usage: "790 kWh", percent: "15%" },
  { name: "Computers", usage: "670 kWh", percent: "13%" },
  { name: "Others", usage: "750 kWh", percent: "15%" },
];

export default function ApplianceGrid() {
  return (
    <section className="mb-10">
      <h3 className="text-xl font-bold mb-4">Top Appliance Usage</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {appliances.map((item, i) => (
          <div key={i} className="bg-[#111827] p-4 rounded shadow-sm">
            <h4 className="text-white font-semibold">{item.name}</h4>
            <p className="text-sm text-gray-400">{item.usage}</p>
            <p className="text-xs text-green-400">{item.percent} of total</p>
          </div>
        ))}
      </div>
    </section>
  );
}
