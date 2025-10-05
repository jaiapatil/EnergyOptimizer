import ConsumptionChart from "../components/ConsumptionChart.jsx";
import DynamicWeeklyChart from "./DynamicWeeklyChart.jsx";
import WeeklyOverview from "./WeeklyOverview.jsx";


export default function EnergyCharts({ company, weeklydata, token}) {
  if (!company) return <p>Loading chart...</p>;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-36 h-96 " >
      <div className="bg-[#111827] p-6 rounded text-white h-[500px]">
        <h4 className="font-bold mb-2">Energy Consumption Today</h4>
        <p className="text-sm text-gray-400 mb-4">Hourly consumption breakdown</p>
        <div className="">
          <ConsumptionChart consumptionHistory={company.energyMetrics.consumptionHistory} />
        </div>
      </div>

      <div className="bg-[#111827] p-7 rounded text-white h-[450px] ">
        <h4 className="font-bold mb-2">Weekly Overview</h4>
        <p className="text-sm text-gray-400 mb-4">Consumption for past 7 days</p>
        <div className="">
        <DynamicWeeklyChart consumptionHistory={company.energyMetrics.consumptionHistory} token={token} />

        </div>
      </div>
    </div>
  );
}
