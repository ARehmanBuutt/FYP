"use client"
import React, { useContext, useEffect, useState } from 'react';
import { Input } from '../../../../../components/ui/input';
import { Textarea } from '../../../../../components/ui/textarea';
import { Button } from '../../../../../components/ui/button';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import { db } from '../../../../../utils/db';
import { education } from '../../../../../utils/schema';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { eq } from 'drizzle-orm';

const Education = ({ resumeId }) => {
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [educationalList, setEducationalList] = useState([
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }
    ]);

    const handleChange = (index, event) => {
        const newEntries = [...educationalList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setEducationalList(newEntries);
    };

    const AddNewEducation = () => {
        setEducationalList([...educationalList, {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }]);
    };

    const RemoveEducation = async (index) => {
        const educationToRemove = educationalList[index];
        
        if (!educationToRemove || !resumeId) {
            toast.error("❌ Invalid education entry or resume ID");
            return;
        }

        try {
            console.log("📌 Deleting education:", educationToRemove);

            await db.delete(education)
                .where(
                    eq(education.resumeId, resumeId),
                    eq(education.universityName, educationToRemove.universityName)
                );

            toast.success("✅ Education removed successfully");
        } catch (error) {
            console.error("❌ Error deleting education:", error);
            toast.error("Error removing education");
        }

        setEducationalList(educationalList => educationalList.slice(0, -1));
    };

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            education: educationalList
        });
    }, [educationalList]);

    const onSave = async () => {
        setLoading(true);

        if (!resumeId) {
            toast.error("❌ Invalid resume ID");
            console.error("❌ Resume ID is missing:", resumeId);
            setLoading(false);
            return;
        }

        try {
            console.log("📌 Updating education for resumeId:", resumeId);
            console.log("📌 Education Data:", educationalList);

            const validEducation = educationalList.filter(edu => edu.universityName.trim());

            if (validEducation.length === 0) {
                toast.error("❌ No valid education to save");
                setLoading(false);
                return;
            }

            const insertData = validEducation.map(edu => ({
                resumeId,
                universityName: edu.universityName,
                degree: edu.degree,
                major: edu.major,
                startDate: edu.startDate,
                endDate: edu.endDate,
                description: edu.description,
            }));

            await db.insert(education).values(insertData);

            toast.success("✅ Education saved successfully");
        } catch (error) {
            console.error("❌ Database update error:", error);
            toast.error("Error updating education");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">Education</h2>
            <p>Add your Educational Details</p>

            <div>
                {educationalList.map((item, index) => (
                    <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-5'>
                        <div className='col-span-2'>
                            <label className='text-xs'>University Name</label>
                            <Input name="universityName" value={item.universityName} onChange={(e) => handleChange(index, e)} />
                        </div>
                        <div>
                            <label className='text-xs'>Degree</label>
                            <Input name="degree" value={item.degree} onChange={(e) => handleChange(index, e)} />
                        </div>
                        <div>
                            <label className='text-xs'>Major</label>
                            <Input name="major" value={item.major} onChange={(e) => handleChange(index, e)} />
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
                            <label className='text-xs'>Description</label>
                            <Textarea name="description" value={item.description} onChange={(e) => handleChange(index, e)} />
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={() => RemoveEducation(educationalList.length - 1)} className="text-primary"> - Remove</Button>
                    <Button variant="outline" onClick={AddNewEducation} className="text-primary"> + Add More Education</Button>
                </div>
                <Button type="submit" disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
                </Button>
            </div>
        </div>
    );
};

export default Education;
