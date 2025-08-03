'use client'

import { useJobs } from "@/hooks/useJobs"
import JobCard from "./JobCard"
import JobListSkeleton from "./common/JobListSkeleton"

const JobContainer = () => {
  const { data: jobs, isLoading, error } = useJobs()

  if (isLoading) return <JobListSkeleton count={5} />
  if (error) return <p>{error.message}</p>

  return (
    <div className="space-y-2 w-full">
      {jobs.map((job: any) => (
<JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}

export default JobContainer
