"use client"
import React, { useEffect, useState, useContext } from 'react'
import { Input } from '../../../../../components/ui/input'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '../../../../../components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { db } from '../../../../../utils/db'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { skills } from '../../../../../utils/schema'
import { useSearchParams } from "next/navigation";
import { eq } from 'drizzle-orm';
import { toast } from 'sonner'
import { resumes } from '../../../../../utils/schema'

const Skills = () => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const searchParams = useSearchParams();
    const resumeId = searchParams.get("resumeId") || window.location.pathname.split("/")[3];

    const [loading, setLoading] = useState(false);
    const [skillsList, setSkillsList] = useState([]);

    useEffect(() => {
        if (!resumeId) return;

        const fetchSkillsData = async () => {
            try {
                console.log("📌 Fetching skills for resumeId:", resumeId);
                const skillsData = await db.select().from(skills).where(eq(skills.resumeId, resumeId));

                if (skillsData.length > 0) {
                    setSkillsList(skillsData);
                    setResumeInfo(prev => ({ ...prev, skills: skillsData }));
                } else {
                    setSkillsList([]); // Ensure empty array if no data
                    console.log("❌ No Skills data found.");
                }
            } catch (error) {
                console.error("❌ Error fetching skills:", error);
            }
        };

        fetchSkillsData();
    }, [resumeId]);

    useEffect(() => {
        setResumeInfo(prev => ({ ...prev, skills: skillsList }));
    }, [skillsList]);

    const handleChange = (index, name, value) => {
        const newEntries = [...skillsList];
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    };

    const AddNewSkills = () => {
        setSkillsList(prev => [...prev, { name: '', rating: 0 }]);
    };

    const RemoveSkills = async (index) => {
        const skillToRemove = skillsList[index];

        if (skillToRemove.id) {
            try {
                await db.delete(skills).where(eq(skills.id, skillToRemove.id));
                toast.success("✅ Skill removed successfully");
            } catch (error) {
                console.error("❌ Error removing skill:", error);
                toast.error("Error removing skill");
            }
        }

        setSkillsList(skillsList.filter((_, i) => i !== index));
    };

    const onSave = async () => {
        setLoading(true);

        if (!resumeId) {
            toast.error("❌ Invalid resume ID");
            setLoading(false);
            return;
        }

        try {
            console.log("📌 Saving skills for resumeId:", resumeId);
            const validSkills = skillsList.filter(s => s.name.trim());

            if (validSkills.length === 0) {
                toast.error("❌ No valid skills to save");
                setLoading(false);
                return;
            }

            // Fetch existing skills from the database
            const existingSkills = await db
                .select()
                .from(skills)
                .where(eq(skills.resumeId, resumeId));

            // Detect duplicates
            const duplicates = validSkills.filter(skill =>
                existingSkills.some(existing => existing.name.toLowerCase() === skill.name.toLowerCase())
            );

            if (duplicates.length > 0) {
                toast.warning("⚠️ Some skills are already added and won't be saved again.");
            }

            // Filter out duplicates before inserting
            const newSkills = validSkills.filter(skill =>
                !existingSkills.some(existing => existing.name.toLowerCase() === skill.name.toLowerCase())
            );

            if (newSkills.length === 0) {
                setLoading(false);
                return; // No new skills to insert
            }

            // Insert only non-duplicate skills
            await db.insert(skills).values(
                newSkills.map(s => ({
                    resumeId,
                    name: s.name,
                    rating: s.rating
                }))
            );

            // ✅ Mark resume as "completed" after saving skills
            await db
                .update(resumes)
                .set({ status: "completed" })
                .where(eq(resumes.resumeId, resumeId));

            console.log("✅ Resume marked as completed!");

            toast.success("✅ Skills saved successfully");
            setSkillsList([...existingSkills, ...newSkills]); // Update state to reflect saved data
        } catch (error) {
            console.error("❌ Error saving skills:", error);
            toast.error("Error saving skills");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">Skills</h2>
            <p>Add your Skills</p>

            <div>
                {skillsList.length > 0 ? (
                    skillsList.map((item, index) => (
                        <div key={index} className='flex justify-between border rounded-lg p-3 mb-2'>
                            <div>
                                <label className='text-xs'>Name</label>
                                <Input placeholder="ReactJs" className="w-full" name="name" value={item.name}
                                    onChange={(e) => handleChange(index, 'name', e.target.value)} />
                            </div>
                            <Rating style={{ maxWidth: 120 }} value={item.rating}
                                onChange={(v) => handleChange(index, 'rating', v)} />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No skills added yet. Click "Add More Skills" to start.</p>
                )}
            </div>

            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    {skillsList.length > 0 && (
                        <Button variant="outline" onClick={() => RemoveSkills(skillsList.length - 1)} className="text-red-500">
                            - Remove
                        </Button>
                    )}
                    <Button variant="outline" onClick={AddNewSkills} className="text-primary">
                        + Add More Skills
                    </Button>
                </div>
                <Button type="submit" disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
                </Button>
            </div>
        </div>
    );
}

export default Skills;