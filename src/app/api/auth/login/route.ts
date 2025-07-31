import { NextRequest } from "next/server";

export const POST = async (req: NextRequest)=>{
    const {email, password} = await req.json()
    return new Response(JSON.stringify({email, password}))
}