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
  const { userIds } = await request.json();
  console.log(userIds);

  if (!Array.isArray(userIds)) {
    return NextResponse.json(
      { error: "userIds must be an array" },
      { status: 400 }
    );
  }

  //Make sure the userId is string
  const allStrings = userIds.every((item) => typeof item === "string");
if(!allStrings) {
    return NextResponse.json(
        { error: "Every userId must be a string." },
        { status: 400 }
      );

}
  // Perform the database operation within a transaction when multiple updates are needed
  try {
    const result = await prisma.$transaction(
      userIds.map((userId) => {
        return prisma.projecOftUsers.create({
          data: {
            projectId: parseInt(params.id),
            userId: userId,
          },
        });
      })
    );
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

