import React, { useState } from "react";
import axios from "axios";

export default function AIRecommendations({ company, token, refreshCompany }) {
  const [loadingOpt, setLoadingOpt] = useState(false);
  const [loadingMaint, setLoadingMaint] = useState(false);

  const handleOptimization = async () => {
    if (!company?._id) return alert("Company data not found!");
    setLoadingOpt(true);

    try {
      const reducedConsumption = company.energyMetrics.actualConsumption * 0.7;
      const reducedCost = company.energyMetrics.actualCost * 0.7;

      const res = await axios.post(
        `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/company/${company._id}/reset-consumption`,
        { newConsumption: reducedConsumption, newCost: reducedCost },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        alert("✅ Optimization scheduled successfully! Cost and consumption reduced by 30%.");
        refreshCompany();
      } else {
        alert("❌ Failed to schedule optimization.");
      }
    } catch (error) {
      console.error("Optimization Error:", error);
      alert("❌ Failed to schedule optimization. Check backend connection or port.");
    } finally {
      setLoadingOpt(false);
    }
  };

  const handleMaintenance = async () => {
    if (!company?._id) return alert("Company data not found!");
    setLoadingMaint(true);

    try {
      const res = await axios.post(
        `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/company/${company._id}/add-alert`,
        { alert: "Maintenance scheduled for compressor efficiency issue." },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        alert("🛠 Maintenance scheduled successfully!");
        refreshCompany();
      } else {
        alert("❌ Failed to schedule maintenance.");
      }
    } catch (error) {
      console.error("Maintenance Error:", error);
      alert("❌ Failed to schedule maintenance. Check backend connection or port.");
    } finally {
      setLoadingMaint(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 💡 Cost Optimization */}
      <div className="bg-[#111827] p-6 rounded text-white shadow-lg">
        <h4 className="text-lg font-bold mb-2 text-green-400">
          💡 Cost Savings Opportunity
        </h4>
        <p className="text-sm text-gray-400 mb-4">
          Shift 40% of production to off-peak hours (11 PM – 6 AM) to save
          $2,400/month.
        </p>
        <button
          onClick={handleOptimization}
          disabled={loadingOpt}
          className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loadingOpt ? "Optimizing..." : "Schedule Optimization"}
        </button>
      </div>

      {/* 🛠 Maintenance */}
      <div className="bg-[#111827] p-6 rounded text-white shadow-lg">
        <h4 className="text-lg font-bold mb-2 text-blue-400">🛠 Maintenance Alert</h4>
        <p className="text-sm text-gray-400 mb-4">
          Compressor efficiency dropped 15%. Schedule maintenance within 7 days.
        </p>
        <button
          onClick={handleMaintenance}
          disabled={loadingMaint}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loadingMaint ? "Scheduling..." : "Schedule Maintenance"}
        </button>
      </div>
    </div>
  );
}
