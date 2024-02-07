import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { patchIssueSchema } from "@/app/validationSchemas";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";


export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Secure API end point to prohibit unauthorized actions
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });

  //Make sure the user input is valid
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  //Make sure the assigned user is valid
  const { assignedToUserId, title, description, status, severity } = body;
  if (assignedToUserId) {
    const assignedUser = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!assignedUser)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
  }

  //Make sure the client is updating a valid issue
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json(
      { error: "Issue does not exists." },
      { status: 404 }
    );

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      title,
      description,
      status,
      severity,
      assignedToUserId
    },
  });
  return NextResponse.json({ updatedIssue }, {status: 201});
}



export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Secure API end point to prohibit unauthorized actions
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json(
      { error: "Issue does not exists." },
      { status: 404 }
    );

  await prisma.issue.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json({}, { status: 201 });
}
