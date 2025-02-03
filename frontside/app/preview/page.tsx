"use client";
import { useState } from "react";
import Navbar from "../components/NavBar";
import { ChevronLeft, ChevronRight, Download, Eye, Flag } from "lucide-react";

const mockData = Array(10).fill({
  moduleName: "Module Example",
  dateIssued: "Jan 20, 2024",
  category: "Exam",
});

export default function BrowsePage() {
  const [category, setCategory] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [page, setPage] = useState(1);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-100 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Describe the copies that you need to access</h2>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option>Select the category</option>
            <option>Quiz</option>
            <option>CAT</option>
            <option>Exam</option>
          </select>

          <input
            type="text"
            placeholder="Enter the module name"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            className="border p-2 rounded"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-3 gap-6">
          {mockData.map((item, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-lg shadow-lg w-64">
              <div className="h-24 bg-gray-400 rounded mb-4"></div>
              <div className="flex justify-between mb-2">
                <span className="text-blue-600 font-semibold">{item.moduleName}</span>
                <span className="text-gray-600">{item.dateIssued}</span>
              </div>
              <span className="block text-gray-800 mb-3">{item.category}</span>

              {/* Buttons: View, Download, Report */}
              <div className="flex justify-between">
                <button className="flex items-center gap-2 border px-3 py-2 rounded-lg hover:bg-gray-300 transition">
                  <Eye size={16} /> View
                </button>

                <button className="flex items-center gap-2 border px-3 py-2 rounded-lg hover:bg-gray-300 transition">
                  <Download size={16} /> Download
                </button>

                <button className="flex items-center gap-2 border px-3 py-2 rounded-lg hover:bg-red-500 hover:text-white transition">
                  <Flag size={16} /> Report
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center mt-6 space-x-2">
          <button className="border px-4 py-2 rounded-lg" disabled={page === 1} onClick={() => setPage(page - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="text-lg font-semibold">{page}</span>
          <button className="border px-4 py-2 rounded-lg" onClick={() => setPage(page + 1)}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
