import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const GET = async ()=>{
    try {
        const companies = await prisma.company.findMany()
        return NextResponse.json(companies)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
}