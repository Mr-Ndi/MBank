"use client";
import { useState } from "react";
import Navbar from "../components/NavBar";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [school, setSchool] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const router = useRouter();

  const departmentsBySchool: { [key: string]: string[] } = {
    SoICT: ["Computer Science", "Information Systems", "Information Technology", "Computer and Software Engineering"],
    "School of Science": ["Biology", "Chemistry", "Mathematics", "Physics"],
    "School of Mining and Geology": ["Geology", "Mining Engineering"],
    "School of Engineering": [
      "Building and Construction Technology",
      "Civil, Environmental and Geomatic Engineering",
      "Electrical Engineering",
      "Electronics and Telecommunication Engineering",
      "Surveying and Geomatic Engineering",
      "Water and Environmental Engineering",
    ],
    SABE: ["Architecture", "Geography and Urban Planning", "Estate Management and Valuation", "Construction Management"],
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file");
      return;
    }
    console.log("Uploading:", { school, category, department, level, moduleName, file });
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000); // Hide message after 3 sec
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-100">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Upload Past CATs, Quizzes, or Exams
        </h2>
        <p className="text-center text-gray-700 max-w-lg mb-4">
          Contribute to a growing academic resource by sharing past assessments.
          Help fellow students prepare better with your uploads!
        </p>
        
        {uploadSuccess && (
          <p className="text-green-600 bg-green-100 border border-green-400 px-4 py-2 rounded-md mb-4">
            ✅ File uploaded successfully!
          </p>
        )}

        <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
          <div className="grid grid-cols-2 gap-4">
            {/* School Selection */}
            <select
              value={school}
              onChange={(e) => {
                setSchool(e.target.value);
                setDepartment(""); // Reset department when school changes
              }}
              className="border p-2 rounded"
            >
              <option value="">Select the school</option>
              {Object.keys(departmentsBySchool).map((schoolName) => (
                <option key={schoolName} value={schoolName}>
                  {schoolName}
                </option>
              ))}
            </select>

            {/* Category Selection */}
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded">
              <option value="">Select the category</option>
              <option>Quiz</option>
              <option>CAT</option>
              <option>Exam</option>
            </select>

            {/* Department Selection - Updates Based on Selected School */}
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="border p-2 rounded"
              disabled={!school} // Disable if no school selected
            >
              <option value="">Select the department</option>
              {school &&
                departmentsBySchool[school].map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
            </select>

            <input
              type="text"
              placeholder="Enter the academic level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              type="text"
              placeholder="Enter the module name"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              className="border p-2 rounded col-span-2"
            />

            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="border p-2 rounded col-span-2"
            />
            <p className="text-xs text-gray-500 col-span-2">
              📌 Accepted formats: PDF, DOCX, TXT, PNG, JPEG | Max size: 5MB
            </p>
          </div>

          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => router.back()} className="bg-gray-500 text-white px-6 py-2 rounded-lg">
              Back
            </button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
