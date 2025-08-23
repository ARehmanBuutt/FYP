"use client";

import { useState, useEffect } from "react";
import { getJobSuggestions } from "./action";
import JobList from "./_components/JobList";

const CITIES = [
  { label: "All Pakistan", value: "" },
  { label: "Karachi", value: "Karachi" },
  { label: "Lahore", value: "Lahore" },
  { label: "Islamabad", value: "Islamabad" },
  { label: "Rawalpindi", value: "Rawalpindi" },
  { label: "Faisalabad", value: "Faisalabad" },
  { label: "Multan", value: "Multan" },
  { label: "Peshawar", value: "Peshawar" },
  { label: "Quetta", value: "Quetta" },
];

export default function JobSuggestionsPage() {
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user resumes (from your /api/jobs route that returns {resumes, jobs})
  useEffect(() => {
    async function fetchResumes() {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setResumes(data.resumes || []);
    }
    fetchResumes();
  }, []);

  async function fetchJobSuggestions() {
    if (!selectedResumeId) return;

    setLoading(true);
    // Find selected resume and use its jobTitle
    const resume = resumes.find(r => r.resumeId === selectedResumeId);
    const title = resume?.jobTitle || resume?.title || "Developer";

    // Pass only city name; server will handle strict filtering
    const location = selectedCity; // "" means All Pakistan

    const matchedJobs = await getJobSuggestions(selectedResumeId, title, location);
    setJobs(matchedJobs);
    setLoading(false);
  }

  return (
    // <div className="p-10 space-y-6">
    //   <div>
    //     <h2 className="text-2xl font-bold">Job Suggestions</h2>
    //     <p className="text-gray-500">Get Job Suggestions based on your resumes</p>
    //   </div>

    //   <div className="flex flex-wrap items-end gap-4">
    //     <div className="flex flex-col">
    //       <label className="mb-1 font-semibold">Select Resume</label>
    //       <select
    //         value={selectedResumeId}
    //         onChange={(e) => setSelectedResumeId(e.target.value)}
    //         className="border p-2 rounded min-w-[260px]"
    //       >
    //         <option value="">Select a Resume</option>
    //         {resumes.map((r) => (
    //           <option key={r.resumeId} value={r.resumeId}>
    //             {r.jobTitle || r.title || `${r.firstName} ${r.lastName}`}
    //           </option>
    //         ))}
    //       </select>
    //     </div>

    //     <div className="flex flex-col">
    //       <label className="mb-1 font-semibold">City (Pakistan)</label>
    //       <select
    //         value={selectedCity}
    //         onChange={(e) => setSelectedCity(e.target.value)}
    //         className="border p-2 rounded min-w-[220px]"
    //       >
    //         {CITIES.map(c => (
    //           <option key={c.label} value={c.value}>{c.label}</option>
    //         ))}
    //       </select>
    //     </div>

    //     <button
    //       onClick={fetchJobSuggestions}
    //       disabled={!selectedResumeId || loading}
    //       className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
    //     >
    //       {loading ? "Loading..." : "Find Jobs"}
    //     </button>
    //   </div>

    //   <JobList jobs={jobs} />
    // </div>

    <div className="p-10 space-y-6">
      <div className="text-left">
        <h2 className="text-2xl font-bold">Job Suggestions</h2>
        <p className="text-gray-500">Get Job Suggestions based on your resumes</p>
      </div>

      <div className="flex flex-col items-center gap-4 md:flex-row md:items-end md:justify-start">
        <div className="flex flex-col w-full md:w-auto">
          <label className="mb-1 font-semibold">Select Resume</label>
          <select
            value={selectedResumeId}
            onChange={(e) => setSelectedResumeId(e.target.value)}
            className="border p-2 rounded min-w-[260px]"
          >
            <option value="">Select a Resume</option>
            {resumes.map((r) => (
              <option key={r.resumeId} value={r.resumeId}>
                {r.jobTitle || r.title || `${r.firstName} ${r.lastName}`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-full md:w-auto">
          <label className="mb-1 font-semibold">City (Pakistan)</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="border p-2 rounded min-w-[220px]"
          >
            {CITIES.map((c) => (
              <option key={c.label} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <button
          onClick={fetchJobSuggestions}
          disabled={!selectedResumeId || loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400 w-full md:w-auto"
        >
          {loading ? "Loading..." : "Find Jobs"}
        </button>
      </div>

      <JobList jobs={jobs} />
    </div>

  );
}