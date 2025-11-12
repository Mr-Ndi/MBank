"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    const check = () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        setIsAuthenticated(!!token);
      } catch (e) {
        setIsAuthenticated(false);
      }
    };

    check();

    const onStorage = (e: StorageEvent) => {
      if (e.key === "token") check();
    };

    const onAuthChanged = (e: Event) => {
      // custom event when auth changed in same tab
      check();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("auth-changed", onAuthChanged as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth-changed", onAuthChanged as EventListener);
    };
  }, []);

  const handleLoginClick = () => {
    setIsOpen(false);
    router.push("/login");
  };

  const handleLogoutClick = () => {
    setIsOpen(false);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (e) {
      // ignore
    }
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-200 to-blue-500 shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo & Get App Button */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold text-gray-900">
            <img src="/icon2.png" alt="Company Logo" className="h-10 w-auto" />
          </Link>
          <button className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
            Get App
          </button>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 font-semibold text-gray-900">
          <li><Link href="/" className="hover:text-blue-700">Home</Link></li>
          <li><Link href="/about" className="hover:text-blue-700">About Us</Link></li>
          <li><Link href="/contact" className="hover:text-blue-700">Contact Us</Link></li>
        </ul>

        {/* Login / Logout Button */}
        {isAuthenticated ? (
          <button
            onClick={handleLogoutClick}
            className="hidden md:block bg-white text-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-red-600 hover:text-white"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLoginClick}
            className="hidden md:block bg-white text-blue-700 px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:text-white"
          >
            Login
          </button>
        )}

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
              className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              Get App
            </button>
          </li>
          <li>
            {isAuthenticated ? (
              <button
                onClick={handleLogoutClick}
                className="block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLoginClick}
                className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Login
              </button>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
