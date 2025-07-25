'use client'

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogShowcaseSection() {
    return (
        <section className="py-20 px-6 sm:px-12 bg-blue-50">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* === Top Section: Title + Paragraph + Images === */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    {/* Left: Heading + Paragraph + Button */}
                    <div>
                        <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
                            Try our professional <span className="text-blue-500">Resume Builder</span> now
                        </h2>
                        <p className="text-gray-600 mb-6 text-lg">
                            Online tools such as CV builders and job search websites have become the new norm in modern-day career advancement.
                            Why should searching for a job and writing a resume be any different?
                        </p>
                        <Link
                            href="/resumebuilder"
                            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Create my Resume
                        </Link>
                    </div>

                    {/* Right: Flower-styled Images */}
                    <div className="relative w-[300px] h-[380px] mx-auto lg:ml-auto">
                        {/* Bottom Image */}
                        <div className="absolute z-10 top-20 left-0 w-48 h-64 rounded-xl shadow-lg overflow-hidden rotate-[-10deg]">
                            <Image
                                src="/img1.avif"
                                alt="Resume 1"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Middle Image */}
                        <div className="absolute z-20 top-10 left-12 w-52 h-72 rounded-xl shadow-xl overflow-hidden rotate-[5deg]">
                            <Image
                                src="/img2.avif"
                                alt="Resume 2"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Top Image */}
                        <div className="absolute z-30 top-0 left-24 w-56 h-80 rounded-xl shadow-2xl overflow-hidden rotate-[15deg]">
                            <Image
                                src="/img3.avif"
                                alt="Resume 3"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* === Bottom Section: Features === */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            className="p-5 text-center bg-secondary rounded-xl shadow-md hover:shadow-lg transition"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: false }}
                        >
                            <Image
                                src={feature.icon}
                                alt={feature.title}
                                width={50}
                                height={50}
                                className="mb-4 mx-auto"
                            />
                            <h4 className="font-semibold text-blue-900 mb-1 text-base">{feature.title}</h4>
                            <p className="text-sm text-gray-700">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

const features = [
    {
        title: "Customize within minutes",
        description: "Our resume builder tools aim to save as much of your time as possible.",
        icon: "/minutes-time-timmer-svgrepo-com.svg",
    },
    {
        title: "Beautiful creative designs",
        description: "Clean and modern resume templates designed for impact and clarity.",
        icon: "/painting-art-svgrepo-com.svg",
    },
    {
        title: "AI assistance",
        description: "AI generated summaries and descriptions included.",
        icon: "/story-maps-svgrepo-com.svg",
    },
];