import { Button } from '../../../components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { db } from '../../../utils/db';
import { resumes, experience, education, skills } from '../../../utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const ResumeItemCard = ({ resume, onDelete, index = 0 }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onStart = () => {
        router.push(`/resumebuilder/resume/${resume?.resumeId}/edit?resumeId=${resume?.resumeId}`);
    };

    const handleDelete = async () => {
        if (!resume?.resumeId) return;

        const confirmDelete = window.confirm("Are you sure you want to delete this resume?");
        if (!confirmDelete) return;

        setLoading(true);

        try {

            const resumeUuid = resume.resumeId.toString();

            await db.delete(experience).where(eq(experience.resumeId, resumeUuid));
            await db.delete(education).where(eq(education.resumeId, resumeUuid));
            await db.delete(skills).where(eq(skills.resumeId, resumeUuid));
            await db.delete(resumes).where(eq(resumes.resumeId, resumeUuid));

            toast.success("✅ Resume deleted successfully");

            if (onDelete) {
                onDelete(resume.resumeId); // Remove from UI
            }
        } catch (error) {
            console.error("❌ Error deleting resume:", error);
            toast.error("Error deleting resume");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: index * 0.4 }}
            whileHover={{ scale: 1.03 }}
            className='p-3 border bg-secondary rounded-lg w-full hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed flex flex-col mt-4'
        >
            <h2 className='font-bold text-primary text-center'>{resume?.title}</h2>
            <h3 className='text-sm text-gray-600 text-center border-b border-dashed pb-3'>{resume?.jobTitle}</h3>

            {/* Experience Section */}
            <div className='mt-3'>
                <h4 className='font-semibold text-sm'>Experience:</h4>
                {resume.experience?.length > 0 ? (
                    resume.experience.map((exp, idx) => (
                        <p key={idx} className='text-xs text-gray-600'>
                            {exp.positionTitle} at {exp.companyName} ({exp.startDate} - {exp.endDate})
                        </p>
                    ))
                ) : (
                    <p className='text-xs text-gray-400'>No experience added</p>
                )}
            </div>

            {/* Education Section */}
            <div className='mt-3'>
                <h4 className='font-semibold text-sm'>Education:</h4>
                {resume.education?.length > 0 ? (
                    resume.education.map((edu, idx) => (
                        <p key={idx} className='text-xs text-gray-600'>
                            {edu.degree} in {edu.major} from {edu.universityName}
                        </p>
                    ))
                ) : (
                    <p className='text-xs text-gray-400'>No education added</p>
                )}
            </div>

            {/* Skills Section */}
            <div className='mt-3'>
                <h4 className='font-semibold text-sm'>Skills:</h4>
                {resume.skills?.length > 0 ? (
                    resume.skills.map((skill, idx) => (
                        <span key={idx} className='text-xs text-gray-600 mr-2'>
                            {skill.name} ({skill.rating}/5)
                        </span>
                    ))
                ) : (
                    <p className='text-xs text-gray-400'>No skills added</p>
                )}
            </div>

            {/* Actions */}
            <div className='mt-auto flex justify-between gap-5 border-t border-dashed pt-3'>
                <Button size="sm" className="w-full " onClick={onStart}>
                    Edit Resume
                </Button>
                <Button size="sm" className="w-full" variant="destructive" disabled={loading} onClick={handleDelete}>
                    {loading ? "Deleting..." : "Delete Resume"}
                </Button>
            </div>

        </motion.div>
    );
};

export default ResumeItemCard;