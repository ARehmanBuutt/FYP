"use server";

import { db } from "../../utils/db";
import { resumes } from "../../utils/schema";
import { eq } from "drizzle-orm";
import { fetchJobs } from "../../lib/fetchJobs";
import { matchWithGemini } from "../../lib/matchWithGemini";

export async function getJobSuggestions(resumeId, titleFromUI, city) {
  // 1) Get resume
  const rows = await db.select().from(resumes).where(eq(resumes.resumeId, resumeId));
  if (!rows.length) return [];

  const r = rows[0];
  const title = (r.jobTitle || titleFromUI || "Developer").trim();

  const resumeText = `
Name: ${r.firstName || ""} ${r.lastName || ""}
Job Title: ${r.jobTitle || ""}
Summary: ${r.summary || ""}
Skills: (if you store them in a separate table, add them here)
`.trim();

  // 2) Fetch jobs using JSearch (strict city filter applied in fetchJobs)
  const rawJobs = await fetchJobs(title, city);

  if (!rawJobs.length) return [];

  // 3) (Optional) rank with Gemini and normalize shape for your UI
  const ranked = await matchWithGemini(rawJobs, resumeText);

  // Normalize jobs to what JobCard expects
  const normalized = (ranked || rawJobs).map(j => ({
    title: j.title || j.job_title || "",
    company: j.company || j.employer_name || "",
    location:
      j.location ||
      j.job_city ||
      j.job_location ||
      (j.job_state ? `${j.job_state}, Pakistan` : "Pakistan"),
    description: j.description || j.job_description || "",
    url: j.url || j.job_apply_link || j.job_google_link || j.job_offer_link || "#",
  }));

  return normalized;
}