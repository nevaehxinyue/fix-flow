import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
  const comments = await prisma.comment.findMany({
    where: { belongedToIssueId: parseInt(params.id) },
    include: { createdBy: true },
  });

  return NextResponse.json(comments, { status: 200 });
}
