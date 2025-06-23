"use client"
import { db } from '../../../utils/db';
import { MockInterview } from '../../../utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';
import { motion, AnimatePresence } from 'framer-motion';

const InterviewlList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db.select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(MockInterview.id))

    setInterviewList(result);
  };

  // Remove interview from UI
  const handleRemoveInterview = (id) => {
    setInterviewList((prev) => prev.filter(item => item.mockId !== id));
  };

  return (
    <div>
      <h2 className='font-medium text-xl'>Previous Interview's List:</h2>

      <motion.div
        layout
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5'
      >
        <AnimatePresence>
          {interviewList.map((interview, index) => (
            <InterviewItemCard
              key={interview.mockId}
              interview={interview}
              index={index}
              onDelete={handleRemoveInterview}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default InterviewlList;