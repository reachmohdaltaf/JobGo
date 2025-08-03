'use client'
import { JobContext } from "@/context/JobContext"
import { useContext } from "react"
import { Card } from "./ui/card"
import { useJobs } from "@/hooks/useJobs"

const JobDetails = ({ id }: { id: string }) => {
  const {data: jobs, isLoading, error} = useJobs()

  if (!jobs || jobs.length === 0) {
    return <div>Loading...</div>
  }

  const job = jobs.find((job: any) => String(job.job_id) === String(id))

  if (!job) return <div>Job not found</div>

  return (
    <Card  className=" gap-0 px-4">
      <h1 className="text-2xl font-bold">{job.job_title}</h1>
      <p className="text-lg text-gray-600">{job.employer_name}</p>
      <p className="text-sm text-gray-500">{job.job_location}</p>

      <div className="mt-4">
        <h2 className="text-xl  font-semibold">Description</h2>
        <p className="whitespace-pre-line text-gray-700">{job.job_description}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-6">Responsibilities</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {job.job_highlights?.Responsibilities?.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-6">Qualifications</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {job.job_highlights?.Qualifications?.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-6">Apply Links</h2>
        <ul className="list-disc list-inside text-blue-600 space-y-2">
          {job.apply_options?.map((option: any, index: number) => (
            <li key={index}>
              <a href={option.apply_link} target="_blank" rel="noopener noreferrer" className="underline">
                {option.publisher}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

export default JobDetails
