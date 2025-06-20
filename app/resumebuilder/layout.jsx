import React from 'react'
import Header from '../mockinterview/_components/Header'

function Resumelayout({ children }) {
  return (
    <div>
      <Header />
      <div className='mx-5 md:mx-20 lg:mx-36'>
        {children}
      </div>
    </div>
  )
}

export default Resumelayout
