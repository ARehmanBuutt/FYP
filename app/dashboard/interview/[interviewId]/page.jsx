"use client"
import React, { useState, useEffect } from 'react'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { MockInterview } from '@/utils/schema'
import { Ghost, Lightbulb, WebcamIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Webcam from "react-webcam";
import Link from 'next/link'

const Interview = ({ params }) => {

  const [interviewData, setInterviewData] = useState()
  const [webCamEnable, setWebCamEnable] = useState()
  useEffect(() => {
    console.log(params.interviewId)
    GetInterviewDetails();
  }, [])

  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId))

    setInterviewData(result[0])
  }


  return (
    <div className='my-10'>
      <h2 className='font-bold text-2xl'>Lets Get Started</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

        <div className='flex flex-col my-5 gap-5'>
          <div className='flex flex-col gap-5 p-5 rounded-lg border'>
            
            <h2 className='text-lg'><strong>Job Role/Job Position:</strong> {interviewData?.jobPosition} </h2>
            <h2 className='text-lg'><strong>Job Description/Tech Stack:</strong> {interviewData?.jobDesc} </h2>
            <h2 className='text-lg'><strong>Years of Experience:</strong> {interviewData?.jobExperience} </h2>
          </div>

          <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
            <h2 className='flex gap-2 items-center text-yellow-400'><Lightbulb /><strong>Information</strong></h2>
            <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>

        </div>

        <div>


        {webCamEnable ? (
            <div className=" flex items-center justify-center p-10">
              <Webcam
                onUserMedia={() => setWebCamEnable(true)}
                onUserMediaError={() => setWebCamEnable(false)}
                height={300}
                width={300}
                mirrored={true}
              />
            </div>
          ) : (
            <div>
              <WebcamIcon className="h-72 w-full my-6 p-20 bg-secondary rounded-lg border" />
            </div>
          )}
          <div>
            <Button
              className={`${webCamEnable ? "w-full" : "w-full"}`}
              onClick={() => setWebCamEnable((prev) => !prev)}
            >
              {webCamEnable ? "Close WebCam" : "Enable WebCam"}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-4 md:my-0 md:justify-end md:items-end">
        <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
          <Button className="mt-1">Start Interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview
