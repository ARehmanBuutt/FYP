import React from 'react'
import Header from '../mockinterview/_components/Header'

function Contactlayout({ children }) {
    return (
        <div className="min-h-screen bg-blue-50">
            <Header />
            <div className='w-full h-full'>
                {children}
            </div>
        </div>
    )
}

export default Contactlayout