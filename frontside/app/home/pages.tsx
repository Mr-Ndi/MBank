'use client'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Home = () => {
  const slides = [
    {
      text: "Hey you Welcome to marks bank [MBank]. A game changer website designed to simplify your hustle for marks chasing game.",
      img: "/emoji1.png"
    },
    {
      text: "Simply here we provide variety past copies, those are not only cats and quizzes but also the exams so have fun around.",
      img: "/emoji2.png"
    },
    {
      text: "Hey you Welcome to marks bank [MBank]. A game changer website designed to simplify your hustle for marks chasing game.",
      img: "/emoji3.png"
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
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-blue-500 to-white">
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg text-center"
      >
        <img
          src={slides[currentSlide].img}
          alt="Emoji"
          className="w-40 h-40 mx-auto"
        />
        <p className="mt-4 text-lg font-semibold text-gray-800">{slides[currentSlide].text}</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/browse">
            <p className="bg-blue-600 text-white py-2 px-6 rounded-lg">Get copies</p>
          </Link>
          <Link href="/uploading">
            <p className="bg-blue-600 text-white py-2 px-6 rounded-lg">Upload a copy</p>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
