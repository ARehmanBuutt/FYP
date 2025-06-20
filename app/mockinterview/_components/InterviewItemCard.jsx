import { Button } from '../../../components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const InterviewItemCard = ({ interview }) => {

    const router = useRouter();
    const onStart = () => {
        router.push('/mockinterview/interview/' + interview?.mockId)
    }

    const onFeedback = () => {
        router.push('/mockinterview/interview/' + interview?.mockId + "/feedback")
    }

    return (
        <div className='p-3 border shadow-sm rounded-lg w-full hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed flex flex-col mt-4'>
            {/* <div className='border shadow-sm rounded-lg p-3'> */}
            <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
            <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
            <h2 className='text-xs text-gray-400'>Created At : {interview.createdAt}</h2>
            <div className='flex justify-between mt-2 gap-5'>

                <Button size="sm" variant="outline" className="w-full"
                    onClick={onFeedback}
                >Feedback</Button>

                <Button size="sm" className="w-full"
                    onClick={onStart}
                >Start</Button>

            </div>

        </div>
    )
}

export default InterviewItemCard
