"use client"
import Webcam from 'react-webcam'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { Button } from '../../../../../../components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '../../../../../../utils/GeminiAIModal'
import { UserAnswer } from '../../../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import { db } from '../../../../../../utils/db'
import moment from "moment";

const RecordAnswerSection = ({ mockInterviewQuestion, activeQuestionIndex, interviewData }) => {
    const [userAnswer, setUserAnswer] = useState('')
    const { user } = useUser();
    const [loading, setLoading] = useState(false)
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results.map((result) => (
            setUserAnswer(prevAns => prevAns + result?.transcript)
        ))
    }, [results])

    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            UpdateUserAnswer();
        }

        // if (userAnswer?.length < 10) {
        //     setLoading(false)
        //     toast('Error while saving your Answer, Please Record agian')
        //     return;
        // }

    }, [userAnswer])


    const StartStopRecording = async () => {
        if (isRecording) {

            stopSpeechToText();


        }
        else {
            startSpeechToText();
        }
    }

    const UpdateUserAnswer = async () => {
        console.log(userAnswer)
        setLoading(true)
        const feedbackPrompt =
            "Question:" +
            mockInterviewQuestion[activeQuestionIndex]?.question +
            ", User Answer:" +
            userAnswer +
            " , Depends on question and user answer for given interview question" +
            " please give us rating for answer and feedback as area of improvement if any " +
            "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

        const result = await chatSession.sendMessage(feedbackPrompt);

        const mockJsonResp = (result.response.text()).replace("```json", "").replace("```", "");
        console.log(mockJsonResp)
        const JsonFeedbackResp = JSON.parse(mockJsonResp)

        const resp = await db.insert(UserAnswer)
            .values({
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestion[activeQuestionIndex]?.question,
                correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                userAns: userAnswer,
                feedback: JsonFeedbackResp?.feedback,
                rating: JsonFeedbackResp?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format("DD-MM-YYYY"),
            })

        if (resp) {
            toast('Your Answer has been saved successfully')
            setUserAnswer('');
            setResults([]);
        }
        setResults([]);

        setLoading(false)
    }

    return (
        <div className='flex items-center justify-center flex-col'>

            <div className='flex flex-col my-20  justify-center items-center rounded-lg p-5'>
                <Image src={"/camera.jpg"} width={200} height={200} className='absolute' />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10,
                    }}
                />
            </div>
            <Button
                disabled={loading}
                variant="outline" className="my-10"
                onClick={StartStopRecording}>
                {isRecording ?
                    <h2 className='text-red-400 flex gap-2'>
                        <StopCircle /> Stop Recording
                    </h2>
                    :
                    'Record Answer'}</Button>

            {/* <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button> */}

        </div>
    )
}

export default RecordAnswerSection
