"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../../../../../components/ui/input'
import { Textarea } from '../../../../../components/ui/textarea'
import { Button } from '../../../../../components/ui/button'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'


const Education = () => {
    const [loading, setLoading] = useState(false);
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext)
    const [educationalList, setEducationalList] = useState([
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }
    ])

    const handleChange = (event, index) => {
        const newEntries = educationalList.slice()
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setEducationalList(newEntries)
    }

    const AddNewEducation = () => {
        setEducationalList([...educationalList, {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }])
    }
    const RemoveEducation = () => {
        setEducationalList(educationalList => educationalList.slice(0, -1))
    }

    const onSave = () => {
    }

    useEffect(() => {
            setResumeInfo({
                ...resumeInfo,
                education: educationalList
            })
            console.log(educationalList)
        }, [educationalList])

    return (

        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">Education</h2>
            <p>Add your Educationl Details</p>

            <div>
                {educationalList.map((item, index) => (
                    <div>
                        <div className='grid grid-cols-2 gap-3 border p-3 my-5'>

                            <div className='col-span-2'>
                                <label className='text-xs'>University Name</label>
                                <Input name="universityName" onChange={(e) => handleChange(e, index)} />
                            </div>

                            <div>
                                <label className='text-xs'>Degree</label>
                                <Input name="degree" onChange={(e) => handleChange(e, index)} />
                            </div>

                            <div>
                                <label className='text-xs'>Major</label>
                                <Input name="major" onChange={(e) => handleChange(e, index)} />
                            </div>

                            <div>
                                <label className='text-xs'>Start Date</label>
                                <Input type='date' name="startDate" onChange={(e) => handleChange(e, index)} />
                            </div>

                            <div>
                                <label className='text-xs'>End Date</label>
                                <Input type='date' name="endDate" onChange={(e) => handleChange(e, index)} />
                            </div>

                            <div className='col-span-2'>
                                <label className='text-xs'>Description</label>
                                <Textarea name="description" onChange={(e) => handleChange(e, index)} />
                            </div>


                        </div>

                    </div>

                ))}
            </div>

            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={RemoveEducation} className="text-primary"> - Remove</Button>
                    <Button variant="outline" onClick={AddNewEducation} className="text-primary"> + Add More Education</Button>
                </div>
                <Button type="submit" disabled={loading} onClick={()=>onSave()}>
                                    {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
                                </Button>
                {/* <Button>Save</Button> */}
            </div>

        </div>
    )
}

export default Education