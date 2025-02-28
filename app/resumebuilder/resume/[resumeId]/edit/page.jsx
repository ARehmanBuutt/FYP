"use client"
import React, { useEffect,useState } from 'react'
import FormSection from '../../_components/FormSection'
import ResumePreview from '../../_components/ResumePreview'
import { ResumeInfoContext } from '../../../../../app/context/ResumeInfoContext'
import dummy from '../../../../../app/resumebuilder/data/dummy'


const EditResume = ({params}) => {
  const [resumeInfo, setResumeInfo] = useState()
  useEffect(() => {
  //  console.log(params.resumeId)
   setResumeInfo(dummy);
  }, [])
  
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className='grid grid-cols-1 md:grid-cols-2 p-1 gap-10'>
      {/* Form Section */}
      <FormSection/>
      {/* Resume Preview */}
      <ResumePreview/>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume