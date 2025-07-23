"use client"
import { db } from '../../../utils/db'
import { prepInterview } from '../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import PrepItemCard from './PrepItemCard'
import { motion, AnimatePresence } from 'framer-motion'

const PrepList = () => {
    const { user } = useUser()
    const [prepList, setPrepList] = useState([])

    useEffect(() => {
        user && fetchPrepList()
    }, [user])

    const fetchPrepList = async () => {
        const result = await db
            .select()
            .from(prepInterview)
            .where(eq(prepInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(prepInterview.id))

        setPrepList(result)
    }

    const handleRemovePrep = (id) => {
        setPrepList((prev) => prev.filter(item => item.prepId !== id))
    }

    return (
        <div>
            <h2 className='font-medium text-xl'>Previous Preparation's List:</h2>

            <motion.div
                layout
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5'
            >
                <AnimatePresence>
                    {prepList.map((prep, index) => (
                        <PrepItemCard
                            key={prep.prepId}
                            prep={prep}
                            index={index}
                            onDelete={handleRemovePrep}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default PrepList