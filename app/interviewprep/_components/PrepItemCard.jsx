"use client"
import { Button } from '../../../components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { db } from '../../../utils/db'
import { prepInterview } from '../../../utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const PrepItemCard = ({ prep, onDelete, index = 0 }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onView = () => {
        router.push('/interviewprep/prep/' + prep?.prepId);
    };

    const handleDelete = async () => {
        if (!prep?.prepId) return;

        const confirmDelete = window.confirm("Are you sure you want to delete this prep?");
        if (!confirmDelete) return;

        setLoading(true);

        try {
            const prepId = prep.prepId.toString();

            await db.delete(prepInterview).where(eq(prepInterview.prepId, prepId));

            toast.success("✅ Prep deleted successfully");

            if (onDelete) {
                onDelete(prep.prepId);
            }
        } catch (error) {
            console.error("❌ Error deleting prep:", error);
            toast.error("Error deleting prep");
        } finally {
            setLoading(false);
        }
    };

    // Parse Q&A JSON
    let questions = [];
    try {
        questions = JSON.parse(prep.jsonPrepResp);
    } catch (err) {
        console.warn("Failed to parse JSON prep response:", err);
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: index * 0.4 }}
            whileHover={{ scale: 1.03 }}
            className="p-4 border bg-secondary rounded-lg w-full hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed flex flex-col justify-between h-full"
        >
            <div>
                <h2 className="font-bold text-center text-primary">{prep?.jobTitle}</h2>
                <h2 className="text-xs text-center text-gray-400">Created At : {prep.createdAt}</h2>

                <div className="mt-2 space-y-2">
                    {questions.slice(0, 2).map((qa, i) => (
                        <div key={i}>
                            <p className="text-sm text-black font-medium">{i + 1}. {qa.question}</p>
                            <p className="text-xs text-gray-600 mt-1">Ans: {qa.answer}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-between gap-3 mt-auto pt-4">
                <Button size="sm" className="w-full" onClick={onView}>
                    View Prep
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    className="w-full bg-red-500 text-white hover:bg-red-400 hover:text-white"
                    onClick={handleDelete}
                >
                    {loading ? "Deleting..." : "Delete"}
                </Button>
            </div>
        </motion.div>
    );
};

export default PrepItemCard;