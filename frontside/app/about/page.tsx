"use client";
import Link from "next/link";
import { Users, Briefcase, Globe, User, Star } from "lucide-react";

const team: any = [];

export default function AboutUs() {
  const isSolo = team.length === 0;

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-blue-400 to-white p-10">
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-900 mt-10">
        {isSolo ? "About Me" : "About Us"}
      </h1>
      <p className="text-lg text-gray-700 max-w-2xl text-center">
        {isSolo
          ? "Hi, I'm Ninshuti, a passionate Computer Scientist. I created this platform to provide easy access to essential documents for students and professionals."
          : "We are committed to providing seamless access to essential documents, ensuring a smooth experience for students and professionals alike."}
      </p>

      {/* Mission Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-8 w-3/4">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <Briefcase size={24} /> Our Mission
        </h2>
        <p className="text-gray-700 mt-2">
          Our mission is to streamline document retrieval, making it faster and more efficient. We prioritize accessibility, simplicity, and security to help you manage your important files effortlessly.
        </p>
      </div>

      {/* Team Section */}
      <div className="w-3/4 mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          {isSolo ? <User size={24} /> : <Users size={24} />} {isSolo ? "Meet the Founder" : "Meet Our Team"}
        </h2>

        {isSolo ? (
          // Solo Founder Profile
          <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col items-center mt-4">
            <User size={80} className="text-blue-600 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900">Ninshuti Poli Ndiramiye</h3>
            <p className="text-gray-600 text-center mt-2">Founder</p>
            <p className="text-gray-700 text-center mt-4">
              With a year of experience as a software engineer specializing in backend development, my goal is to provide scalable tech solutions to real-world challenges. This web app is just the beginning. I invite you to explore my portfolio website by clicking the "Visit Me" button below or the dedicated button in the contact section.
            </p>
          </div>
        ) : (
          // Team Grid
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {team.map((member: any, index: any) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                <div className="h-24 w-24 bg-gray-400 rounded-full mx-auto"></div>
                <h3 className="text-lg font-semibold text-center mt-4">{member.name}</h3>
                <p className="text-gray-600 text-center">{member.role}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <Globe size={24} /> Get in Touch
        </h2>
        <p className="text-gray-700 text-center mt-2">
          Have questions or suggestions? {isSolo ? "I'd" : "We'd"} love to hear from you!
        </p>
        <Link href="/contact" className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block">
          Contact Us
        </Link>
        <Link href="https://mr-ndi.github.io/Port_web/" target="_blank" className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block ml-10">
          Visit Me
        </Link>
      </div>
    </div>
  );
}
