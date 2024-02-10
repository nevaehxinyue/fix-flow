import { userProfileUpdateSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import authOptions from "@/app/auth/authOptions";
import bcryptjs from "bcryptjs";

//Fetch indiviudal user
export async function GET(request: NextRequest) {
  //Protect the API endpoint
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Update user profile
export async function PATCH(request: NextRequest) {
  //Protect the API endpoint
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
  console.log(session.user.id);

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
  
  //hash the user password
  let hashedPassword = null;
  if (password != undefined) {
    const salt = await bcryptjs.genSalt(10);
    hashedPassword = await bcryptjs.hash(password, salt);
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        password: hashedPassword
      },
    });
    console.log(`updatedUser: ${updatedUser}`);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
