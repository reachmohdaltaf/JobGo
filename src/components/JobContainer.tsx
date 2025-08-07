'use client'

import JobCard from "./JobCard"
import Link from "next/link"
import { useJobs } from "@/hooks/useJobs"
import { Skeleton } from "./ui/skeleton"
import JobListSkeleton from "./common/JobListSkeleton"
import JobCardSkeleton from "./common/JobCardSkeleton"

const JobContainer = () => {
const {data: jobs, isLoading, error } = useJobs()  
if (isLoading) return (
  <div className="w-full space-y-2">
    {[...Array(6)].map((_, index) => (
     <JobCardSkeleton key={index} />
    ))}
  </div>
);

if(error) return <p>{error.message}</p>
console.log(jobs)
  return (
   <div className="space-y-2 w-full">
  {jobs?.map((job: any) => (
    <div key={job.id}>
     
        <JobCard   isSaved={job.isSaved}  // Make sure this matches the data structure
 job={job}  />
      
    </div>
  ))}
</div>


  )
}

export default JobContainer
