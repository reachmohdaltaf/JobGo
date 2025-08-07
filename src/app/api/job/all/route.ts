import { getAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// src/app/api/jobs/route.ts
export const GET = async (req: NextRequest) => {
  try {
    const user = await getAuth();
    
    console.log("🔍 Current authenticated user:", user); // Debug log
    
    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // First, let's check all applications for this user
    const userApplications = await prisma.application.findMany({
      where: {
        userId: user.id
      },
      select: {
        id: true,
        jobId: true,
        userId: true
      }
    });
    
    console.log("🔍 User applications:", userApplications); // Debug log

    const jobs = await prisma.job.findMany({
      include: {
        company: true,
        postedBy: true,
        applications: {
          where: {
            userId: user.id
          },
          select: {
            id: true,
            userId: true,
            jobId: true
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const jobsWithApplicationStatus = jobs.map(job => {
      const hasApplied = job.applications.length > 0;
      
      // Debug log for specific job
    
      return {
        ...job,
        hasApplied
      };
    });

    return NextResponse.json(jobsWithApplicationStatus);
  } catch (error) {
    console.log("❌ Fetch All Jobs Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
};