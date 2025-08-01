'use client'
import { useContext } from "react"
import { JobContext } from "@/context/JobContext"

const Search = ({ searchParams }: { searchParams: { q?: string } }) => {
  const { jobs } = useContext(JobContext)
  const search = searchParams.q || ""

  return (
    <div>
      <h2>Search results for: {search}</h2>
      <ul>
        {jobs
          ?.filter((job: any) =>
            job.job_title.toLowerCase().includes(search.toLowerCase())
          )
          .map((job: any) => (
            <li key={job.job_id}>{job.job_title}</li>
          ))}
      </ul>
    </div>
  )
}

export default Search
