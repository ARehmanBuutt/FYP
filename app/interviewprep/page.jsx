import React from 'react'
import AddNewPrep from './_components/AddNewPrep'
import PrepList from './_components/PrepList'

const InterviewPrep = () => {
  return (
    <div className='p-10'>

      <h2 className='font-bold text-2xl'>Interview-Preparation</h2>
      <h2 className='text-gray-500'>Create and Start your AI Interview-Preparation</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 mb-7">
        <div className="flex justify-center sm:justify-start">
          <AddNewPrep />
        </div>
      </div>

      <PrepList />

    </div>
  )
}

export default InterviewPrep
