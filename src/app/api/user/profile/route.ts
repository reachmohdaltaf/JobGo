import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyJwtToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const token =  cookieStore.get("token")?.value;

    if (!token) {
      return new NextResponse("Unauthorized: No token", { status: 401 });
    }

    const decoded = verifyJwtToken(token); // Custom function to verify token
    if (!decoded) {
      return new NextResponse("Invalid token", { status: 403 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return new NextResponse("Server error", { status: 500 });
  }
}
