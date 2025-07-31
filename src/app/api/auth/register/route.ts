import { signJwtToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest)=>{
    const {name, email , password} = await req.json()
   try {
     if(!name || !email || !password){
        return new Response("Missing credentials", {status: 400})
    }
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if(existingUser){
        return new Response("User already exists", {status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user =  await prisma.user.create({
        data: {
         name,
        email,
        password: hashedPassword
        }
    })

  const token = signJwtToken({
    id: user.id,
    email: user.email
  })

  if (!token) {
  return new NextResponse("Token generation failed", { status: 500 });
}
const cookieStore = await cookies(); 
cookieStore.set("token", token, {
  httpOnly: true,
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
});




    const {password: _, ...userWithoutPassword} = user;
      return new Response(JSON.stringify({
        message: "User created successfully",
        user: userWithoutPassword
      }), {

      status: 201,
    });
   } catch (error) {
    console.log(error)
    return new Response("Internal Server Error", {status: 500})
   }
}