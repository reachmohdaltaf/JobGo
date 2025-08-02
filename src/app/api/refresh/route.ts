import { signAccessToken, verifyRefreshToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export const GET = async ()=>{
    try {
        const cookieStore = cookies();
        const refreshToken = cookieStore.get("refreshToken")?.value;
        if(!refreshToken){
            return NextResponse.json({error: "Refresh Token missing"}, {status: 401})
        }
        const payload = verifyRefreshToken(refreshToken);
        if(!payload){
            return NextResponse.json({error: "Invalid or Expired refresh token"},{status: 403})
        }

        const user = await prisma.user.findUnique({
            where: {id: payload.id}
        })

        if(!user){
            return NextResponse.json({error: "User Not found"}, {status: 404})
        }

        const newAccessToken = signAccessToken({id: user.id, email: user.email})
        return NextResponse.json({
            message: "new access token generated successfully",
            accesToken: newAccessToken,
            user:{
                id: user.id,
                email: user.email,
                name: user.name
            }
        })
    } catch (error) {
        console.log("Refresh token error",error)
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}