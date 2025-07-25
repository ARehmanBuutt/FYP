'use client'

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function JobShowSection() {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.2,
    });

    return (
        <section className="py-20 px-6 sm:px-12 bg-blue-50" ref={ref}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto space-y-16"
            >
                <div className="flex flex-col gap-16 items-center text-center">

                    {/* 💬 Heading and Button */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ duration: 0.9, delay: 0.1 }}
                    >
                        <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
                            We're here for every step of your <span className="text-blue-500">search</span>
                        </h2>
                        <p className="text-gray-600 mb-6 text-lg">
                            We'll help you craft a standout profile and help you land your dream job.
                        </p>
                        <Link
                            href="/jobsuggestion"
                            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Find Now
                        </Link>
                    </motion.div>

                    {/* 📸 Image below heading */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="relative w-full h-[400px] overflow-hidden rounded-xl shadow-lg"
                    >
                        <div className="absolute inset-0 bg-blue-50 opacity-30 z-10" />
                        <Image
                            src="/job.jpg"
                            alt="Job Visual"
                            fill
                            className="object-cover z-0"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}