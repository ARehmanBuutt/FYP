"use client"
import { Button } from '../../../../../components/ui/button'
import { Input } from '../../../../../components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
import { db } from '../../../../../utils/db'
import { toast } from 'sonner'
import { experience } from '../../../../../utils/schema'
import { LoaderCircle } from 'lucide-react'
import { useSearchParams } from "next/navigation";


const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: ''
}


const Experience = () => {
    // const Experience = ({ resumeId }) => {
    const [loading, setLoading] = useState(false)
    const [experienceList, setExperienceList] = useState([
        formField
    ])

    const [resumeId, setResumeId] = useState(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const id = window.location.pathname.split("/")[3] || searchParams.get("resumeId");

        if (id) {
            setResumeId(id);
            console.log("🔍 Retrieved resumeId:", id);

            // Fetch existing experiences from DB when page loads
            fetchExperienceData(id);
        }
    }, [searchParams]);

    const fetchExperienceData = async (id) => {
        try {
            console.log("📌 Fetching experience data for resumeId:", id);

            // Fetch from database
            const experienceData = await db.select().from(experience).where(eq(experience.resumeId, id));

            if (experienceData.length > 0) {
                setExperienceList(experienceData);
                console.log("✅ Experience data loaded:", experienceData);
            } else {
                console.log("❌ No experience data found for this resumeId.");
            }
        } catch (error) {
        }
    };

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

    const handleChange = (index, event) => {
        const newEntries = experienceList.slice()
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries)
    }
    const AddNewExperience = () => {
        setExperienceList([...experienceList, {
            title: '',
            companyName: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
            workSummary: ''
        }])
    }
    // const RemoveExperience = () => {
    //     setExperienceList(experienceList => experienceList.slice(0, -1))
    // }

    const RemoveExperience = async (index) => {
        const experienceToRemove = experienceList[index];

        if (!experienceToRemove || !resumeId) {
            toast.error("❌ Invalid experience entry or resume ID");
            return;
        }

        try {
            console.log("📌 Deleting experience:", experienceToRemove);

            // Remove from DB if it exists
            await db.delete(experience)
                .where(
                    eq(experience.resumeId, resumeId),
                    eq(experience.positionTitle, experienceToRemove.title)
                );

            toast.success("✅ Experience removed successfully");
        } catch (error) {
            console.error("❌ Error deleting experience:", error);
            toast.error("Error removing experience");
        }

        // Remove from state
        setExperienceList(experienceList => experienceList.slice(0, -1));
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
        console.log(experienceList)
    }, [experienceList])

    const onSave = async () => {
        setLoading(true);

        if (!resumeId) {
            toast.error("❌ Invalid resume ID");
            console.error("❌ Resume ID is missing:", resumeId);
            setLoading(false);
            return;
        }

        try {
            console.log("📌 Updating experience for resumeId:", resumeId);
            console.log("📌 Experience Data:", experienceList);

            // Filter out empty entries
            const validExperiences = experienceList.filter(exp => exp.title.trim());

            if (validExperiences.length === 0) {
                toast.error("❌ No valid experiences to save");
                setLoading(false);
                return;
            }

            // Prepare the insert data
            const insertData = validExperiences.map(exp => ({
                resumeId,
                positionTitle: exp.title,
                companyName: exp.companyName,
                city: exp.city,
                state: exp.state,
                startDate: exp.startDate,
                endDate: exp.endDate,
                workSummary: exp.workSummary,
            }));

            // Insert into database
            await db.insert(experience).values(insertData);

            toast.success("✅ Experience saved successfully");
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
                <p>Add Your previoius Job experience</p>
                <div>
                    {experienceList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                <div>
                                    <label className='text-xs'>Position Title</label>
                                    <Input name="title" defaultValue={item.title} onChange={(event) => handleChange(index, event)} />
                                </div>

                                <div>
                                    <label className='text-xs'>Company Name</label>
                                    <Input name="companyName" defaultValue={item.companyName} onChange={(event) => handleChange(index, event)} />
                                </div>

                                <div>
                                    <label className='text-xs'>City</label>
                                    <Input name="city" defaultValue={item.city} onChange={(event) => handleChange(index, event)} />
                                </div>

                                <div>
                                    <label className='text-xs'>State</label>
                                    <Input name="state" defaultValue={item.state} onChange={(event) => handleChange(index, event)} />
                                </div>

                                <div>
                                    <label className='text-xs'>Start Date</label>
                                    <Input type='date' name="startDate" defaultValue={item.endDate} onChange={(event) => handleChange(index, event)} />
                                </div>

                                <div>
                                    <label className='text-xs'>End Date</label>
                                    <Input type='date' name="endDate" defaultValue={item.endDate} onChange={(event) => handleChange(index, event)} />
                                </div>

                                <div className='col-span-2'>
                                    <RichTextEditor
                                        index={index}
                                        onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummary', index)} />
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        {/* <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button> */}
                        <Button variant="outline" onClick={() => RemoveExperience(experienceList.length - 1)} className="text-primary">
                            - Remove
                        </Button>
                        <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>

                    </div>
                    <Button type="submit" disabled={loading} onClick={() => onSave()}
                    // onClick={()=>onSave()}
                    >
                        {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
                    </Button>
                    {/* <Button>Save</Button> */}
                </div>

            </div>
        </div>
    )
}

export default Experience