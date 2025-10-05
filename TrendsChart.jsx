import { SlidersHorizontal, RefreshCw } from "lucide-react";

export default function TrendsChart() {
  return (
    <section className="bg-[#111827] p-6 rounded mb-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">6-Month Consumption & Savings Trend</h3>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-3 py-1 border border-gray-600 rounded text-white hover:bg-white/10 text-sm">
            <SlidersHorizontal size={14} /> Filter
          </button>
          <button className="flex items-center gap-1 px-3 py-1 border border-gray-600 rounded text-white hover:bg-white/10 text-sm">
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>
      <div className="h-64 bg-gray-900 rounded flex items-center justify-center text-gray-500 text-sm">
        Chart Placeholder
      </div>
    </section>
  );
}
