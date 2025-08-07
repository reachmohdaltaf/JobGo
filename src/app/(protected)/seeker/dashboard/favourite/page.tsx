'use client'

import React from 'react'
import { useFavouriteJobs } from '@/hooks/useFavouriteJobs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import JobCard from '@/components/JobCard' // adjust path if different

const FavouriteJobs = () => {
  const { data, isLoading, error } = useFavouriteJobs()

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Something went wrong!</div>
  }

  const jobs = data?.data?.favouriteJobs || [] // adjust based on actual response structure

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Your Favourite Jobs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {jobs.length > 0 ? (
            jobs.map((job: any) => (
              <JobCard key={job.job_id} job={job} />
            ))
          ) : (
            <div className="text-muted-foreground text-sm">You have no favourite jobs yet.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default FavouriteJobs
