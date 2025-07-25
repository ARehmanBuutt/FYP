import React from 'react'
import Header from './_components/Header'

function Interviewlayout({ children }) {
  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      <div className='mx-5 md:mx-20 lg:mx-36'>
        {children}
      </div>
    </div>
  )
}

export default Interviewlayout