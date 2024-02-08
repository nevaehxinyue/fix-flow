import authOptions from "@/app/auth/authOptions";
import { commentSchema } from "@/app/validationSchemas";

import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, {params}: {params: {id: string}}) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: "Unauthorized request" },
      { status: 401 }
    );

    //Check if the comment exists
    const comment = await prisma.comment.findUnique({
        where: {id: parseInt(params.id)}
    })
    if(!comment) return NextResponse.json({error: 'Comment not found'}, {status: 400});

    await prisma.comment.delete({
        where: {id: parseInt(params.id)}
    })
    return NextResponse.json({success: true}, {status: 201});
}
