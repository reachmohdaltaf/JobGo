import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  Bookmark, 
  BookmarkCheck,
  Briefcase, 
  MapPin, 
  DollarSign,
  Calendar,
  Building2,
  User,
  ExternalLink
} from 'lucide-react'

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
  onSave?: (jobId: string) => void
  onUnsave?: (jobId: string) => void
  isSaved?: boolean
  onJobClick?: (job: Job) => void
}

const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  onSave, 
  onUnsave, 
  isSaved = false,
  onJobClick 
}) => {
  const [isBookmarked, setIsBookmarked] = useState(isSaved)

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
  } = job

  // Get company name from company object or fallback to employer_name or postedBy name
  const companyName = company?.name || job.employer_name || postedBy?.name || 'Unknown Company'
  
  // Format salary range
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return null
    if (min && max) {
      return `$${min.toLocaleString()} - $${max.toLocaleString()}`
    }
    if (min) return `From $${min.toLocaleString()}`
    if (max) return `Up to $${max.toLocaleString()}`
    return null
  }

  // Format posted date
  const formatPostedDate = () => {
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

  // Truncate description
  const truncateDescription = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
  }

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    if (isBookmarked) {
      onUnsave?.(id)
    } else {
      onSave?.(id)
    }
    setIsBookmarked(!isBookmarked)
  }

  const handleCardClick = () => {
    onJobClick?.(job)
  }

  const salaryRange = formatSalary(salary_min, salary_max)

  return (
    <Card 
      className="w-full cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-gray-300 p-0 overflow-hidden"
      onClick={handleCardClick}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start gap-4">
          {/* Left Section */}
          <div className="flex-1 min-w-0 space-y-3">
            {/* Job Title and Company */}
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors cursor-pointer line-clamp-2">
                {job_title}
              </CardTitle>
              <div className="flex items-center gap-2 text-gray-600">
                <Building2 size={16} className="text-gray-400 flex-shrink-0" />
                <span className="font-medium">{companyName}</span>
              </div>
            </div>

            {/* Job Details */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {job_employment_type_text && (
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                  <Briefcase size={12} className="mr-1" />
                  {job_employment_type_text}
                </Badge>
              )}
              
              {job_location && (
                <div className="flex items-center gap-1">
                  <MapPin size={14} className="text-gray-400" />
                  <span>{job_location}</span>
                </div>
              )}

              {salaryRange && (
                <div className="flex items-center gap-1">
                  <DollarSign size={14} className="text-green-500" />
                  <span className="text-green-600 font-medium">{salaryRange}</span>
                </div>
              )}
            </div>

            {/* Job Description */}
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
              {truncateDescription(job_description)}
            </p>

            {/* Posted Date and Posted By */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar size={12} className="text-gray-400" />
                <span>{formatPostedDate()}</span>
              </div>
              
              {postedBy && (
                <div className="flex items-center gap-1">
                  <User size={12} className="text-gray-400" />
                  <span>Posted by {postedBy.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center gap-4 flex-shrink-0">
            {/* Company Avatar */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700 font-bold text-lg border border-gray-200">
              {companyName.charAt(0).toUpperCase()}
            </div>

            {/* Bookmark Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmarkClick}
              className={`h-8 w-8 rounded-full transition-colors ${
                isBookmarked 
                  ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              {isBookmarked ? (
                <BookmarkCheck size={16} className="fill-current" />
              ) : (
                <Bookmark size={16} />
              )}
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex gap-2">
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Apply Now
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink size={14} className="mr-1" />
              View Details
            </Button>
          </div>
          
          {/* Company info */}
          <div className="text-xs text-gray-500">
            ID: {id.slice(-8)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default JobCard