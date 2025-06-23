'use client'

import { Briefcase, FileText, Mic, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen w-full bg-gradient-to-br from-white to-blue-50 px-4 sm:px-8 py-12"
        >
            {/* Header */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
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
                        className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all flex flex-col justify-between"
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

            {/* CTA */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mt-20 text-center"
            >
                <p className="text-gray-700 text-lg mb-4">Let's get started</p>
            </motion.div>
        </motion.div>
    );
}

const features = [
    {
        title: "Mock Interviews",
        description:
            "Practice real-world interview questions with AI. Get instant feedback on answers, tone, and clarity.",
        icon: Mic,
        bgColor: "bg-green-100",
        textColor: "text-green-600",
        link: "/mockinterview",
    },
    {
        title: "Resume Builder",
        description:
            "Build a professional resume in minutes. AI suggestions for phrasing, formatting, and keywords.",
        icon: FileText,
        bgColor: "bg-blue-100",
        textColor: "text-blue-600",
        link: "/resumebuilder",
    },
    {
        title: "Interview Prep",
        description:
            "AI-curated questions and answer hints tailored to the role you're applying for.",
        icon: Sparkles,
        bgColor: "bg-purple-100",
        textColor: "text-purple-600",
        link: "/interviewprep",
    },
    {
        title: "Job Suggestions",
        description:
            "Smart job recommendations based on your resume, skills, and interests — all in one place.",
        icon: Briefcase,
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-600",
        link: "/jobsuggestion",
    },
];