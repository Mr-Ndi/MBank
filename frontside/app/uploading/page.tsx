"use client";
import { useState } from "react";
import Navbar from "../components/NavBar";

export default function UploadPage() {
  const [school, setSchool] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file");
      return;
    }
    console.log("Uploading:", { school, category, department, level, moduleName, file });
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-100">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Uploading past CAT, Quiz, or Exam
        </h2>
        <p className="text-center text-gray-700 max-w-lg mb-6">
          This page serves as a simple and intuitive platform for students to upload and access past exams, quizzes, or assignments for academic preparation.
        </p>
        <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
          <div className="grid grid-cols-2 gap-4">
            <select value={school} onChange={(e) => setSchool(e.target.value)} className="border p-2 rounded">
              <option>Select the school</option>
              <option>School of Engineering</option>
              <option>School of Business</option>
            </select>

            <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded">
              <option>Select the category</option>
              <option>Quiz</option>
              <option>CAT</option>
              <option>Exam</option>
            </select>

            <select value={department} onChange={(e) => setDepartment(e.target.value)} className="border p-2 rounded">
              <option>Select the department</option>
              <option>Computer Science</option>
              <option>Mechanical Engineering</option>
            </select>

            <input type="text" placeholder="Enter the academic level" value={level} onChange={(e) => setLevel(e.target.value)} className="border p-2 rounded" />

            <input type="text" placeholder="Enter the module name" value={moduleName} onChange={(e) => setModuleName(e.target.value)} className="border p-2 rounded col-span-2" />

            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="border p-2 rounded col-span-2" />
          </div>

          <div className="flex justify-between mt-6">
            <button type="button" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Back</button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
}
