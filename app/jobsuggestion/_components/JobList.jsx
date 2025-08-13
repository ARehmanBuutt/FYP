import JobCard from "./JobCard";

export default function JobList({ jobs }) {
  if (!jobs || jobs.length === 0) return <p>Select resume for job suggestions.</p>;

  return (
    <div className="grid gap-4">
      {jobs.map((job, i) => (
        <JobCard key={i} job={job} />
      ))}
    </div>
  );
}