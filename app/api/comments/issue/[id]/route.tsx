import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { commentSchema } from "@/app/validationSchemas";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const comments = await prisma.comment.findMany({
    where: { belongedToIssueId: parseInt(params.id) },
    include: { createdBy: true },
  });

  return NextResponse.json(comments, { status: 200 });
}

export async function POST(request: NextRequest, {params}: { params:{id: string} }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const body = await request.json();
  const validation = commentSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
    console.log(body.belongedToIssueId)
  const newComment = await prisma.comment.create({
    data: {
      content: body.content,
      createdByUserId: session.user.id,
      belongedToIssueId: parseInt(params.id)
    },
  });

  return NextResponse.json({ newComment }, { status: 201 });
}
