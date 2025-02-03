"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[450px]">
        {/* Login & Signup Header */}
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-600 border-b-2 border-gray-400 pb-1">
            Login
          </h2>
          <h2 className="text-2xl text-gray-400">Sign up</h2>
        </div>

        {/* Google Login Button */}
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-100 transition">
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          Continue Google
        </button>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Login Form */}
        <form className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
