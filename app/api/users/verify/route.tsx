import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tokenType = searchParams.get("type");
    const userVerifyToken = searchParams.get("token");
    const baseUrl = process.env.NEXTAUTH_URL;

    if (tokenType === "emailValidation") {
      const user = await prisma.user.findUnique({
        where: { verifyToken: userVerifyToken || undefined },
      });
      if (!user)
        return NextResponse.json(
          { error: "Please register your acount first." },
          { status: 400 }
        );

      const verifiedUser = await prisma.user.update({
        where: { verifyToken: userVerifyToken! },
        data: {
          active: true,
          verifyToken: undefined,
          verifyTokenExpiry: undefined,
        },
      });

    

      return NextResponse.redirect(new URL("/", baseUrl));
    }

    if(tokenType === 'forgotPassword') {
        const user = await prisma.user.findUnique({
            where: { forgotPasswordToken: userVerifyToken || undefined },
          });
          if (!user)
            return NextResponse.json(
              { error: "User not found" },
              { status: 400 }
            );

            const resetPasswordUrl = `${baseUrl}/auth/reset?token=${userVerifyToken}&verified=true`

            return NextResponse.redirect(resetPasswordUrl);

    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
