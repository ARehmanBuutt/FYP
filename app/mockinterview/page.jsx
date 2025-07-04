import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewlList from './_components/InterviewlList'


const Interview = () => {
  return (
    <div className='p-10'>

      <h2 className='font-bold text-2xl'>Mock-Interview</h2>
      <h2 className='text-gray-500'>Create and Start your AI Mock-Interview</h2>

      <div className='grid grid-cols-2 md:grid-col-3 lg:grid-cols-5 mt-10 mb-7'>
        <AddNewInterview />
      </div>

      {/* Previous Interview's List */}
      <InterviewlList />

    </div>
  )
}

export default Interview