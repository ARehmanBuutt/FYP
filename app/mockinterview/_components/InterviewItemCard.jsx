"use client"
import { Button } from '../../../components/ui/button'
import { useRouter } from 'next/navigation'
import { React, useState } from 'react'
import { db } from '../../../utils/db'
import { MockInterview, UserAnswer } from '../../../utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const InterviewItemCard = ({ interview, onDelete, index = 0 }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onStart = () => {
        router.push('/mockinterview/interview/' + interview?.mockId)
    }

    const onFeedback = () => {
        router.push('/mockinterview/interview/' + interview?.mockId + "/feedback")
    }

    const handleDelete = async () => {
        if (!interview?.mockId) return;

        const confirmDelete = window.confirm("Are you sure you want to delete this interview?");
        if (!confirmDelete) return;

        setLoading(true);

        try {
            const interviewId = interview.mockId.toString();

            await db.delete(UserAnswer).where(eq(UserAnswer.mockIdRef, interviewId));
            await db.delete(MockInterview).where(eq(MockInterview.mockId, interviewId));

            toast.success("✅ Interview deleted successfully");

            if (onDelete) {
                onDelete(interview.mockId);
            }
        } catch (error) {
            console.error("❌ Error deleting interview:", error);
            toast.error("Error deleting interview");
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: index * 0.4 }}
            whileHover={{ scale: 1.03 }}
            className='p-3 border bg-secondary rounded-lg w-full hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed flex flex-col mt-4'
        >
            <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
            <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
            <h2 className='text-xs text-gray-400'>Created At : {interview.createdAt}</h2>

            <div className='flex justify-between mt-2 gap-5'>
                <Button size="sm" variant="outline" className="w-full bg-secondary hover:bg-white" onClick={onFeedback}>
                    Feedback
                </Button>
                <Button size="sm" className="w-full" onClick={onStart}>
                    Start
                </Button>
                <Button size="sm" variant="outline" className="w-full bg-red-500 text-white hover:bg-red-400 hover:text-white" onClick={handleDelete}>
                    {loading ? "Deleting..." : "Delete"}
                </Button>
            </div>
            
        </motion.div>
    )
}

export default InterviewItemCard;