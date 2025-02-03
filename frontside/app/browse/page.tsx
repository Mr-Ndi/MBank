"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Download, Eye } from "lucide-react";

const mockData = Array(10).fill({
  moduleName: "Module Example",
  dateIssued: "Jan 20, 2024",
  category: "Exam",
});

export default function BrowsePage() {
  const [category, setCategory] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [page, setPage] = useState(1);
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setDownloadComplete(false);

    setTimeout(() => {
      setDownloading(false);
      setDownloadComplete(true);
      setTimeout(() => setDownloadComplete(false), 3000);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-100 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Describe the copies that you need to access
      </h2>

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

        {/* Search Button */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Search
        </button>
      </div>

      {/* Download Progress Bar & Alert */}
      {downloading && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md">
          Downloading...
          <div className="w-48 h-2 bg-gray-600 rounded-full mt-2">
            <div className="h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
      {downloadComplete && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">
          Download Complete!
        </div>
      )}

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
            
            {/* Action Buttons */}
            <div className="flex justify-between">
              <button className="flex items-center gap-2 border px-3 py-2 rounded-lg hover:bg-gray-200 transition">
                <Eye size={16} /> View
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 border px-3 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                <Download size={16} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center mt-6 space-x-2">
        <button
          className="border p-2 rounded-lg disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-lg font-semibold">{page}</span>
        <button
          className="border p-2 rounded-lg hover:bg-gray-200 transition"
          onClick={() => setPage(page + 1)}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
