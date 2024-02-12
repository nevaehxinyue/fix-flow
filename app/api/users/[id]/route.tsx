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

export async function DELETE (request: NextRequest, {params}: {params: {id: string}}) {
  //Protect the API endpoint
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );

    //Check if the user exists
    const user = await prisma.user.findUnique({
      where: {id: params.id}
    })
    if(!user) return NextResponse.json({error: "User not found."}, {status: 400});

    // Have to implement Cascading manually here because the foreign key constraints
    //have been removed from prisma models due to deployment to Vecerl by using PlanetScale
    // database which doesn't support foreign key constraints.
    try {await prisma.$transaction([
      prisma.account.deleteMany( {where: {userId: params.id}}),
      prisma.project.deleteMany( {where: {createdByUserId: params.id}}),
      prisma.issue.deleteMany({where: {createdByUserId: params.id}}),
      prisma.comment.deleteMany( {where: {createdByUserId: params.id}}),
      prisma.user.delete({where: {id: params.id}})
    ]);
  }catch(error: any) {
    return NextResponse.json({error: error.message}, {status: 400})
  }
  
    return NextResponse.json({success: true}, {status: 201});
}
