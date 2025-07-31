import { signJwtToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new NextResponse("sara kux bharde bhai mere", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new NextResponse("Invalid password", { status: 401 });
    }

    const token = signJwtToken({
      id: user.id,
      email: user.email,
    });

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );

    const cookieStore = await cookies();
    if (!token) {
  return new NextResponse("Token generation failed", { status: 500 });
}
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
