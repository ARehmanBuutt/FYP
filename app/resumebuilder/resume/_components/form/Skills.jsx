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
import { toast } from 'sonner'

const Skills = () => {

    const [skillsList, setSkillsList] = useState([{
        name: '',
        rating: 0
    }])

    const [resumeId, setResumeId] = useState(null);
        const searchParams = useSearchParams();
    
        useEffect(() => {
            const id = window.location.pathname.split("/")[3] || searchParams.get("resumeId");
    
            if (id) {
                setResumeId(id);
                console.log("🔍 Retrieved resumeId:", id);
    
                // Fetch existing experiences from DB when page loads
                fetchSkillsData(id);
            }
        }, [searchParams]);
    
        const fetchSkillsData = async (id) => {
            try {
                console.log("📌 Fetching skills data for resumeId:", id);
    
                // Fetch from database
                const skillsData = await db.select().from(skills).where(eq(skills.resumeId, id));
    
                if (skillsData.length > 0) {
                    setSkillsList(skillsData);
                    console.log("✅ Skills data loaded:", skillsData);
                } else {
                    console.log("❌ No Skills data found for this resumeId.");
                }
            } catch (error) {
            }
        };

    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);


    const handleChange = (index, name, value) => {
        const newEntries = [...skillsList];
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    };

    const AddNewSkills = () => {
        setSkillsList([...skillsList, {
            name: '',
            rating: 0
        }]);
    };

    const RemoveSkills = async (index) => {
        const skillsToRemove = skillsList[index];

        if (!skillsToRemove || !resumeId) {
            toast.error("❌ Invalid Skill entry or resume ID");
            return;
        }

        try {
            console.log("📌 Deleting skills:", skillsToRemove);

            await db.delete(skills)
                .where(
                    eq(skills.resumeId, resumeId),
                    eq(skills.name, skillsToRemove.name)
                );

            toast.success("✅ Skills removed successfully");
        } catch (error) {
            console.error("❌ Error deleting skill:", error);
            toast.error("Error removing Skill");
        }

        setSkillsList(skillsList => skillsList.slice(0, -1));
    };

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            skills: skillsList
        });
    }, [skillsList]);

    const onSave = async () => {
        setLoading(true);

        if (!resumeId) {
            toast.error("❌ Invalid resume ID");
            console.error("❌ Resume ID is missing:", resumeId);
            setLoading(false);
            return;
        }

        try {
            console.log("📌 Updating skills for resumeId:", resumeId);
            console.log("📌 skills Data:", skillsList);

            const validSkills = skillsList.filter(ski => ski.name.trim());

            if (validSkills.length === 0) {
                toast.error("❌ No valid skills to save");
                setLoading(false);
                return;
            }

            const insertData = validSkills.map(ski => ({
                resumeId,
                name: ski.name,
                rating:ski.rating,
            }));

            await db.insert(skills).values(insertData);

            toast.success("✅ Skills saved successfully");
        } catch (error) {
            console.error("❌ Database update error:", error);
            toast.error("Error updating education");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">Skills</h2>
            <p>Add your Skills</p>

            <div>
                {skillsList.map((item, index) => (

                    <div className='flex justify-between border rounded-lg p-3 mb-2'>
                        <div>
                            <label className='text-xs'>Name</label>
                            <Input className="w-full" name="name" defaultValue={item.name} onChange={(e) => handleChange(index, 'name', e.target.value)} />
                        </div>
                        <Rating style={{ maxWidth: 120 }} value={item.rating}
                        onChange={(v) => handleChange(index, 'rating', v)} />

                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={() => RemoveSkills(skillsList.length - 1)} className="text-primary"> - Remove</Button>
                    <Button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More Skills</Button>
                </div>
                <Button type="submit" disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
                </Button>
            </div>

        </div>


    )
}

export default Skills