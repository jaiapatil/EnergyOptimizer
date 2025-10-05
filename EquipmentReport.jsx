import React from "react";

const EquipmentReport = ({ company }) => {
  const equipments = company?.equipments || [];

  return (
    <div className="p-4 bg-[#111827] rounded-lg min-h-screen">
      <h2 className="text-xl font-bold text-white mb-4">Equipment Details</h2>
      <p className="text-white mb-6 font-medium">Available Equipments: {equipments.length}</p>

      <div className="flex flex-wrap gap-4 ">
        {equipments.map((eq, index) => (
          <div
            key={index}
            className="flex-1 min-w-[250px] bg-[#182237] h-60 space-y-2 p-4 rounded-lg text-white shadow"
          >
            <h3 className="font-semibold text-lg mb-2">Equipment {index + 1}: {eq.name || "Unnamed"}</h3>
            <p>Details: {eq.details || ""}</p>
            <p>Status: {eq.status || "Unknown"}</p>
            <p>Efficiency: {eq.efficiency ?? "N/A"}%</p>
            <p>Individual Power Factor: {eq.powerFactor ?? "N/A"}</p>
            <p>Alerts: {eq.alerts?.length ? eq.alerts.join(", ") : "No active alerts"}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
  <h2 className="text-xl font-bold mb-2">Suggestions</h2>
  <div className="bg-[#182237] p-4 rounded text-gray-100">
    {equipments.map((eq,index) => (
      <ul 
        key={index}
        className="list-disc list-inside space-y-1"
      >
        <li>Equipment {index + 1}: {eq.name || "Unnamed"}</li>
        {(eq.powerFactor >= 0.5 && company.energyMetrics.actualConsumption <= 0.7*(company?.energyMetrics?.idealConsumption*12 ))? 
          <> 
          <li>
          Power consumption is ediquate with the power factor of {eq.powerFactor}
          </li>
          <li>The energy consumption is also up to the mark.</li>
          </>:
          <>
            <li>For the {eq.name} powerfactor if {eq.powerFactor}</li>
            <li>The active alerts are : {eq.alerts || "No Alerts"}</li>
            <li>The system needs immediate action on the energy consumption stats.</li>
          </>}
      </ul>
    ))}
    <ul className="list-disc list-inside space-y-1">
      <li>Check equipment efficiency regularly and maintain above 85%.</li>
      <li>Apply capacitors or power factor correction devices to improve low power factor equipment.</li>
      <li>Schedule preventive maintenance for machines showing frequent alerts.</li>
      <li>Monitor energy consumption trends and reduce unnecessary usage.</li>
      <li>Go to the <span className="text-green-600">Action</span> section for taking quick actions.</li>
    </ul>
  </div>
</div>

    </div>
  );
};

export default EquipmentReport;

