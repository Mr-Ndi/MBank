"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Home = () => {
  const slides = [
    {
      text: "Hey you Welcome to marks bank [MBank]. A game changer website designed to simplify your hustle for marks chasing game.",
      img: "/emoji1.png",
    },
    {
      text: "Simply here we provide variety past copies, those are not only cats and quizzes but also the exams so have fun around.",
      img: "/emoji2.png",
    },
    {
      text: "Hey you Welcome to marks bank [MBank]. A game changer website designed to simplify your hustle for marks chasing game.",
      img: "/emoji3.png",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-500 to-white flex flex-col">
      {/* Navigation Bar */}
      <nav className="w-full bg-gradient-to-r from-white to-blue-400 py-4 px-10 flex justify-between items-center shadow-md">
        <div className="text-lg font-bold">Home</div>
        <div className="flex space-x-8 font-semibold">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">About us</a>
          <a href="#" className="hover:underline">Contact us</a>
        </div>
        <div className="font-bold">Login</div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-10">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="max-w-5xl w-full flex items-center justify-between bg-white p-6 rounded-2xl shadow-lg"
        >
          {/* Text Section */}
          <div className="max-w-md">
            <p className="text-lg font-semibold text-gray-800">{slides[currentSlide].text}</p>
            <div className="mt-6 flex space-x-4">
              <Link href="/browse">
                <p className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md cursor-pointer">Get copies</p>
              </Link>
              <Link href="/uploading">
                <p className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md cursor-pointer">Upload a copy</p>
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-1/2 flex justify-end">
            <img
              src={slides[currentSlide].img}
              alt="Emoji"
              className="w-60 h-60 object-contain"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
