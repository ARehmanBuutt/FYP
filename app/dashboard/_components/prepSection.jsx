'use client'

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function PrepShowSection() {
    const { ref, inView } = useInView({
        triggerOnce: false,  // animate every time it comes into view
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* 📸 Background Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.9 }}
                        className="relative w-full h-full overflow-hidden bg-blue-50"
                    >
                        <div className="absolute inset-0 bg-blue-50 opacity-30 z-10" />
                        <Image
                            src="/int.png"
                            alt="Job 1"
                            fill
                            className="object-cover z-0"
                        />
                    </motion.div>

                    {/* 💬 Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                    >
                        <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
                            Don’t Leave Your <span className="text-blue-500">Interviews</span> to Chance
                        </h2>
                        <p className="text-gray-600 mb-6 text-lg">
                            Explore how we can assist for interviews.
                        </p>
                        <Link
                            href="/interviewprep"
                            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Explore
                        </Link>
                    </motion.div>

                </div>
            </motion.div>
        </section>
    );
}