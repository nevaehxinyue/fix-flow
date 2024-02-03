import { emailSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import  prisma from "@/prisma/client"
import sendEmails from "@/utils/sendEmails";

export async function POST (request: NextRequest) {
    const body = await request.json();
    //Validate the request 
    const validation = emailSchema.safeParse(body);
    if(!validation.success) return NextResponse.json({error: "Invalid email."}, {status: 400});

    //Check if the user exists
    const user  = await prisma.user.findUnique({
        where: {email: body.email}
    })
    if(!user) return NextResponse.json({error: "User not found"}, {status: 400});

    //Send forgotPassword email to user
    sendEmails({emailAddress: body.email, emailType: "forgotPassword", userId: user.id});

    return NextResponse.json(user, {status: 201})



}