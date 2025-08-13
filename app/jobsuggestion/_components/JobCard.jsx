export default function JobCard({ job }) {
  return (
    <div className="p-4 mt-8 border rounded-lg shadow">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-gray-600">{job.company} - {job.location}</p>
      <p className="text-sm mt-2">{job.description}</p>
      <a href={job.url || job.jobLink} target="_blank" rel="noreferrer" className="text-blue-500 underline mt-2 block">
        View Job
      </a>
    </div>
  );
}