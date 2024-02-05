import authOptions from "@/app/auth/authOptions";
import { commentSchema } from "@/app/validationSchemas";

import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const body = await request.json();
  const validation = commentSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newComment = await prisma.comment.create({
    data: {
      content: body.content,
      createdBy: {
        connect: {
          id: body.createdByUserId,
        },
      },
      belongedToIssue: {
        connect: {
          id: parseInt(body.belongedToIssueId),
        },
      },
    },
  });

  return NextResponse.json({ newComment }, { status: 201 });
}
