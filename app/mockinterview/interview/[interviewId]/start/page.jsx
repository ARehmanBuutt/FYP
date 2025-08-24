"use client"
import { db } from "../../../../../utils/db";
import { MockInterview } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import React, { useState } from "react";
import { useEffect } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "../../../../../components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

const StartInterview = ({ params }) => {

  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [webCamEnable, setWebCamEnable] = useState(false)
  useEffect(() => {
    GetInterviewDetails();
  }, [])

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockResp)
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  }

  return (
    // <div>
    //   <div className="grid grid-cols-1 md:grid-cols-2 my-6 gap-10">

    //     {/* <h1>Interview Questions</h1>
    //     {mockInterviewQuestion && mockInterviewQuestion.map((questionObj, index) => (
    //       <div key={index} style={{ margin: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
    //       <p><strong>Question {index + 1}:</strong> {questionObj.question}</p>
    //       {questionObj.answer && (
    //         <p><strong>Answer:</strong> {questionObj.answer}</p>
    //         )}

    //         </div>
    //         ))} */}

    //     <QuestionSection
    //       mockInterviewQuestion={mockInterviewQuestion}
    //       activeQuestionIndex={activeQuestionIndex}
    //     />

    //     <RecordAnswerSection
    //       mockInterviewQuestion={mockInterviewQuestion}
    //       activeQuestionIndex={activeQuestionIndex}
    //       interviewData={interviewData}
    //     />
    //   </div>

    //   <div className="flex justify-end gap-6">

    //     {activeQuestionIndex > 0 &&
    //       <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question</Button>}
    //     {activeQuestionIndex != mockInterviewQuestion?.length - 1 &&
    //       <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>}
    //     {activeQuestionIndex == mockInterviewQuestion?.length - 1 &&
    //       <Link href={'/mockinterview/interview/' + interviewData?.mockId + "/feedback"}>
    //         <Button >End Interview</Button>
    //       </Link>}

    //   </div>

    // </div>

    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 my-6 gap-10 w-full">
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        <div className="flex flex-col items-center">
          <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
            webCamEnable={webCamEnable}
            setWebCamEnable={setWebCamEnable}
          />

          {/* Buttons below record answer only in mobile */}
          <div className="flex md:hidden justify-center gap-4 w-full mt-4">
            {activeQuestionIndex > 0 && (
              <Button
                onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
              >
                Previous Question
              </Button>
            )}
            {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
              <Button
                onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
              >
                Next Question
              </Button>
            )}
            {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
              <Link
                href={"/mockinterview/interview/" + interviewData?.mockId + "/feedback"}
              >
                <Button>End Interview</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Buttons stay at bottom in desktop */}
      <div className="hidden md:flex justify-end gap-6 w-full mt-12">
        {activeQuestionIndex > 0 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
            Previous Question
          </Button>
        )}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
            Next Question
          </Button>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link
            href={"/mockinterview/interview/" + interviewData?.mockId + "/feedback"}
          >
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;