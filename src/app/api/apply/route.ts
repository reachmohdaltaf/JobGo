import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwtToken } from "@/lib/jwt";

export const POST = async (req: NextRequest) => {
  try {
    const { jobId, coverLetter } = await req.json();

    if (!jobId) {
      return new NextResponse("Job ID is required", { status: 400 });
    }

    // 1. Get user from cookie token
    const token = cookies().get("token")?.value;
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const decoded = verifyJwtToken(token);
    if (!decoded) {
      return new NextResponse("Invalid token", { status: 403 });
    }

    // 2. Check if job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return new NextResponse("Job not found", { status: 404 });
    }

    // 3. Check if already applied
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId,
        userId: decoded.id,
      },
    });

    if (existingApplication) {
      return new NextResponse("You have already applied to this job", {
        status: 400,
      });
    }

    // 4. Create the application
    const application = await prisma.application.create({
      data: {
        jobId,
        userId: decoded.id,
        coverLetter,
      },
    });

    return NextResponse.json({
      message: "Application submitted successfully",
      application,
    }, { status: 201 });
  } catch (error) {
    console.error("Apply Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
