import { NextRequest, NextResponse } from "next/server";
import prisma  from "@/prisma/client";
import { userRegisterSchema} from "@/app/validationSchemas";
import bcryptjs from "bcryptjs";
import sendEmails from "@/utils/sendEmails"



export async function POST (request: NextRequest) {

    const body = await request.json();
    const validation = userRegisterSchema.safeParse(body);
    if(!validation.success) return NextResponse.json(validation.error.format(), {status: 400});

    const { name, email, password } =  body;

    //Check if the user exists
    const user = await prisma.user.findUnique({
        where: {email: email}
    })
    if(user) return NextResponse.json({error: 'This account exists. Please try log in.' }, {status: 400});

    //hash the user password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }

    })

    //Send validation email to user
    sendEmails({emailAddress: email, emailType: "emailValidation", userId: newUser.id})


    return NextResponse.json(newUser, {status: 201})
}