import React from 'react'
import Header from '../mockinterview/_components/Header'

function InterviewPreplayout({ children }) {
    return (
        <div>
            <Header />
            <div className='w-full h-full'>
                {children}
            </div>
        </div>
    )
}

export default InterviewPreplayout