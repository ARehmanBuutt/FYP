"use client"
import { useState } from "react"
import React from 'react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog"
import { chatSession } from "../../../utils/GeminiAIModal"
import { LoaderCircle, PlusSquare } from "lucide-react"
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../utils/db'
import { MockInterview } from '../../../utils/schema'
import { useUser } from "@clerk/nextjs"
import moment from 'moment'
import { useRouter } from "next/navigation"

const AddNewInterview = () => {

    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState()
    const [jobDesc, setJobDesc] = useState()
    const [jobExperience, setJobExperience] = useState()
    const [loading, setLoading] = useState(false)
    const [jsonResponse, setJsonResponse] = useState([])
    const router = useRouter();
    const { user } = useUser();

    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        console.log(jobPosition, jobDesc, jobExperience)

        // Based on this information give me 5 Interview Questions with Answers in Json Format, Give Questions and Answers as a field in JSON.

        const InputPrompt = `
        Job Position: ${jobPosition},
        Job Description: ${jobDesc},
        Job Experience: ${jobExperience}.  

        Provide 5 interview questions with answers in JSON format.

Ensure the response is **only** a JSON array with this structure:
[
  {
    "question": "Your question here?",
    "answer": "Your answer here."
  },
  {
    "question": "Your question here?",
    "answer": "Your answer here."
  }
]

❌ Do NOT wrap this array inside an object (e.g., no { "interviewQuestions": [...] }).
❌ Do NOT include any additional text before or after the JSON array.
✅ The response should be a **valid JSON array of 5 objects**, each with a "question" and "answer" field.
        `;

        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp = result.response
            .text()
            .replace("```json", "")
            .replace("```", "")
            .trim()
        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp)

        if (MockJsonResp) {

            const resp = await db.insert(MockInterview)
                .values({
                    mockId: uuidv4(),
                    jsonMockResp: MockJsonResp,
                    jobPosition: jobPosition,
                    jobDesc: jobDesc,
                    jobExperience: jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format("DD-MM-YYYY")
                }).returning({ mockId: MockInterview.mockId });

            console.log("Inserted ID:", resp)
            if (resp) {
                setOpenDialog(false);
                router.push("/mockinterview/interview/" + resp[0]?.mockId)
            }
        }
        else {

            console.log("Error")

        }

        setLoading(false);

    }

    return (
        <div>
            <div className="p-14 border items-center flex justify-center bg-secondary rounded-lg h-[300px] w-[292px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
                onClick={() => setOpenDialog(true)}
            >
                <PlusSquare />
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>

                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about your Job Interview</DialogTitle>
                        <DialogDescription>

                            <form onSubmit={onSubmit}>
                                <div className="my-3">

                                    <h2>
                                        Add details about your job position/role. Job description and your previous years of experience.
                                    </h2>

                                    <div className="mt-7 my-3">
                                        <label>Job Role/Job Position</label>
                                        <Input placeholder="Ex. Full Stack Developer"
                                            required
                                            onChange={(event) => setJobPosition(event.target.value)}
                                        />
                                    </div>

                                    <div className="my-3">
                                        <label>Job Description/Tech Stack (In Short).</label>
                                        <Textarea placeholder="Ex. React, Nextjs, Java, JavaScript etc."
                                            required
                                            onChange={(event) => setJobDesc(event.target.value)}
                                        />
                                    </div>

                                    <div className="my-3">
                                        <label>Years Of Experience</label>
                                        <Textarea placeholder="Ex. 4" type="number" max="40"
                                            required
                                            onChange={(event) => setJobExperience(event.target.value)}
                                        />
                                    </div>

                                </div>

                                <div className="flex gap-5 justify-end">
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading} >
                                        {loading ? (
                                            <>
                                                <LoaderCircle className="animate-spin" />'Generating From AI'
                                            </>
                                        ) : (
                                            "Start Interview"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


        </div>
    );
};

export default AddNewInterview;



