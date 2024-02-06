import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; memberId: string } }
) {
  //Secure API endpoint
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { error: "Unauthorized request. " },
      { status: 401 }
    );

  //Check if the assigned member exists for the current project id
  const assignmentExists = await prisma.projecOftUsers.findUnique({
    where: {
      projectId_userId: {
        projectId: parseInt(params.id),
        userId: params.memberId,
      },
    },
  });

  if(!assignmentExists){
    return NextResponse.json({error: "Assigned User not found."}, {status: 400});
  }

  //Delete the assignment 
  try {
    await prisma.projecOftUsers.delete({
      where: {
        projectId_userId: {
          projectId: parseInt(params.id),
          userId: params.memberId,
        },
    }
  
  });
  return NextResponse.json({success: true}, {status: 201})

  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 400})
  }
  
}
