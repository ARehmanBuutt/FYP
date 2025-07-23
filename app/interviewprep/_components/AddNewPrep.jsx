"use client"

import React, { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog"
import { chatSession } from "../../../utils/GeminiAIModal"
import { PlusSquare, LoaderCircle } from "lucide-react"
import { v4 as uuidv4 } from 'uuid'
import { db } from "../../../utils/db"
import { prepInterview } from "../../../utils/schema"
import { useUser } from "@clerk/nextjs"
import moment from 'moment'
import { useRouter } from "next/navigation"

const AddNewPrep = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobTitle, setJobTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { user } = useUser()

    const buildPrepPrompt = (title, count = 20) => `
Job Title: ${title}

Generate ${count} interview preparation questions with answers in JSON format.

Return ONLY a JSON array like this:
[
  { "question": "string", "answer": "string" }
]

Rules:
- Exactly ${count} objects.
- No markdown fences.
- No extra text before or after JSON.
  `

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!jobTitle?.trim()) return
        setLoading(true)

        try {
            const InputPrompt = buildPrepPrompt(jobTitle, 20)

            const result = await chatSession.sendMessage(InputPrompt)
            const raw = result.response
                .text()
                .replace("```json", "")
                .replace("```", "")
                .trim()

            // Try parse
            let parsed = []
            try {
                parsed = JSON.parse(raw)
            } catch (err) {
                console.error("JSON parse failed, storing raw string", err)
            }

            const prepId = uuidv4()

            const resp = await db.insert(prepInterview)
                .values({
                    prepId: prepId,
                    jobTitle: jobTitle,
                    jsonPrepResp: parsed.length ? JSON.stringify(parsed) : raw,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format("DD-MM-YYYY")
                })
                .returning({ prepId: prepInterview.prepId })

            if (resp && resp[0]?.prepId) {
                setOpenDialog(false)
                router.push("/interviewprep/prep/" + resp[0].prepId)
            } else {
                console.error("Failed to insert prep interview row")
            }

        } catch (err) {
            console.error("Error generating prep questions:", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {/* Trigger Card */}
            <div
                className="p-14 border items-center flex justify-center bg-secondary rounded-lg h-[300px] w-[292px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
                onClick={() => setOpenDialog(true)}
            >
                <PlusSquare />
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Interview Prep Questions</DialogTitle>
                        <DialogDescription>

                            <form onSubmit={onSubmit} className="mt-4">
                                <div className="my-3">
                                    <label>Job Title</label>
                                    <Input
                                        placeholder="Ex. Full Stack Developer"
                                        required
                                        value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                    />
                                </div>

                                <div className="flex gap-5 justify-end mt-8">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setOpenDialog(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <LoaderCircle className="animate-spin mr-2" />
                                                Generating Q&A's...
                                            </>
                                        ) : (
                                            "Generate Prep Q&A"
                                        )}
                                    </Button>
                                </div>
                            </form>

                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewPrep