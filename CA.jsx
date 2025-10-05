import React, { useState } from "react";
import axios from "axios";

const CA = ({ company, token, refreshCompany }) => {
  const ideal = company?.energyMetrics?.idealConsumption || 0;
  const actual = company?.energyMetrics?.actualConsumption || 0;

  const [loading, setLoading] = useState(false);

  const handleReduceConsumption = async () => {
    setLoading(true);
    try {
      
      const reducedConsumption = company.energyMetrics.actualConsumption * 0.7;
      const reducedCost = company.energyMetrics.actualCost * 0.7; 

      await axios.post(
        `http://localhost:4000/api/company/${company._id}/reset-consumption`,
        {
          newConsumption: reducedConsumption,
          newCost: reducedCost, 
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      refreshCompany(); 
    } catch (err) {
      console.error(err);
      alert("Failed to reduce consumption");
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#111827] rounded-lg p-6 h-96 mt-5 text-white">
      <h2 className="text-2xl font-bold mb-4">Actions Report</h2>
      <p>
        <span className="font-semibold">Ideal Consumption:</span> {ideal}
      </p>
      <p>
        <span className="font-semibold">Actual Consumption:</span> {actual}
      </p>
        {(actual >ideal*6 ) && (
            <button
            onClick={handleReduceConsumption}
            disabled={loading}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50 cursor-pointer"
            >
            {loading ? "Updating..." : "Reduce Consumption by 30%"}
            </button>
        )}
        {
            (actual <= ideal*6 ) && (
                <p className="mt-5 text-xl text-green-600">No action needed</p>
            )
        }
      </div>
  );
};

export default CA;

