"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Home = () => {
  const slides = [
    {
      text: "Have you ever given your best, studied day and night, only to find yourself struggling with marks? Do you feel like no matter how much effort you put in, you're still stuck at the lower level? You're not alone!",
      img: "/emoji1.png",
      position: "left"
    },
    {
      text: "Maybe it's not about how hard you study but how you study! The methods you use might be the reason behind it. But don’t panic! MBank or Igicupuri is here to simplify things for you. Just take it easy we got you covered!",
      img: "/emoji2.png",
      position: "center"
    },
    {
      text: "Success is simpler than you think! With MBank, all you have to do is browse through past copies, ensuring you stay on track while revising. Just click ‘Get Copies’ to access materials. And remember, sharing is caring! Click 'Upload' to help others too!",
      img: "/emoji3.png",
      position: "right"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-500 to-white flex flex-col justify-center items-center px-10">
      {/* Main Content */}
      <div className="relative flex flex-col items-center w-full max-w-5xl">
        {/* Center Image - Move Above Message */}
        {slides[currentSlide].position === "center" && (
          <img
            src={slides[currentSlide].img}
            alt="Emoji"
            className="w-80 h-80 object-contain absolute top-[-150px] left-1/2 -translate-x-1/2 z-10"
          />
        )}

        {/* Message Box - Add margin to push it down */}
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="text-lg font-semibold text-gray-800 text-center max-w-md mt-40"
        >
          {slides[currentSlide].text}
        </motion.div>

        {/* Left Image */}
        {slides[currentSlide].position === "left" && (
          <img
            src={slides[currentSlide].img}
            alt="Emoji"
            className="w-80 h-80 object-contain absolute left-10 -ml-24"
          />
        )}

        {/* Right Image */}
        {slides[currentSlide].position === "right" && (
          <img
            src={slides[currentSlide].img}
            alt="Emoji"
            className="w-80 h-80 object-contain absolute right-10 -mr-24"
          />
        )}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex space-x-4">
        <Link href="/browse">
          <p className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md cursor-pointer">Get copies</p>
        </Link>
        <Link href="/uploading">
          <p className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md cursor-pointer">Upload a copy</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
