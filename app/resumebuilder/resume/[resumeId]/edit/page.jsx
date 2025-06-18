"use client"
import React, { useEffect, useState } from 'react'
import FormSection from '../../_components/FormSection'
import ResumePreview from '../../_components/ResumePreview'
import { ResumeInfoContext } from '../../../../../app/context/ResumeInfoContext'
import dummy from '../../../../../app/resumebuilder/data/dummy'
import { db } from '../../../../../utils/db'
import { resumes, experience, education, skills } from '../../../../../utils/schema'
import { useSearchParams } from 'next/navigation'
import { eq } from 'drizzle-orm'

const EditResume = () => {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");
  const [resumeInfo, setResumeInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (resumeId) {
      fetchResumeData(resumeId);
    } else {
      setResumeInfo(dummy); // No resumeId = new resume
      setIsLoading(false);
    }
  }, [resumeId]);

  const fetchResumeData = async (id) => {
    try {
      const existingResume = await db.select().from(resumes).where(eq(resumes.resumeId, id));

      if (existingResume.length > 0) {
        const resumeData = existingResume[0];

        if (resumeData.status === "draft") {
          setResumeInfo(dummy); // Still in draft mode → Show dummy data
        } else {
          fetchCompleteResumeData(id); // Load saved data
        }
      } else {
        setResumeInfo(dummy);
      }
    } catch (error) {
      console.error("❌ Error fetching resume data:", error);
      setResumeInfo(dummy);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCompleteResumeData = async (id) => {
    try {
      const [fetchedResume, fetchedExperience, fetchedEducation, fetchedSkills] = await Promise.all([
        db.select().from(resumes).where(eq(resumes.resumeId, id)),
        db.select().from(experience).where(eq(experience.resumeId, id)),
        db.select().from(education).where(eq(education.resumeId, id)),
        db.select().from(skills).where(eq(skills.resumeId, id))
      ]);

      if (fetchedResume.length > 0) {
        const fullResumeData = {
          ...dummy,
          ...fetchedResume[0],
          experience: fetchedExperience,
          education: fetchedEducation,
          skills: fetchedSkills
        };

        setResumeInfo(fullResumeData);
      } else {
        setResumeInfo(dummy);
      }
    } catch (error) {
      console.error("❌ Error fetching resume data:", error);
      setResumeInfo(dummy);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className='grid grid-cols-1 md:grid-cols-2 p-1 gap-10'>
        {isLoading ? (
          <p>Loading resume...</p>
        ) : (
          <>
            <FormSection />
            <ResumePreview />
          </>
        )}
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume;