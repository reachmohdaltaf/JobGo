import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Pure GET for all jobs (no filter)
export const GET = async () => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        postedBy: {
          select: { id: true, name: true },
        },
        applications: true,
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching all jobs:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
