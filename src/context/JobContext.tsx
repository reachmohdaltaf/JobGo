'use client'
import { useEffect, useState } from "react";
import { createContext } from "react";
import {data} from '../json/data'

type job ={
    job_id: string
    employer_name: string
    job_title: string
    job_location: string
    job_description: string
}

export const JobContext = createContext<any>(null)

export const JobProvider = ({children}:{children : React.ReactNode})=>{
        const destructuredJobs = data[0]?.data || []

    const [jobs, setJobs] = useState<job[]>([])
    useEffect(()=>{
        setJobs(destructuredJobs)
    },[])
    console.log("data in context",data)
    return(
        <JobContext.Provider value={{jobs, setJobs}}>
            {children}
        </JobContext.Provider>
    )
}