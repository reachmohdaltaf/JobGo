import { getAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req:NextRequest)=>{
    try {
        const user = await getAuth()
        if(!user?.id){
            return NextResponse.json({error: "unauthorized"},{status: 401})
        }
        const {name, email, password} = await req.json()
        if(!name || !email || !password){
            return NextResponse.json({message: "All Fiels are required to create company" }, {status: 400})
        }
        const existing = await prisma.company.findUnique({
            where: {
                email
            }
        })
        if(existing){
            return NextResponse.json({error: "company already exist"}, {status: 500})
        }

        const company = await prisma.company.create({
            data:{
                name,
                email,
                password,
                ownerId: user.id
            }
        })

    return NextResponse.json({
        message: "company create successfully",
        company: {
            id: company.id,
            name: company.name,
            email: company.email,
            createdAt: company.createdAt
        }
    },{status: 201})

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "error"}, {status: 500})
    }
}