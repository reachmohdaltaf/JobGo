import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwtToken } from "@/lib/jwt";

export const POST = async (req: NextRequest) => {
  try {
    const { title, description, company } = await req.json();

    const token = cookies().get("token")?.value;
   
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const decoded = verifyJwtToken(token);
    if (!decoded) {
      return new NextResponse("Invalid token", { status: 403 });
    }

    const job = await prisma.job.create({
      data: {
        title,
        description,
        company,
        postedById: decoded.id, // user ID from token
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
