"use client";
import Navbar from "../components/NavBar";
import LoginPage from "../components/LoginPage";

export default function Login() {
  return (
    <div>
      <Navbar />
      <div className="mt-16 flex justify-center items-center h-screen">
        <LoginPage />
      </div>
    </div>
  );
}
