"use client";
import { useState } from "react";
import { Share2, Download, Flag } from "lucide-react";

export default function Preview({ document }: { document: string }) {
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
    <div className="flex flex-col items-center w-full h-screen bg-gradient-to-b from-blue-400 to-white p-6">
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

      {/* Document Viewer */}
      <div className="relative flex justify-center items-center w-3/4 h-3/4 bg-gray-300 rounded-lg shadow-lg mt-6 p-4">
        {/* Placeholder for document */}
        <iframe src={document} className="w-full h-full rounded-lg bg-white"></iframe>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-4">
          <button className="p-2 bg-white border rounded-full shadow hover:bg-gray-200 transition">
            <Share2 size={20} />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 bg-white border rounded-full shadow hover:bg-gray-200 transition"
          >
            <Download size={20} />
          </button>
          <button className="p-2 bg-white border rounded-full shadow hover:bg-red-500 hover:text-white transition">
            <Flag size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
