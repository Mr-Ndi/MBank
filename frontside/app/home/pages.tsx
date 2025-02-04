"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    text: "Have you ever given your best, studied day and night, only to find yourself struggling with marks? You're not alone!",
    img: "/emoji1.png",
    position: "left"
  },
  {
    text: "Maybe it's not about how hard you study but how you study! MBank or Igicupuri is here to simplify things for you.",
    img: "/emoji2.png",
    position: "center"
  },
  {
    text: "Success is simpler than you think! Browse through past copies, stay on track, and share with others too!",
    img: "/emoji3.png",
    position: "right"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-600 to-white flex flex-col items-center justify-center px-6 py-12">
      {/* Main Content */}
      <div className="relative flex flex-col items-center w-full max-w-5xl text-center">
        {/* Slide Image */}
        <motion.img
          key={currentSlide}
          src={slides[currentSlide].img}
          alt="Slide image"
          className="w-64 h-64 object-contain mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        />

        {/* Slide Text */}
        <motion.p
          key={currentSlide + "_text"}
          className="text-xl font-semibold text-gray-800 max-w-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {slides[currentSlide].text}
        </motion.p>

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex justify-between items-center w-full px-6">
          <button onClick={prevSlide} className="bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className="bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Call to Actions */}
      <div className="mt-8 flex space-x-4">
        <Link href="/browse">
          <p className="bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-lg text-lg font-semibold hover:bg-indigo-700 transition cursor-pointer">Get Copies</p>
        </Link>
        <Link href="/uploading">
          <p className="bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-lg text-lg font-semibold hover:bg-indigo-700 transition cursor-pointer">Upload a Copy</p>
        </Link>
      </div>

      {/* Slide Indicators */}
      <div className="flex space-x-2 mt-6">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-indigo-600" : "bg-gray-300"}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
