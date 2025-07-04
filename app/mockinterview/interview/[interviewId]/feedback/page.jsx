"use client"
import { Button } from "../../../../../components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../../../../../components/ui/collapsible"

import { db } from '../../../../../utils/db'
import { UserAnswer } from '../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import { ChevronsUpDownIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from 'react'

const Feedback = ({ params }) => {

    const [feedbackList, setFeedbackList] = useState([])
    const router = useRouter();

    useEffect(() => {
        GetFeedback();
    }, [])


    const GetFeedback = async () => {
        const result = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewId))
            .orderBy(UserAnswer.id);

        console.log(result)
        setFeedbackList(result)
    }

    return (
        <div className='p-10'>

            {feedbackList?.length == 0 ?
                <h2 className="font-bold text-xl text-gray-500">No Feedback Record Found!</h2>
                :
                <>

                    <h2 className='text-3xl font-bold text-green-500'>Congratulation</h2>
                    <h2 className='font-bold text-2xl'>Here is your Interview Feedback</h2>

                    <hr />

                    <br />
                    <h2 className='text-sm text-gray-500'>Find below interview question with correct answer, Your answer and feedback for improvement.</h2>
                    {feedbackList && feedbackList.map((item, index) => (
                        <Collapsible key={index} className="mt-5">
                            <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full">
                                {item.question} <ChevronsUpDownIcon className="h-5 w-5" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-sm bg-red-50 p-2 border rounded-lg text-red-900"><strong>Your Answer :  </strong>{item.userAns}</h2>
                                    <h2 className="text-sm bg-green-50 p-2 border rounded-lg text-green-900"><strong>Correct Answer :  </strong>{item.correctAns}</h2>
                                    <h2 className="text-red-500 p-2 border rounded-lg"><strong>Your Answer Rating :  </strong>{item.rating}</h2>
                                    <h2 className="text-sm bg-blue-50 p-2 border rounded-lg text-blue-900"><strong>Feedback :  </strong>{item.feedback}</h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>

                    ))}

                </>}

            <Button onClick={() => router.replace('/mockinterview')}>Go Home</Button>
        </div>
    )
}

export default Feedback
