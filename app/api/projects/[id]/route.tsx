import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { patchProjectSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const body = await request.json();
  const validation = patchProjectSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { title, description, status } = body;

  const updatedProject = await prisma.project.update({
    where: { id: parseInt(params.id) },
    data: {
      title,
      description,
      status,
    },
  });
  return NextResponse.json({ updatedProject }, { status: 201 });
}

export async function DELETE(request: NextRequest, {params}: {params: {id: string}}){
    //Secure the API
      const session = await getServerSession(authOptions);
      if (!session)
        return NextResponse.json({ message: "Unauthorized request" }, { status: 401 });
    
     console.log(params.id)
    
        try {
            await prisma.project.delete({
                where: {id: parseInt(params.id) }
            })
            return NextResponse.json({success: true}, {status: 201})
        }catch(error: any){
            return NextResponse.json({error: error.message}, {status: 400});
        }
    
    };
