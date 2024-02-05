import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const pathParts = request.nextUrl.pathname.split("/");
  const issueId = pathParts[pathParts.length - 1];

  const comments = await prisma.comment.findMany({
    where: { belongedToIssueId: parseInt(issueId) },
    include: { createdBy: true },
  });

  return NextResponse.json({ comments }, { status: 200 });
}
