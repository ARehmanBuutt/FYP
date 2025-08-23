'use client'

import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const res = await fetch("/apii/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess("✅ Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setSuccess("❌ Failed to send message.");
      }
    } catch {
      setSuccess("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="min-h-screen py-16 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto">
          {/* 🔹 Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              <span className="text-blue-500">Get in Touch</span>
            </h1>
            <p className="text-gray-600 text-lg">
              We'd love to hear from you. Send us a message and we’ll respond shortly.
            </p>
          </div>

          {/* 🔹 Form */}
          <div className="bg-secondary rounded-xl shadow p-8 w-full mx-auto">
            <form className="w-full space-y-6 max-w-2xl mx-auto" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <Input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Full Name" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <Input name="email" value={form.email} onChange={handleChange} type="email" placeholder="your@email.com" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea name="message" value={form.message} onChange={handleChange} placeholder="Type your message..." rows={5} required />
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-blue-600 text-white hover:bg-blue-700 transition">
                {loading ? "Sending..." : "Send Message"}
              </Button>

              {success && <p className="text-center mt-4">{success}</p>}
            </form>
          </div>

          {/* 🔹 Contact Info */}
          <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center">
            <div className="flex flex-col items-center">
              <Mail className="text-blue-600 mb-2" />
              <h4 className="font-semibold text-gray-800">Email</h4>
              <p className="text-gray-600">contact@nextstepresume.com</p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="text-blue-600 mb-2" />
              <h4 className="font-semibold text-gray-800">Phone</h4>
              <p className="text-gray-600">+92 300 0000000</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="text-blue-600 mb-2" />
              <h4 className="font-semibold text-gray-800">Location</h4>
              <p className="text-gray-600">Lahore, Pakistan</p>
            </div>
          </div>
        </div>
      </section>
       {/* <footer className="bg-gray-900 text-gray-300 mt-10 px-6 py-12 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          
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

          
          <div>
            <h3 className="text-white font-semibold mb-4">Job Seekers</h3>
            <ul className="space-y-1">
              <li><a href="/resumebuilder">Create a resume</a></li>
              <li><a href="/resumebuilder">Resume examples</a></li>
              <li><a href="/interviewprep">Interview Prep</a></li>
              <li><a href="/jobsuggestion">Job Search</a></li>
              <li><a href="/resumebuilder">Previous Resumes</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Career Resources</h3>
            <ul className="space-y-1">
              <li><a href="/mockinterview">AI Assistance</a></li>
              <li><a href="/resumebuilder">Resume Help</a></li>
              <li><a href="/mockinterview">Mock Interview</a></li>
              <li><a href="/interviewprep">Interview Prep</a></li>
              <li><a href="/resumebuilder">Resume templates</a></li>
              <li><a href="jobsuggestion">Career Guidance</a></li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-white font-semibold mb-4">Our Company</h3>
            <ul className="space-y-1">
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/dashboard">Updates</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-10 border-t border-gray-700 pt-6 text-xs text-gray-400">
          <p>Copyright © 2025 - NextStep Resume. All rights reserved.</p>
          <p>More than a resume builder. NextStep Resume is part of the CareerAI product.</p>
        </div>
      </footer>  */}

      <footer className="bg-gray-900 text-gray-300 mt-10 px-6 py-12 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Social */}
          <div className="text-center md:text-left md:col-span-1">
            <div className="flex justify-center md:justify-start gap-3 text-white text-xl">
              <a href="#"><i className="fab fa-linkedin"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="#"><i className="fab fa-pinterest"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-tiktok"></i></a>
              <a href="#"><i className="fab fa-spotify"></i></a>
            </div>
          </div>

          {/* Job Seekers + Career Resources side by side in mobile */}
          <div className="grid grid-cols-2 gap-6 md:col-span-2">
            {/* Job Seekers */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-center md:text-left">Job Seekers</h3>
              <ul className="space-y-1 text-center md:text-left">
                <li><a href="/resumebuilder">Create a resume</a></li>
                <li><a href="/resumebuilder">Resume examples</a></li>
                <li><a href="/interviewprep">Interview Prep</a></li>
                <li><a href="/jobsuggestion">Job Search</a></li>
                <li><a href="/resumebuilder">Previous Resumes</a></li>
              </ul>
            </div>

            {/* Career Resources */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-center md:text-left">Career Resources</h3>
              <ul className="space-y-1 text-center md:text-left">
                <li><a href="/mockinterview">AI Assistance</a></li>
                <li><a href="/resumebuilder">Resume Help</a></li>
                <li><a href="/mockinterview">Mock Interview</a></li>
                <li><a href="/interviewprep">Interview Prep</a></li>
                <li><a href="/resumebuilder">Resume templates</a></li>
                <li><a href="/jobsuggestion">Career Guidance</a></li>
              </ul>
            </div>
          </div>

          {/* Our Company */}
          <div className="text-center md:text-left md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Our Company</h3>
            <ul className="space-y-1">
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/dashboard">Updates</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="text-center mt-10 border-t border-gray-700 pt-6 text-xs text-gray-400">
          <p>Copyright © 2025 - NextStep Resume. All rights reserved.</p>
          <p>More than a resume builder. NextStep Resume is part of the CareerAI product.</p>
        </div>
      </footer>
    </main>
  );
}