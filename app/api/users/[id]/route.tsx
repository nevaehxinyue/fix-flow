import { userProfileUpdateSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //Protect the route
  const session = getServerSession();
  if (!session)
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );

  //Validate the request
  const body = await request.json();
  const validation = userProfileUpdateSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: "User information is valid." },
      { status: 400 }
    );

  //Update the user information
  const { name, password } = body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: {
        name,
        password,
      },
    });
    return NextResponse.json({success: true}, {status: 201})
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
