"use client";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, Github, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-blue-400 to-white p-10">
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-900 mt-10">Contact Us</h1>
      <p className="text-lg text-gray-700 max-w-2xl text-center">
        Have a question or feedback? Reach out to us, and we’ll get back to you as soon as possible.
      </p>

      {/* Contact Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-8 w-3/4 flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Send Us a Message</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border p-3 rounded-lg mb-4"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full border p-3 rounded-lg mb-4"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full border p-3 rounded-lg mb-4 h-32"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <Send size={20} /> Send Message
          </button>
        </form>
      </div>

      {/* Contact Information */}
      <div className="mt-12 w-3/4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="flex flex-col items-center">
          <Phone size={24} className="text-blue-600" />
          <h3 className="text-lg font-semibold mt-2">Call Us</h3>
          <p className="text-gray-700">+250 791 287 640</p>
        </div>
        <div className="flex flex-col items-center">
          <Mail size={24} className="text-blue-600" />
          <h3 className="text-lg font-semibold mt-2">Email Us</h3>
          <p className="text-gray-700">ndiramiyeninshuti1@gmail.com | onlythenotes@gmail.com</p>
        </div>
        <div className="flex flex-col items-center">
          <MapPin size={24} className="text-blue-600" />
          <h3 className="text-lg font-semibold mt-2">Visit Us</h3>
          <p className="text-gray-700">KN 123st, Kigali, Rwanda</p>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-12 flex gap-6">
        <Link href="https://github.com/Mr-Ndi" className="p-3 bg-white border rounded-full shadow hover:bg-gray-200 transition">
          <Github size={24} />
        </Link>
        <a href="#" className="p-3 bg-white border rounded-full shadow hover:bg-gray-200 transition">
          <Twitter size={24} />
        </a>
        <a href="#" className="p-3 bg-white border rounded-full shadow hover:bg-gray-200 transition">
          <Linkedin size={24} />
        </a>
      </div>
    </div>
  );
}
