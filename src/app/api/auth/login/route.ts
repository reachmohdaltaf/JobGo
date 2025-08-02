import { signAccessToken, signRefreshToken } from "@/lib/jwt";
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

    const accessToken = signAccessToken({id: user.id, email: user.email})
    const refreshToken = signRefreshToken({id: user.id})

    const cookieStore = cookies();
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7
    })

    return NextResponse.json({
      message: "Login Successfull",
      accessToken,
      user:{
        id: user.id,
        email: user.email,
        name: user.name
      }
    })

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
