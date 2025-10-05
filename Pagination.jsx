import React from "react";

export default function Pagination() {
  return (
    <div className="flex justify-between items-center pt-4">
      <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm">
        Previous
      </button>
      <div className="space-x-2">
        <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm">1</button>
        <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm">2</button>
        <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm">3</button>
      </div>
      <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm">
        Next
      </button>
    </div>
  );
}
