"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Initialize router

  const handleLoginClick = () => {
    setIsOpen(false); // Close the mobile menu (if open)
    router.push("/login"); // Navigate to the login page
  };

  return (
    <nav className="bg-gradient-to-r from-blue-200 to-blue-500 shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          MBank
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 font-semibold text-gray-900">
          <li><Link href="/" className="hover:text-blue-700">Home</Link></li>
          <li><Link href="/about" className="hover:text-blue-700">About Us</Link></li>
          <li><Link href="/contact" className="hover:text-blue-700">Contact Us</Link></li>
        </ul>

        {/* Login Button */}
        <button
          onClick={handleLoginClick}
          className="hidden md:block bg-white text-blue-700 px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:text-white"
        >
          Login
        </button>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center bg-white shadow-md py-4">
          <li><Link href="/" className="block py-2" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link href="/about" className="block py-2" onClick={() => setIsOpen(false)}>About Us</Link></li>
          <li><Link href="/contact" className="block py-2" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
          <li>
            <button
              onClick={handleLoginClick}
              className="block py-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
