// app/api/job/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

export const POST = async (req: NextRequest) => {
  try {
    const user = await getAuth();

    const {
      job_title,
      job_description,
      employer_name,
      job_location,
      job_employment_type_text,
      job_posted_human_readable
    } = await req.json();

    if (!job_title || !job_description || !employer_name) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
    }

    const job = await prisma.job.create({
      data: {
        job_title,
        job_description,
        employer_name,
        job_location,
        job_employment_type_text,
        job_posted_human_readable,
        postedById: user.id,
      },
    });

    return NextResponse.json(job, { status: 201 });

  } catch (error: any) {
    console.error("Error creating job:", error);
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    // Search parameters (from search bar)
    const q = searchParams.get("q"); // general search query
    const job_title = searchParams.get("job_title");
    const employer_name = searchParams.get("employer_name");
    const job_description = searchParams.get("job_description");

    // Filter parameters (from Filter component)
    const job_employment_types = searchParams.getAll("job_employment_type_text");
    const job_locations = searchParams.getAll("job_location");

    const filter: any = {};

    // Handle general search query
    if (q) {
      filter.OR = [
        {
          job_title: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          job_description: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          employer_name: {
            contains: q,
            mode: "insensitive",
          },
        },
      ];
    }

    // Handle specific field searches
    if (job_title) {
      filter.job_title = {
        contains: job_title,
        mode: "insensitive",
      };
    }

    if (employer_name) {
      filter.employer_name = {
        contains: employer_name,
        mode: "insensitive",
      };
    }

    if (job_description) {
      filter.job_description = {
        contains: job_description,
        mode: "insensitive",
      };
    }

    // Handle employment type filter
    if (job_employment_types.length > 0) {
      filter.job_employment_type_text = {
        in: job_employment_types,
      };
    }

    // Handle location filter
    if (job_locations.length > 0) {
      filter.job_location = {
        in: job_locations,
      };
    }

    const jobs = await prisma.job.findMany({
      where: filter,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        postedBy: {
          select: {
            id: true,
            name: true,
          },
        },
        applications: true,
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};