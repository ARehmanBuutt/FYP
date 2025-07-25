'use client'

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function MointShowSection() {
    const { ref, inView } = useInView({
        triggerOnce: false, // <--- allows multiple animations on scroll
        threshold: 0.2,
    });

    return (
        <section className="mt-20 py-20 px-6 sm:px-12 bg-blue-50" ref={ref}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto space-y-16"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* 📸 Background Image */}
                    <div className="relative w-full h-full overflow-hidden bg-blue-50">
                        <div className="absolute inset-0 bg-blue-50 opacity-30 z-10" />
                        <Image
                            src="/dream.jpg"
                            alt="Job 1"
                            fill
                            className="object-cover z-0"
                        />
                    </div>

                    {/* 💬 Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                    >
                        <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
                            Start practicing today and land your <span className="text-blue-500">Dream job</span>
                        </h2>
                        <p className="text-gray-600 mb-6 text-lg">
                            Try our mock interview tool today. Start practicing and improving your skills immediately.
                        </p>
                        <Link
                            href="/mockinterview"
                            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Start Practicing
                        </Link>
                    </motion.div>

                </div>
            </motion.div>
        </section>
    );
}