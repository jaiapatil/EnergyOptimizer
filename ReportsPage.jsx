import { SlidersHorizontal, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import ReportChartPlaceholder from "./ReportChartPlaceholder";
import Consumpstion from "./Consumpstion";
import CA from "./CA";
import Costing from "./Costing";
import EquipmentReport from "./EquipmentReport";
// import DownloadButton from "./DownloadButton";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportPDF from "./ReportPDF";

export default function ReportsPage({ user, token }){
  const [date, setDate] = useState(new Date(Date.now()));
  const [companyData, setCompanyData] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const fetchData = async () => {
    const savedToken = token || localStorage.getItem("token");
    if (!savedToken) return;
    const res = await fetch(
      `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/verify`,
      {
        headers: { Authorization: `Bearer ${savedToken}` },
      }
    );

    const data = await res.json();
    if (res.ok) {
      setCompanyData(data.companyData);
    } else {
      console.log("Session Expired");
    }
  };
  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [token]);

  const tabs = ["Overview", "Consumption", "Cost Analysis", "Equipment/Suggestion", "Downloads", "Action"];

  const summaryStats = [
    {
      label: "Total Consumption",
      value: `${companyData?.energyMetrics?.actualConsumption || 0}`,
      change: `${(
        (companyData?.energyMetrics?.idealConsumption -
          (companyData?.energyMetrics?.actualConsumption)/2) /
        100 || 0
      ).toFixed(2)}%`,
      direction: "▼",
      changeColor: "text-green-400",
    },
    {
      label: "Total Cost",
      value: `$${(
        companyData?.energyMetrics?.actualCost -
        0.3 * companyData?.energyMetrics?.actualCost
      ).toFixed(2) || 0}`,
      change: "-30%",
      direction: "▼",
      changeColor: "text-green-400",
    },
    {
      label: "Monthly Savings",
      value: `${companyData?.energyMetrics?.actualCost*0.3}`,
      change: "+8%",
      direction: "▲",
      changeColor: "text-green-400",
    },
    {
      label: "Efficiency Score",
      value: "87% (prior = 85%)",
      change: "+3%",
      direction: "▲",
      changeColor: "text-green-400",
      badge: "Excellent",
    },
  ];

  // Sections for each tab
  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {summaryStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-[#111827] p-4 rounded flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <h2 className="text-2xl font-bold">{stat.value}</h2>
                    <p className={`text-xs ${stat.changeColor}`}>
                      {stat.direction} {stat.change} vs last month
                    </p>
                  </div>
                  {stat.badge && (
                    <span className="text-xs bg-green-700 text-white px-2 py-1 rounded">
                      {stat.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Chart Placeholder */}
            <section className="bg-[#111827] p-6 rounded h-[460px]">
              <ReportChartPlaceholder  company={companyData}/>
            </section>
          </>
        );

      case "Consumption":
        return(
          <>
            <Consumpstion company={companyData} />
          </>
        );

      case "Cost Analysis":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {summaryStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-[#111827] p-4 rounded flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <h2 className="text-2xl font-bold">{stat.value}</h2>
                    <p className={`text-xs ${stat.changeColor}`}>
                      {stat.direction} {stat.change} vs last month
                    </p>
                  </div>
                  {/* {stat.badge && (
                    <span className="text-xs bg-green-700 text-white px-2 py-1 rounded">
                      {stat.badge}
                    </span>
                  )} */}
                </div>
              ))}
            </div>

            <Costing company={companyData}/>
          </>
        );

      case "Equipment/Suggestion":
        return (
          <>
            <EquipmentReport company={companyData}/>
          </>
        );

        case "Downloads":
  return (
    
    <>
      <div>
        <p className="mb-5 text-2xl text-gray-300">Download the full report for the documentation purpose here </p>
        <PDFDownloadLink
          document={<ReportPDF company={companyData}/>}
          fileName= {`${companyData?.name || "report"}_energy_report.pdf`}
        >
          {({ loading }) =>
        loading ? (
          <button className="bg-gray-400 text-white px-4 py-2 rounded">
            Preparing...
          </button>
        ) : (
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Download PDF
          </button>
        )
      }
        </PDFDownloadLink>
      </div>
    
    </>
  );


        

        
      case "Action":
        return (
          <>
            <CA company = {companyData}  token={token} refreshCompany={fetchData}/>
          </>
        )

      default:
        return null;
    }
  };

  return (
    <main className="bg-[#0B0F1A] text-white min-h-screen px-6 py-12 font-sans">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Energy Reports & Analytics
        </h1>
        <p className="text-gray-400">
          Comprehensive insights and downloadable reports for your energy consumption data
        </p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded text-sm font-semibold transition-all duration-200 ${
              tab === activeTab
                ? "bg-white text-black shadow"
                : "bg-[#1F2937] text-white hover:bg-[#374151]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter + Refresh Buttons */}
      <div className="flex justify-end gap-3 mb-4">
        <Button className="bg-[#111827] border border-gray-600 text-white hover:bg-white/10 flex items-center gap-2">
          {/* <SlidersHorizontal size={16} /> */} {companyData?.name || "Name"}
        </Button>
        <Button className="bg-[#111827] border border-gray-600 text-white hover:bg-white/10 flex items-center gap-2">
          {/* <RefreshCw size={16} /> */} {new Date().toISOString().split("T")[0]}
        </Button>
      </div>

      {/* Content */}
      {renderContent()}
    </main>
  );
}

