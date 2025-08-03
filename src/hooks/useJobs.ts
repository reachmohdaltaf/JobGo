// hooks/useJobs.ts
import { useQuery } from '@tanstack/react-query'

const fetchJobs = async () => {
  const res = await fetch('/api/job') // assuming that's your endpoint
  if (!res.ok) throw new Error('Failed to fetch jobs')
  return res.json()
}

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  })
}
