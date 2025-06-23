import React from 'react'
import Header from '../mockinterview/_components/Header'

function Joblayout({ children }) {
    return (
        <div>
            <Header />
            <div className='w-full h-full'>
                {children}
            </div>
        </div>
    )
}

export default Joblayout