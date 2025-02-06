"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { signup } from "../utils/api"; // Import API helper

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const data = await signup(email, password);
      localStorage.setItem("token", data.token); // Save token
      router.push("/dashboard"); // Redirect
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[450px]">
        <div className="flex justify-between mb-6">
          <h2
            className="text-2xl text-gray-400 cursor-pointer hover:text-gray-600 transition"
            onClick={() => router.push("/login")}
          >
            Log in
          </h2>
          <h2 className="text-2xl font-semibold text-gray-600 border-b-2 border-gray-400 pb-1">
            Sign up
          </h2>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
