'use client'

import { useContext } from "react"
import JobCard from "./JobCard"
import { JobContext } from "@/context/JobContext"
import Link from "next/link"

const JobContainer = () => {
  const context = useContext(JobContext)

  if (!context) {
    return <div>Loading...</div>
  }

  const { jobs } = context
  console.log("jobs in job container", jobs)

  return (
   <div className="space-y-2 w-full">
  {jobs.map((job: any) => (
    <div key={job.job_id}>
      <Link href={`job/${encodeURIComponent(job.job_id)}`}>
        <JobCard job={job} />
      </Link>
    </div>
  ))}
</div>


  )
}

export default JobContainer
