import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

  //Secure API endpoint
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({error: "Unauthorized request. "}, { status: 401 });

  //Check if the body strcuture is valid (an array is needed)
  const { memberEmail } = await request.json();

  // Check if the member exists
  const member = await prisma.user.findUnique({
    where: {email: memberEmail}
  })

  if(!member) {
    return NextResponse.json({error: 'Member does not exists.'}, {status: 400})
  }

  // Perform the database operation within a transaction when multiple updates are needed
  try {
    await prisma.projecOftUsers.create({
      data:{
        projectId: parseInt(params.id),
        userId: member.id
      }
    })
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

