import DashboardHeader from './DashboardHeader';
import EnergyCharts from './EnergyCharts';
import EquipmentPerformance from './EquipmentPerformance';
import RecentAlerts from './RecentAlerts';
import AIRecommendations from './AIRecommendations';
import { useEffect, useState } from 'react';


export default function Dashboard({ user, token }) {

  const [companyData, setCompanyData] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);




  useEffect(() => {
    const fetchData = async () => {
      const savedToken = token || localStorage.getItem("token");
      if (!savedToken) return;
      const res = await fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setCompanyData(data.companyData);
      } else {
        console.log("Session Expired");
      }

    };

    fetchData();


    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [token]);


  useEffect(() => {
    if (!companyData?._id) return;

    const fetchWeekly = async () => {
      const res = await fetch(
        `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/stats/weekly/${companyData._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      console.log("Weekly API response:", data);
      if (res.ok) {
        setWeeklyData(data.weekly);
      }
    };

    fetchWeekly();
  }, [companyData, token]);

  if (!companyData) {
    return (
      <main className="bg-[#0B0F1A] min-h-screen px-6 py-8 text-white font-sans">
        <DashboardHeader
          company={{
            energyMetrics: {
              actualConsumption: 0,
              actualCost: 0,
              actualEfficiency: 0,
              idealEfficiency: 0,
            },
            alerts: { active: [] },
          }}
        />
        <EnergyCharts
          company={{
            energyMetrics: { consumptionHistory: [], costHistory: [] },
          }}
          weeklydata={[]}
          token={token}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <EquipmentPerformance
              company={{
                equipments: [
                  { name: "Loading...", efficiency: 0 },
                  { name: "Loading...", efficiency: 0 },
                  { name: "Loading...", efficiency: 0 },
                ],
                energyMetrics: { actualConsumption: 0 },
              }}
            />
          </div>
          <RecentAlerts company={{ alerts: { active: [] } }} />
        </div>
        <AIRecommendations />
      </main>
    );
  }


  return (
    <main className="bg-[#0B0F1A] min-h-screen px-6 py-8 text-white font-sans">
      <DashboardHeader company={companyData} />
      <EnergyCharts company={companyData} weeklydata={weeklyData} token={token} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <EquipmentPerformance company={companyData} />
        </div>
        <RecentAlerts company={companyData} />
      </div>
      <AIRecommendations
        company={companyData}
        token={token}
        refreshCompany={() => {
          // re-fetch latest data after update
          fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/verify`, {
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((res) => res.json())
            .then((data) => setCompanyData(data.companyData));
        }}
      />

    </main>
  );
}

