'use client'

import Image from "next/image"
import Link from "next/link"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Search, MapPin, Building } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/getUser"

interface Job {
  id: string
  job_title: string
  employer_name: string
  job_location?: string
  job_employment_type_text?: string
}

const SeekerNavbar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Job[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
const { data: user, isLoading: userLoading, error } = useUser()
  console.log(user)
  // Debounce search
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        searchJobs(searchQuery)
      } else {
        setSearchResults([])
        setShowDropdown(false)
      }
    }, 300)

    return () => clearTimeout(delayedSearch)
  }, [searchQuery])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const searchJobs = async (query: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/job?q=${encodeURIComponent(query)}`)
      if (response.ok) {
        const jobs = await response.json()
        setSearchResults(jobs.slice(0, 6)) // Limit to 6 results for dropdown
        setShowDropdown(jobs.length > 0)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowDropdown(false)
    }
  }

  const handleJobClick = (job: Job) => {
    setSearchQuery(job.job_title)
    setShowDropdown(false)
    router.push(`/search?q=${encodeURIComponent(job.job_title)}`)
  }

  const handleViewAllResults = () => {
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    setShowDropdown(false)
  }

  return (
    <div className="flex px-2 md:px-0 items-center bg-white h-18 justify-between">
      <div className="items-center gap-8 flex">
        <Link href={'/seeker/dashboard'}> 
          <Image 
            src="/logo.png"
            alt="logo"
            width={140}
            height={140}
          />
        </Link>
        <ul className="md:flex hidden gap-6 items-center">
          <Link href={'/'} className="text-[16px]">Jobs</Link>
          <Link href={'/'} className="text-[16px]">Companies</Link>
          <Link href={'/'} className="text-[16px]">Services</Link>
        </ul>
      </div>
    
      {/* Search with Dropdown */}
      <div ref={searchRef} className="relative hidden max-w-[400px] w-92 lg:flex items-center">
        <form onSubmit={handleSearchSubmit} className="search flex items-center border rounded-3xl w-full">
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.length > 2 && searchResults.length > 0 && setShowDropdown(true)}
            className="w-full shadow-none outline-none border-none rounded-2xl" 
            placeholder="Search jobs, companies..." 
          />
          <Button type="submit" className="rounded-full px-0" size={'sm'}>
            <Search/>
          </Button>
        </form>

        {/* Search Dropdown */}
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-2 text-sm">Searching...</p>
              </div>
            ) : (
              <>
                {searchResults.map((job) => (
                  <div 
                    key={job.id}
                    onClick={() => handleJobClick(job)}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                          {job.job_title}
                        </h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            <span className="line-clamp-1">{job.employer_name}</span>
                          </div>
                          {job.job_location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{job.job_location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {job.job_employment_type_text && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                          {job.job_employment_type_text}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                
                {searchResults.length > 0 && (
                  <div className="p-3 border-t border-gray-200 bg-gray-50">
                    <button 
                      onClick={handleViewAllResults}
                      className="w-full text-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                    >
                      View all results for "{searchQuery}"
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    
    <div className="buttons gap-2 flex items-center">
  {!user ? (
    <>
      <Link href={'/login'}>
        <Button className="font-bold" variant={'outline'}>Login</Button>
      </Link> 
      <Link href={'/register'}>
        <Button variant={'destructive'}>Register</Button>
      </Link>
    </>
  ) : (
    <div className="w-9 h-9 bg-gray-800 text-white rounded-full flex items-center justify-center font-semibold text-sm uppercase">
      {user.name?.charAt(0)}
    </div>
  )}

  <div className="select hidden lg:flex">
    <Link href={'/employer/dashboard'}> 
      <Button variant={"link"}>Post a job</Button> 
    </Link>
  </div>

      </div>
    </div>
  )
}

export default SeekerNavbar