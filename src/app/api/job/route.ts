
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@/lib/auth"; // ✅ new helper

export const POST = async (req: NextRequest) => {
  try {
    // ✅ Use helper to get user
    const user = await getAuth();

    const { title, description, company } = await req.json();

    if (!title || !description || !company) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const job = await prisma.job.create({
      data: {
        title,
        description,
        company,
        postedById: user.id, 
      },
    });

    return NextResponse.json(job, { status: 201 });

  } catch (error: any) {
    console.error("Error creating job:", error);
    const isAuthError = error.message.includes("Unauthenticated");
    return new NextResponse(error.message, { status: isAuthError ? 401 : 500 });
  }
};



export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title");
    const company = searchParams.get("company");
    const description = searchParams.get("description"); // ✅ fixed spelling
    const location = searchParams.get("location");

    const filter: any = {};

    if (title) {
      filter.title = {
        contains: title,
        mode: "insensitive",
      };
    }

    if (company) {
      filter.company = {
        contains: company,
        mode: "insensitive",
      };
    }

    if (location) {
      filter.location = {
        contains: location, // ✅ fixed capital L bug
        mode: "insensitive",
      };
    }

    if (description) {
      filter.description = {
        contains: description,
        mode: "insensitive",
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
    return new NextResponse("Internal Server Error ", { status: 500 });
  }
};

