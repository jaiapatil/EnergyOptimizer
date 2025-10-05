import { FileDown, FileText } from "lucide-react";

export default function DownloadReports() {
  return (
    <section className="bg-[#111827] p-6 rounded">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Download Reports</h3>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded text-sm font-semibold">
            <FileDown size={16} /> PDF
          </button>
          <button className="flex items-center gap-2 border border-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-white/10">
            <FileText size={16} /> CSV
          </button>
        </div>
      </div>
      <ul className="text-sm text-gray-300 space-y-1">
        <li>• June 2025 – Energy Summary</li>
        <li>• May 2025 – Usage by Equipment</li>
        <li>• April 2025 – Monthly Savings</li>
      </ul>
    </section>
  );
}
