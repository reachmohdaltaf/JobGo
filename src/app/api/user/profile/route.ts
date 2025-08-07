import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Get authenticated user info (from token)
    const decoded = await getAuth(); // Assume it returns { id: string }

    if (!decoded || !decoded.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find user in DB
  // Inside GET
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
    bio: true, // ✅ ADD THIS
  },
});


    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in /api/user/profile:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}


export const PUT = async (req: NextRequest)=>{
  try {
    const user = await getAuth()
    if(!user){
      return NextResponse.json({error: "unauthorized"}, {status: 401})
    }
    const {name, email, bio} = await req.json()

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        name,
        email,
        bio
      }
    })
    return NextResponse.json(updatedUser)

  } catch (error) {
    console.log(error)
    return NextResponse.json({error: "Something went wrong"}, {status: 500})
  }
}