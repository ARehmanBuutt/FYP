"use client";

import { Button } from "../../../../../components/ui/button";
import { Textarea } from "../../../../../components/ui/textarea";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { LoaderCircle, Brain } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { db } from "../../../../../utils/db";
import { resumes } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { chatSession } from "../../../../../utils/GeminiAIModal";

const prompt = "Job Title: {jobTitle}, Based on the job title, provide a list of summaries for three experience levels (Senior, Mid, Fresher) in 3-4 lines. Return data as a JSON array with 'summary' and 'experience_level' fields.";

export default function Summary({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const searchParams = useSearchParams();
  const [resumeId, setResumeId] = useState(null);
  const [summary, setSummary] = useState(resumeInfo?.summary || "");
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);

  useEffect(() => {
    const id = searchParams.get("resumeId");
    setResumeId(id);
    console.log("🔍 Retrieved resumeId:", id);
  }, [searchParams]);

  useEffect(() => {
    summary &&
      setResumeInfo((prev) => ({
        ...prev,
        summary: summary,
      }));
  }, [summary]);

  const generateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle || "Software Engineer");
    console.log("🔹 AI Prompt:", PROMPT);

    try {
      const result = await chatSession.sendMessage(prompt);
      let responseText = await result.response.text(); // Await the text response
      console.log("📌 Raw AI Response:", responseText);

      responseText = responseText.replace(/```json|```/g, "").trim();

      const parsedResponse = JSON.parse(responseText);

      setAiGeneratedSummaryList(parsedResponse);
      console.log("✅ AI Generated Summary:", parsedResponse);
    } catch (error) {
      console.error("❌ AI Generation Error:", error);
      toast.error("Error generating AI suggestions");
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!resumeId) {
      toast.error("❌ Invalid resume ID");
      console.error("❌ Resume ID is missing:", resumeId);
      setLoading(false);
      return;
    }

    try {
      console.log("📌 Updating summary with resumeId:", resumeId);
      console.log("📌 Summary Data:", summary);

      if (!summary.trim()) {
        toast.error("❌ No valid summary to update");
        setLoading(false);
        return;
      }

      // Update summary directly in DB
      const result = await db
        .update(resumes)
        .set({ summary })
        .where(eq(resumes.resumeId, resumeId))
        .returning();

      console.log("✅ Updated Rows:", result);

      if (result.length > 0) {
        enabledNext(true);
        toast.success("✅ Summary updated successfully");
      } else {
        toast.error("❌ Failed to update summary");
      }
    } catch (error) {
      console.error("❌ Database Update Error:", error);
      toast.error("Error updating summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Summary</h2>
      <p>Add a summary for your job title</p>

      <form className="mt-7" onSubmit={onSave}>
        <div className="flex justify-between items-end">
          <label>Add Summary</label>
          <Button variant="outline" onClick={generateSummaryFromAI} type="button" size="sm" className="border-primary text-primary flex gap-2">
            <Brain className="h-4 w-4" /> {loading ? <LoaderCircle className="animate-spin" /> : "Generate from AI"}
          </Button>
        </div>
        <Textarea placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." className="mt-5" required value={summary} onChange={(e) => setSummary(e.target.value)} />
        <div className="mt-2 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>

      {aiGeneratedSummaryList.length > 0 && (
        <div className="my-5">
          <h2 className="font-bold text-lg">AI Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div key={index} onClick={() => setSummary(item.summary)} className="p-5 shadow-lg my-4 rounded-lg cursor-pointer">
              <h2 className="font-bold my-1 text-primary">Level: {item.experience_level}</h2>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}