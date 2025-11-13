"use client";
import { useState } from "react";
import Navbar from "../components/NavBar";
import { useRouter } from "next/navigation";
import { uploadCopy } from "../utils/api";

export default function UploadPage() {
  const [school, setSchool] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
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

    // client-side checks
    const maxBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxBytes) {
      alert("File is too large. Max size is 5MB.");
      return;
    }

    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "image/png",
      "image/jpeg",
    ];
    if (file.type && !allowed.includes(file.type)) {
      const name = file.name.toLowerCase();
      if (!name.endsWith(".pdf") && !name.endsWith(".docx") && !name.endsWith(".txt") && !name.endsWith(".png") && !name.endsWith(".jpg") && !name.endsWith(".jpeg")) {
        alert("Unsupported file type. Allowed: PDF, DOCX, TXT, PNG, JPEG");
        return;
      }
    }

    if (!school || !category || !department || !level || !moduleName || !moduleCode || !date) {
      alert("Please fill in all required fields (school, category, department, level, module code, module name, date).");
      return;
    }

    setUploading(true);
    setProgress(0);

    uploadCopy(
      file,
      { school, moduleCode, department, level, moduleName, date, category },
      (p) => setProgress(p)
    )
      .then((res) => {
        console.log("upload response", res);
        setUploadSuccess(true);
        setFile(null);
        // brief delay so user sees success state, then navigate to /browse
        setTimeout(() => {
          setUploadSuccess(false);
          router.push("/browse");
        }, 800);
      })
      .catch((err) => {
        console.error(err);
        alert(err.message || "Upload failed");
      })
      .finally(() => setUploading(false));
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
            File uploaded successfully!
          </p>
        )}

        <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
          <div className="grid grid-cols-2 gap-4">
            {/* School Selection */}
            <select
              value={school}
              onChange={(e) => {
                setSchool(e.target.value);
                setDepartment("");
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
              <option value="EXAM">EXAM</option>
              <option value="ASSIGNMENT">ASSIGNMENT</option>
              <option value="QUIZ">QUIZ</option>
              <option value="OTHER">OTHER</option>
              <option value="CAT">CAT</option>
            </select>

            {/* Department Selection - Updates Based on Selected School */}
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="border p-2 rounded"
              disabled={!school}
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
              type="number"
              min={1}
              placeholder="Enter the academic level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              type="text"
              placeholder="Enter the module code (e.g. CS101)"
              value={moduleCode}
              onChange={(e) => setModuleCode(e.target.value)}
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
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              type="file"
              accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="border p-2 rounded col-span-2"
            />
            <p className="text-xs text-gray-500 col-span-2">
              📌 Accepted formats: PDF, DOCX, TXT, PNG, JPEG | Max size: 5MB
            </p>
          </div>

          <div className="flex justify-between mt-6 items-center">
            <button type="button" onClick={() => router.back()} className="bg-gray-500 text-white px-6 py-2 rounded-lg">
              Back
            </button>
            <div className="w-1/2 flex items-center justify-end">
              {uploading ? (
                <div className="w-full">
                  <div className="w-full bg-gray-200 rounded h-3 overflow-hidden">
                    <div className="bg-green-500 h-3" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-sm text-gray-600 mt-1 text-right">Uploading... {progress}%</p>
                </div>
              ) : (
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                  Upload
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
