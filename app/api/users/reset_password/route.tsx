import prisma from "@/prisma/client"
import bcryptjs from "bcryptjs"
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {
    const { verifyToken, password } = await request.json();
    if(!verifyToken || !password) {
        return NextResponse.json({ error: "Verify token or password is missing. "}, {status: 400})
    } 
    
    // Check if the user exists
    const user = await prisma.user.findUnique({
        where: {forgotPasswordToken: verifyToken}
    })

    if (!user) return NextResponse.json({ error: "User not found"}, {status: 400});

    //Update the new password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const updatedUser = await prisma.user.update({
        where: {forgotPasswordToken: verifyToken},
        data: {
            password: hashedPassword,
            forgotPasswordToken: undefined,
            forgotPasswordTokenExpiry: undefined,

        }
    })
    // if(updatedUser) return NextResponse.redirect('/auth/login')

    return NextResponse.json({ success: true, message: "User password reset successfully!"}, {status: 201})


}