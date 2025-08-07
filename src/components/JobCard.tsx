'use client'

import React, { useRef, useState } from 'react'
import {
  Card,
  CardContent,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Bookmark,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Building2,
  User,
  ExternalLink,
  BookMarked,
} from 'lucide-react'
import Link from 'next/link'
import { useAddToFavourite } from '@/hooks/useAddToFavourite'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useApplyJob } from '@/hooks/useApplyJob'
import { useQueryClient } from '@tanstack/react-query'

interface Job {
  id: string
  job_title: string
  employer_name?: string | null
  job_description: string
  job_location?: string
  job_employment_type_text?: string | null
  job_posted_human_readable?: string | null
  salary_min?: number
  salary_max?: number
  createdAt: string
  postedByUserId: string
  companyId: string
  hasApplied?: boolean // This comes from the API
  company?: {
    id: string
    name: string
    email: string
    createdAt: string
    ownerId: string
  }
  postedBy?: {
    id: string
    name: string
    email: string
    role: string
    createdAt: string
  }
}

interface JobCardProps {
  job: Job
  isSaved?: boolean
}

const JobCard: React.FC<JobCardProps> = ({ job, isSaved = false }) => {
  const {
    id,
    job_title,
    job_employment_type_text,
    job_location,
    job_description,
    job_posted_human_readable,
    salary_min,
    salary_max,
    createdAt,
    company,
    postedBy,
    hasApplied, // Use the server data
  } = job

  const companyName =
    company?.name || job.employer_name || postedBy?.name || 'Unknown Company'
  const salaryRange = formatSalary(salary_min, salary_max)

  const [resume, setResume] = useState('')
  const [coverLetter, setCoverLetter] = useState('')
  const [isBookmarked, setIsBookmarked] = useState(isSaved)
  const [dialogOpen, setDialogOpen] = useState(false)
  // Local state to track application status for immediate UI feedback
  const [localHasApplied, setLocalHasApplied] = useState(hasApplied)

  const { mutate: applyJob, isPending: isApplying } = useApplyJob()
  const { mutate: toggleFavourite, isPending: isFavouriting } = useAddToFavourite()
  const queryClient = useQueryClient()

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    toggleFavourite(id, {
      onSuccess: (res) => {
        setIsBookmarked(res.isFavourited)
      },
    })
  }

  const handleApply = () => {
    applyJob({
      resume,
      coverLetter,
      jobId: id,
      userId: '', // Backend mein authenticated user ka ID use hoga
    }, {
      onSuccess: () => {
        // Immediate UI update
        setLocalHasApplied(true)
        
        // Invalidate and refetch jobs to get updated hasApplied status
        queryClient.invalidateQueries({ queryKey: ['jobs'] })
        queryClient.invalidateQueries({ queryKey: ['appliedJobs'] })
        
        // Clear the form and close dialog
        setResume('')
        setCoverLetter('')
        setDialogOpen(false)
        
        console.log('Successfully applied to job!')
      },
      onError: (error) => {
        console.error('Application failed:', error)
        // Keep local state as false if application fails
        setLocalHasApplied(false)
      }
    })
  }

  // Use local state first, then fallback to server state
  const isApplied = localHasApplied || hasApplied

  function formatSalary(min?: number, max?: number) {
    if (!min && !max) return null
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`
    if (min) return `From $${min.toLocaleString()}`
    if (max) return `Up to $${max.toLocaleString()}`
    return null
  }

  function formatPostedDate() {
    if (job_posted_human_readable) return job_posted_human_readable
    const postedDate = new Date(createdAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - postedDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  function truncateDescription(text: string, maxLength: number = 150) {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
  }

  return (
    <Card className="w-full cursor-pointer hover:shadow-md transition-all duration-300 p-0 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start gap-4">
          {/* Left Section */}
          <div className="flex-1 min-w-0 space-y-3">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold hover:text-primary transition-colors cursor-pointer line-clamp-2">
                {job_title}
              </CardTitle>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 size={16} />
                <span className="font-medium">{companyName}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {job_employment_type_text && (
                <Badge variant="secondary">
                  <Briefcase size={12} className="mr-1" />
                  {job_employment_type_text}
                </Badge>
              )}
              {job_location && (
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{job_location}</span>
                </div>
              )}
              {salaryRange && (
                <div className="flex items-center gap-1">
                  <DollarSign size={14} />
                  <span className="font-medium">{salaryRange}</span>
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {truncateDescription(job_description)}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{formatPostedDate()}</span>
              </div>
              {postedBy && (
                <div className="flex items-center gap-1">
                  <User size={12} />
                  <span>Posted by {postedBy.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-secondary text-secondary-foreground font-bold text-lg border">
              {companyName.charAt(0).toUpperCase()}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmarkClick}
              disabled={isFavouriting}
              className={`h-8 w-8 rounded-full transition-colors ${
                isBookmarked
                  ? 'text-primary bg-accent hover:bg-accent/80'
                  : 'hover:bg-accent'
              }`}
            >
              {isBookmarked ? (
                <BookMarked size={16} />
              ) : (
                <Bookmark size={16} />
              )}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex gap-2">
            {/* Apply Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                {isApplied ? (
                  <Button variant="outline" size="sm" disabled className="text-green-600 border-green-600">
                    Applied ✓
                  </Button>
                ) : (
                  <Button size="sm">Apply</Button>
                )}
              </DialogTrigger>

              {!isApplied && (
                <DialogContent className="flex h-96 w-full max-w-md flex-col items-center justify-center gap-6 mx-auto">
                  <DialogTitle className="text-2xl font-semibold text-center">
                    Apply Here
                  </DialogTitle>

                  <div className="w-full">
                    <label className="text-sm font-medium">Resume (Text or Link)</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      placeholder="Enter resume text or link"
                      value={resume}
                      onChange={(e) => setResume(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <label className="text-sm font-medium">Cover Letter</label>
                    <textarea
                      className="w-full mt-1 p-2 border rounded-md text-sm"
                      rows={4}
                      placeholder="Write your cover letter..."
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                    />
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleApply}
                    disabled={!resume || !coverLetter || isApplying}
                  >
                    {isApplying ? 'Applying...' : 'Apply'}
                  </Button>
                </DialogContent>
              )}
            </Dialog>

            {/* View Details */}
            <Link href={`/seeker/job/${id}`}>
              <Button variant="outline" size="sm">
                <ExternalLink size={14} className="mr-1" />
                View Details
              </Button>
            </Link>
          </div>
          <div className="text-xs text-muted-foreground">ID: {id.slice(-8)}</div>
        </div>
      </CardContent>
    </Card>
  )
}

export default JobCard