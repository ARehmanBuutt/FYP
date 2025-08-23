import React from 'react'
import AddNewResume from './_components/AddNewResume'
import ResumeList from './_components/ResumeList'

function Resume() {
    return (
        // <div className='p-10 md:px-20 lg:px-32 '>
        <div className='p-10'>

            <h2 className='font-bold text-2xl'>Resume Builder</h2>
            <h2 className='text-gray-500'>Click and explore to Create Your Resume</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 mb-7">
                <div className="flex justify-center sm:justify-start">
                    <AddNewResume />
                </div>
            </div>

            <ResumeList />
        </div>
    )
}

export default Resume
