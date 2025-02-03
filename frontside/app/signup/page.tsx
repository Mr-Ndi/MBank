"use client";
import { useState } from "react";
import Navbar from "../components/NavBar";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signing up with:", { email, password });
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-400 to-blue-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-center text-2xl font-semibold mb-4">Sign Up</h2>
          <button className="w-full flex items-center justify-center border p-2 rounded-md shadow-sm mb-4">
            <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>
          <div className="text-center my-2 text-gray-500">OR</div>
          <form onSubmit={handleSignup}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded-md mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded-md mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 border rounded-md mb-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
