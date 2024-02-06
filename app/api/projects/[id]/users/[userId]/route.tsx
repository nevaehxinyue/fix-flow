import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function DELETE(request: NextRequest, {params}: {params: {id: string; userId: string}}){
    //Secure API endpoint
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({error: "Unauthorized request. "}, { status: 401 });

  try {
    await prisma.projecOftUsers.delete({
      where: {projectId_userId: {
        projectId: parseInt(params.id),
        userId: params.userId
      }}
    })
    return NextResponse.json({success: true}, {status: 201})

  }catch(error:any){
    return NextResponse.json({error: error.message}, {status: 400})
  }

}