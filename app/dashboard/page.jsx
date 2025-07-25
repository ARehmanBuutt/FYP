'use client'

import { Briefcase, FileText, Mic, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import BlogShowcaseSection from "./_components/blogSection";
import MointShowSection from "./_components/mointSection";
import PrepShowSection from "./_components/prepSection";
import JobShowSection from "./_components/jobSection";

export default function DashboardPage() {
    return (
        <div className="min-h-screen w-full bg-blue-50">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="px-4 sm:px-8 py-12"
            >
                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="w-full text-center mb-16"
                >
                    <h1 className="mt-10 text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Your AI Career Assistant 🎯
                    </h1>
                    <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                        Everything you need to prepare, apply, and succeed in your dream job — powered by AI.
                    </p>
                </motion.div>

                {/* Feature Cards Grid */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-2 sm:px-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                            className="bg-secondary rounded-2xl shadow-md p-6 hover:shadow-xl transition-all flex flex-col justify-between"
                        >
                            <div>
                                <div className={`flex items-center justify-center mb-4 ${feature.bgColor} rounded-full w-14 h-14`}>
                                    {<feature.icon className={`w-6 h-6 ${feature.textColor}`} />}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                            </div>

                            <Link
                                href={feature.link}
                                className="inline-block mt-auto px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition text-center"
                            >
                                Go to {feature.title}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <MointShowSection/>

                <BlogShowcaseSection/>

                <PrepShowSection/>

                <JobShowSection/>

                {/* CTA */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="mt-5 text-center"
                >
                    <p className="text-gray-700 text-lg mb-4">Let's get started</p>
                </motion.div>
            </motion.div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 mt-10 px-6 py-12 text-sm">
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
                             <li><a href="/resumebuilder">Create a resume</a></li>
                             <li><a href="/resumebuilder">Resume examples</a></li>
                             <li><a href="/interviewprep">Interview Prep</a></li>
                             <li><a href="/jobsuggestion">Job Search</a></li>
                             <li><a href="/resumebuilder">Previous Resumes</a></li>
                         </ul>
                     </div>
                     {/* Career Resources */}
                     <div>
                         <h3 className="text-white font-semibold mb-4">Career Resources</h3>
                         <ul className="space-y-1">
                             <li><a href="/mockinterview">AI Assistance</a></li>
                             <li><a href="/resumebuilder">Resume Help</a></li>
                             <li><a href="/mockunterview">Mock Interview</a></li>
                             <li><a href="/interviewprep">Interview Prep</a></li>
                             <li><a href="/resumebuilder">Resume templates</a></li>
                             <li><a href="jobsuggestion">Career Guidance</a></li>
                         </ul>
                     </div>

                     {/* Company */}
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
             </footer>
        </div>
    );
}

const features = [
    {
        title: "Mock Interviews",
        description: "Practice real-world interview questions with AI. Get instant feedback.",
        icon: Mic,
        bgColor: "bg-green-100",
        textColor: "text-green-600",
        link: "/mockinterview",
    },
    {
        title: "Resume Builder",
        description: "Build a professional resume with AI suggestions for phrasing and format.",
        icon: FileText,
        bgColor: "bg-blue-100",
        textColor: "text-blue-600",
        link: "/resumebuilder",
    },
    {
        title: "Interview Prep",
        description: "AI-curated questions tailored to your desired role.",
        icon: Sparkles,
        bgColor: "bg-purple-100",
        textColor: "text-purple-600",
        link: "/interviewprep",
    },
    {
        title: "Job Suggestions",
        description: "Smart job recommendations based on your resume and skills.",
        icon: Briefcase,
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-600",
        link: "/jobsuggestion",
    },
];