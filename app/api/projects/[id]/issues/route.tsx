import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
    //Secure the API endpoint
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({error: "Unauthorized request."}, {status: 401});
    console.log(`projectId: ${params.id}`)
    try{
        const projectIssues = await prisma.issue.findMany({
            where: {projectId: parseFloat(params.id)}
        })
        return NextResponse.json(projectIssues, {status:200});

    }catch(error: any){
        return NextResponse.json({error: error.message}, {status: 400})
    }
   

}