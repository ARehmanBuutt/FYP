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
import { eq } from 'drizzle-orm';
import { useSearchParams } from "next/navigation";

const Experience = () => {
    const [loading, setLoading] = useState(false)
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [experienceList, setExperienceList] = useState([
        {
            id: null,
            positionTitle: '',
            companyName: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
            workSummary: ''
        }
    ])

    const [resumeId, setResumeId] = useState(null)
    const searchParams = useSearchParams()

    useEffect(() => {
        const id = window.location.pathname.split("/")[3] || searchParams.get("resumeId")
        if (id) {
            setResumeId(id)
            fetchExperienceData(id)
        }
    }, [searchParams])

    const fetchExperienceData = async (id) => {
        try {
            const experienceData = await db.select().from(experience).where(eq(experience.resumeId, id))
            if (experienceData.length > 0) {
                setExperienceList(experienceData)
            }
        } catch (error) {
            console.error("❌ Error fetching experience:", error)
        }
    }

    const handleChange = (index, event) => {
        const newEntries = [...experienceList]
        const { name, value } = event.target
        newEntries[index][name] = value
        setExperienceList(newEntries)
    }

    const AddNewExperience = (index) => {
        const newEntry = {
            id: null,
            positionTitle: '',
            companyName: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
            workSummary: ''
        }
        const updatedList = [...experienceList]
        updatedList.splice(index + 1, 0, newEntry)
        setExperienceList(updatedList)
    }

    const RemoveExperience = async (index) => {
        const toRemove = experienceList[index]
        if (toRemove.id) {
            try {
                await db.delete(experience).where(eq(experience.id, toRemove.id))
                toast.success("✅ Experience removed successfully")
            } catch (err) {
                toast.error("❌ Error deleting experience")
                return
            }
        }
        setExperienceList(experienceList.filter((_, i) => i !== index))
    }

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = [...experienceList]
        newEntries[index][name] = e.target.value
        setExperienceList(newEntries)
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experienceList
        })
    }, [experienceList])

    const onSave = async () => {
        setLoading(true)
        if (!resumeId) {
            toast.error("❌ Invalid resume ID")
            setLoading(false)
            return
        }

        try {
            for (const exp of experienceList) {
                const data = {
                    resumeId,
                    positionTitle: exp.positionTitle,
                    companyName: exp.companyName,
                    city: exp.city,
                    state: exp.state,
                    startDate: exp.startDate,
                    endDate: exp.endDate,
                    workSummary: exp.workSummary,
                }

                if (exp.id) {
                    await db.update(experience).set(data).where(eq(experience.id, exp.id))
                    toast.success(`✅ Experience updated successfully`)
                } else {
                    await db.insert(experience).values(data)
                    toast.success(`✅ Experience added successfully`)
                }
            }

            fetchExperienceData(resumeId)
        } catch (error) {
            console.error("❌ Error saving experience:", error)
            toast.error("Error saving experience")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                <h2 className="font-bold text-lg">Professional Experience</h2>
                <p>Add Your previous job experience</p>

                {experienceList.map((item, index) => (
                    <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div>
                            <label className='text-xs'>Position Title</label>
                            <Input name="positionTitle" value={item.positionTitle} onChange={(e) => handleChange(index, e)} />
                        </div>

                        <div>
                            <label className='text-xs'>Company Name</label>
                            <Input name="companyName" value={item.companyName} onChange={(e) => handleChange(index, e)} />
                        </div>

                        <div>
                            <label className='text-xs'>City</label>
                            <Input name="city" value={item.city} onChange={(e) => handleChange(index, e)} />
                        </div>

                        <div>
                            <label className='text-xs'>State</label>
                            <Input name="state" value={item.state} onChange={(e) => handleChange(index, e)} />
                        </div>

                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input type="date" name="startDate" value={item.startDate} onChange={(e) => handleChange(index, e)} />
                        </div>

                        <div>
                            <label className='text-xs'>End Date</label>
                            <Input type="date" name="endDate" value={item.endDate} onChange={(e) => handleChange(index, e)} />
                        </div>

                        <div className='col-span-2'>
                            <RichTextEditor
                                index={index}
                                value={item.workSummary}
                                onRichTextEditorChange={(e) => handleRichTextEditor(e, 'workSummary', index)}
                            />
                        </div>

                        <div className="col-span-2 flex gap-2">
                            <Button variant="outline" onClick={() => RemoveExperience(index)} className="text-red-500">
                                - Remove
                            </Button>
                            <Button variant="outline" onClick={() => AddNewExperience(index)} className="text-primary">
                                + Add More Experience
                            </Button>
                        </div>
                    </div>
                ))}

                <div className="flex justify-end">
                    <Button onClick={onSave} disabled={loading}>
                        {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Experience