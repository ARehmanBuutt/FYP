import { GoogleGenerativeAI } from "@google/generative-ai";

export async function matchWithGemini(jobs, resumeText) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Gemini API key missing in .env");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
You are an AI job-matching assistant.
Even if resume or job list is incomplete, return a JSON array with up to 10 best job matches.

Resume:
${resumeText || "No resume text provided."}

Jobs:
${jobs && jobs.length > 0 ? JSON.stringify(jobs) : "No jobs provided"}

Return ONLY valid JSON with this structure:
[
  { "title": "string", "company": "string", "location": "string", "description": "string", "url": "string" }
]
Strictly avoid any extra text or formatting.
`;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Remove markdown code fences if present
    text = text.replace(/```json|```/g, "").trim();

    console.log("Gemini raw output:", text);

    return JSON.parse(text);
  } catch (err) {
    console.error("Error parsing Gemini response:", err);
    return jobs.slice(0, 5); // fallback to top 5 jobs as is
  }
}