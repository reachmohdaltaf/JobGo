import { getAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// src/app/api/application/applied/route.ts
export const GET = async (req: NextRequest) => {
  try {
    const user = await getAuth();
    if (!user?.id)
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const application = await prisma.application.findMany({
      where: { userId: user.id },
      include: {
        job: true, // ✅ get full job data
      },
    });

    const jobs = application.map((a) => a.job); // ✅ job list
    return NextResponse.json(jobs, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
};
