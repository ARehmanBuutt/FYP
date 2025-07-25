'use client'

import React from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main>

      <section className="min-h-screen py-16 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto">
          {/* 🔹 Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3"><span className="text-blue-500">Get in Touch</span></h1>
            <p className="text-gray-600 text-lg">
              We'd love to hear from you. Send us a message and we’ll respond shortly.
            </p>
          </div>

          {/* 🔹 Centered Form */}
          <div className="bg-secondary rounded-xl shadow p-8 w-full mx-auto">
            <form className="w-full space-y-6 max-w-2xl mx-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <Input type="text" placeholder="Full Name" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <Input type="email" placeholder="your@email.com" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea placeholder="Type your message..." rows={5} required />
              </div>

              <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 transition">
                Send Message
              </Button>
            </form>
          </div>

          {/* 🔹 Contact Info Row */}
          <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center">
            {/* Email */}
            <div className="flex flex-col items-center">
              <Mail className="text-blue-600 mb-2" />
              <h4 className="font-semibold text-gray-800">Email</h4>
              <p className="text-gray-600">contact@nextstepresume.com</p>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center">
              <Phone className="text-blue-600 mb-2" />
              <h4 className="font-semibold text-gray-800">Phone</h4>
              <p className="text-gray-600">+92 300 0000000</p>
            </div>

            {/* Location */}
            <div className="flex flex-col items-center">
              <MapPin className="text-blue-600 mb-2" />
              <h4 className="font-semibold text-gray-800">Location</h4>
              <p className="text-gray-600">Lahore, Pakistan</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 px-6 py-12 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Social */}
          <div>
            <div className="flex flex-wrap gap-3 text-white text-xl">
              <a href="#"><i className="fab fa-linkedin"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="#"><i className="fab fa-pinterest"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-tiktok"></i></a>
              <a href="#"><i className="fab fa-spotify"></i></a>
            </div>
          </div>

          {/* Job Seekers */}
          <div>
            <h3 className="text-white font-semibold mb-4">Job Seekers</h3>
            <ul className="space-y-1">
              <li><a href="#">Create a resume</a></li>
              <li><a href="#">Resume examples</a></li>
              <li><a href="#">Resume templates</a></li>
              <li><a href="#">Cover Letter Templates</a></li>
              <li><a href="#">Job Search</a></li>
            </ul>
          </div>
          {/* Career Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Career Resources</h3>
            <ul className="space-y-1">
              <li><a href="#">AI Assistance</a></li>
              <li><a href="#">Resume Help</a></li>
              <li><a href="#">Mock Interview</a></li>
              <li><a href="#">Interview Prep</a></li>
              <li><a href="#">Career Guidance</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Company</h3>
            <ul className="space-y-1">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Updates</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-10 border-t border-gray-700 pt-6 text-xs text-gray-400">
          <p>Copyright © 2025 - NextStep Resume. All rights reserved.</p>
          <p>More than a resume builder. NextStep Resume is part of the CareerAI product.</p>
        </div>
      </footer>

    </main>

  );
}