"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { db } from '../../../../../utils/db'
import { toast } from 'sonner'
import { experience } from '../../../../../utils/schema'
import { LoaderCircle } from 'lucide-react'
import { eq, and } from 'drizzle-orm';
import { useSearchParams } from "next/navigation";

const Experience = () => {
    const [loading, setLoading] = useState(false)
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [experienceList, setExperienceList] = useState([
        {
            id: null, // Added id for tracking
            positionTitle: '',
            companyName: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
            workSummary: ''
        }
    ])

    const [resumeId, setResumeId] = useState(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const id = window.location.pathname.split("/")[3] || searchParams.get("resumeId");

        if (id) {
            setResumeId(id);
            console.log("🔍 Retrieved resumeId:", id);
            fetchExperienceData(id);
        }
    }, [searchParams]);

    const fetchExperienceData = async (id) => {
        try {
            console.log("📌 Fetching experience data for resumeId:", id);

            const experienceData = await db.select().from(experience).where(eq(experience.resumeId, id));

            if (experienceData.length > 0) {
                setExperienceList(experienceData);
                console.log("✅ Experience data loaded:", experienceData);
            } else {
                console.log("❌ No experience data found for this resumeId.");
            }
        } catch (error) {
            console.error("❌ Error fetching experience:", error);
        }
    };

    const handleChange = (index, event) => {
        const newEntries = [...experienceList]
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    }

    const AddNewExperience = () => {
        setExperienceList([...experienceList, {
            id: null,
            positionTitle: '',
            companyName: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
            workSummary: ''
        }]);
    }

    const RemoveExperience = async (index) => {
        const experienceToRemove = experienceList[index];

        if (!experienceToRemove || !resumeId) {
            toast.error("❌ Invalid experience entry or resume ID");
            return;
        }

        try {
            console.log("📌 Deleting experience:", experienceToRemove);

            // Remove from DB only if it has an id
            if (experienceToRemove.id) {
                await db.delete(experience)
                    .where(eq(experience.id, experienceToRemove.id));
            }

            toast.success("✅ Experience removed successfully");
        } catch (error) {
            console.error("❌ Error deleting experience:", error);
            toast.error("Error removing experience");
        }

        // Remove from state
        setExperienceList(prevList => prevList.filter((_, i) => i !== index));
    };

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = experienceList.slice();
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experienceList
        })
    }, [experienceList])

    // const onSave = async () => {
    //     setLoading(true);

    //     if (!resumeId) {
    //         toast.error("❌ Invalid resume ID");
    //         setLoading(false);
    //         return;
    //     }

    //     try {
    //         console.log("📌 Updating experience for resumeId:", resumeId);

    //         // Filter out empty entries
    //         const validExperiences = experienceList.filter(exp => exp.title.trim() && exp.companyName.trim());

    //         if (validExperiences.length === 0) {
    //             toast.error("❌ No valid experiences to save");
    //             setLoading(false);
    //             return;
    //         }

    //         // Prevent duplicates before inserting
    //         const existingExperiences = await db.select().from(experience).where(eq(experience.resumeId, resumeId));

    //         const newExperiences = validExperiences.filter(exp =>
    //             !existingExperiences.some(e =>
    //                 e.positionTitle === exp.title && e.companyName === exp.companyName
    //             )
    //         );

    //         if (newExperiences.length === 0) {
    //             toast.warning("⚠️ No new experiences to save (duplicates detected)");
    //             setLoading(false);
    //             return;
    //         }

    //         // Prepare and insert data
    //         const insertData = newExperiences.map(exp => ({
    //             resumeId,
    //             positionTitle: exp.title,
    //             companyName: exp.companyName,
    //             city: exp.city,
    //             state: exp.state,
    //             startDate: exp.startDate,
    //             endDate: exp.endDate,
    //             workSummary: exp.workSummary,
    //         }));

    //         await db.insert(experience).values(insertData);

    //         toast.success("✅ Experience saved successfully");
    //         fetchExperienceData(resumeId); // Reload after save
    //     } catch (error) {
    //         console.error("❌ Database update error:", error);
    //         toast.error("Error updating experience");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const onSave = async () => {
        setLoading(true);

        if (!resumeId) {
            toast.error("❌ Invalid resume ID");
            setLoading(false);
            return;
        }

        try {
            console.log("📌 Updating experience for resumeId:", resumeId);

            // Filter out empty entries
            const validExperiences = experienceList.filter(exp => exp.positionTitle.trim() && exp.companyName.trim());

            if (validExperiences.length === 0) {
                toast.error("❌ No valid experiences to save");
                setLoading(false);
                return;
            }

            // Fetch existing experiences from the database
            const existingExperiences = await db
                .select()
                .from(experience)
                .where(eq(experience.resumeId, resumeId));

            // Detect duplicates
            const duplicates = validExperiences.filter(exp =>
                !existingExperiences.some(e =>
                    e.positionTitle === exp.positionTitle && e.companyName === exp.companyName
                )
            );

            if (duplicates.length == 0) {
                toast.warning("⚠️ Duplicate experience detected! This entry already exists.");
                setLoading(false);
                return;
            }

            // Prepare and insert new experiences
            const insertData = duplicates.map(exp => ({
                resumeId,
                positionTitle: exp.positionTitle,
                companyName: exp.companyName,
                city: exp.city,
                state: exp.state,
                startDate: exp.startDate,
                endDate: exp.endDate,
                workSummary: exp.workSummary,
            }));

            await db.insert(experience).values(insertData);

            toast.success("✅ Experience saved successfully");
            fetchExperienceData(resumeId); // Reload after save
        } catch (error) {
            console.error("❌ Database update error:", error);
            toast.error("Error updating experience");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                <h2 className="font-bold text-lg">Professional Experience</h2>
                <p>Add Your previous job experience</p>
                <div>
                    {experienceList.map((item, index) => (
                        <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                            <div>
                                <label className='text-xs'>Position Title</label>
                                <Input placeholder="Full Stack Developer" name="positionTitle" value={item.positionTitle} onChange={(e) => handleChange(index, e)} />
                            </div>

                            <div>
                                <label className='text-xs'>Company Name</label>
                                <Input placeholder="Amazon" name="companyName" value={item.companyName} onChange={(e) => handleChange(index, e)} />
                            </div>

                            <div>
                                <label className='text-xs'>City</label>
                                <Input placeholder="New York" name="city" value={item.city} onChange={(e) => handleChange(index, e)} />
                            </div>

                            <div>
                                <label className='text-xs'>State</label>
                                <Input placeholder="NY" name="state" value={item.state} onChange={(e) => handleChange(index, e)} />
                            </div>

                            <div>
                                <label className='text-xs'>Start Date</label>
                                <Input type='date' name="startDate" value={item.startDate} onChange={(e) => handleChange(index, e)} />
                            </div>

                            <div>
                                <label className='text-xs'>End Date</label>
                                <Input type='date' name="endDate" value={item.endDate} onChange={(e) => handleChange(index, e)} />
                            </div>

                            <div className='col-span-2'>
                                <RichTextEditor
                                    index={index}
                                    onRichTextEditorChange={(e) => handleRichTextEditor(e, 'workSummary', index)}
                                />
                            </div>

                        </div>
                    ))}
                </div>

                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={() => RemoveExperience(experienceList.length - 1)} className="text-primary">
                            - Remove
                        </Button>
                        <Button variant="outline" onClick={AddNewExperience} className="text-primary">
                            + Add More Experience
                        </Button>
                    </div>
                    <Button type="submit" disabled={loading} onClick={onSave}>
                        {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Experience