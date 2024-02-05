import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { projectSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

// Get all projects belonging to the logged in user.
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const projects = await prisma.project.findMany({
    where: {
      OR: [
        { createdByUserId: session?.user?.id },
        {
          assignedToUsers: {
            some: {
              userId: session?.user?.id,
            },
          },
        },
      ],
    },
    include: {
      createdBy: true,
      assignedToUsers: {
        include: {
          user: true,
        },
      },
      issues: true,
    },
  });

  return NextResponse.json({ projects }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const body = await request.json();
  const validation = projectSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { title, description, createdByUserId } = body;
  const newProject = await prisma.project.create({
    data: {
      title,
      description,
      createdByUserId,
    },
  });

  return NextResponse.json({ newProject }, { status: 201 });
}
