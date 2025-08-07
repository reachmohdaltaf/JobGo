'use client';

import React from 'react';
import ApplicationCard from '@/components/ApplicationCard';
import { useAppliedJobs } from '@/hooks/useAppliedJobs';
import { Loader } from 'lucide-react';
import { Job } from '@/types/auth';



const MyApplication = () => {
  const { data: appliedJobs, isLoading } = useAppliedJobs();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appliedJobs && appliedJobs.length > 0 ? (
        appliedJobs.map((job: Job) => (
          <ApplicationCard key={job.id} job={job} />
        ))
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
};

export default MyApplication;
