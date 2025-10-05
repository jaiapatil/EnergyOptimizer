const tabs = ["Overview", "Consumption", "Cost Analysis", "Equipment", "Downloads"];

export default function ReportsTabs({ active = "Overview", onChange = () => {} }) {
  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-2 rounded text-sm font-semibold transition-all duration-200 ${
            tab === active
              ? "bg-white text-black shadow"
              : "bg-[#1F2937] text-white hover:bg-[#374151]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
