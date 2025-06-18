"use client"
import { db } from '../../../utils/db';
import { resumes, experience, education, skills } from '../../../utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import ResumeItemCard from './ResumeItemCard';

const ResumeList = () => {
    const { user } = useUser();
    const [resumeList, setResumeList] = useState([]);

    useEffect(() => {
        if (user) {
            GetResumeList();
        }
    }, [user]);

    const GetResumeList = async () => {
        try {
            if (!user) return;

            console.log("📌 Fetching resumes for:", user?.primaryEmailAddress?.emailAddress);

            // Fetch resume list
            const resumeData = await db.select()
                .from(resumes)
                .where(eq(resumes.userEmail, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(resumes.id));

            if (!resumeData.length) {
                console.warn("⚠️ No resumes found");
                setResumeList([]);
                return;
            }

            console.log("✅ Resumes fetched:", resumeData);

            // Fetch related experience, education, and skills
            const detailedResumes = await Promise.all(
                resumeData.map(async (resume) => {
                    const experienceData = await db.select()
                        .from(experience)
                        .where(eq(experience.resumeId, resume.resumeId));

                    const educationData = await db.select()
                        .from(education)
                        .where(eq(education.resumeId, resume.resumeId));

                    const skillsData = await db.select()
                        .from(skills)
                        .where(eq(skills.resumeId, resume.resumeId));

                    return {
                        ...resume,
                        experience: experienceData,
                        education: educationData,
                        skills: skillsData
                    };
                })
            );

            setResumeList(detailedResumes);
            console.log("✅ Complete resume details fetched:", detailedResumes);
        } catch (error) {
            console.error("❌ Error fetching resumes:", error);
        }
    };

    const handleDeleteFromUI = (deletedResumeId) => {
        setResumeList((prev) => prev.filter((r) => r.resumeId !== deletedResumeId));
    };

    return (
        <div>
            <h2 className='font-medium text-xl mt-7'>Previous Resumes:</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>

                {resumeList.length > 0 ? (
                    resumeList.map((resume) => (
                        <ResumeItemCard key={resume.resumeId} resume={resume} onDelete={handleDeleteFromUI} />
                    ))
                ) : user ? (
                    <p className="text-gray-500">No previous resumes.</p>
                ) : (
                    <p className="text-gray-500">Fetching From Database...</p>
                )}
            </div>
        </div>
    );
};

export default ResumeList;
