import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Bookmark, Briefcase, MapPin } from 'lucide-react'

const JobCard = ({ title, company, experience, location, description, posted, initial }) => {
  return (
    <Card className=" w-full cursor-pointer bg-white rounded-xl shadow-none hover:shadow-sm  border p-4">
      <div className="flex justify-between items-start">
        <div>
          <CardHeader className="px-0 py-0">
            <CardTitle className="text-lg font-semibold text-gray-900 hover:underline cursor-pointer">{title}</CardTitle>
            <CardDescription className="text-sm text-gray-600">{company}</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pt-2 space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Briefcase size={16} className="text-gray-500" />
              <span>{experience}</span>
              <span className="mx-1">|</span>
              <MapPin size={16} className="text-gray-500" />
              <span>{location}</span>
            </div>
            <p className="text-sm text-gray-600">{description}</p>
            <p className="text-xs text-gray-400">{posted}</p>
          </CardContent>
        </div>

        <div className="flex flex-col items-center justify-between h-full">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-100 text-yellow-600 font-semibold">
            {initial}
          </div>
          <Bookmark size={18} className="text-gray-400 mt-4 cursor-pointer" />
        </div>
      </div>
    </Card>
  );
};


export default JobCard