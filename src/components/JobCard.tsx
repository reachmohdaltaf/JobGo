import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Bookmark, Briefcase, MapPin } from 'lucide-react'

const JobCard = ({ job }: { job: any }) => {
  const {
    job_title,
    employer_name,
    job_employment_type_text,
    job_location,
    job_description,
    job_posted_human_readable,
  } = job;

  return (
    <Card className="w-full cursor-pointer bg-white rounded-xl shadow-none hover:shadow-sm transition duration-300 border p-4">
      <div className="flex justify-between items-start">
        <div>
          <CardHeader className="px-0 py-0">
            <CardTitle className="text-lg font-semibold text-gray-900 hover:underline cursor-pointer">
              {job_title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              {employer_name}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 pt-2 space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Briefcase size={16} className="text-gray-500" />
              <span>{job_employment_type_text}</span>
              <span className="mx-1">|</span>
              <MapPin size={16} className="text-gray-500" />
              <span>{job_location}</span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {job_description}
            </p>
            <p className="text-xs text-gray-400">{job_posted_human_readable}</p>
          </CardContent>
        </div>

        <div className="flex flex-col items-center justify-between h-full">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-100 text-yellow-600 font-semibold">
            {employer_name?.charAt(0)}
          </div>
          <Bookmark size={18} className="text-gray-400 mt-4 cursor-pointer" />
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
