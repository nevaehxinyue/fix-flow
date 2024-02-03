import bcryptjs from "bcryptjs";
import prisma from "@/prisma/client";
import nodemailer, { TransportOptions } from "nodemailer";
import VerificationEmail from "@/app/components/VerificationEmail";
import { render } from "@react-email/render";
import ResetPasswordEmail from "@/app/components/ResetPasswordEmail";

interface Props {
  emailAddress: string;
  emailType: "emailValidation" | "forgotPassword";
  userId: string;
}

export default async function sendEmails({
  emailAddress,
  emailType,
  userId,
}: Props) {
  try {
    const hashedToken = await bcryptjs.hash(userId, 10);
    const tokeExpiry = new Date();
    tokeExpiry.setHours(tokeExpiry.getHours() + 5);

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST as string,
      port: process.env.EMAIL_SERVER_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    } as TransportOptions);
    const verifyLink = `${process.env.NEXTAUTH_URL}/api/users/verify?type=${emailType}&token=${hashedToken}`;

    

    if (emailType === "emailValidation") {
      // Update the registerd user's verify token and its expiry
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          verifyToken: hashedToken,
          verifyTokenExpiry: tokeExpiry,
        },
      });

      // Send verification email

      const emailHtml = render(VerificationEmail({ verifyLink: verifyLink }), {
        pretty: true,
      });

      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: emailAddress,
        subject: "FixFlow- Verify your email",
        html: emailHtml,
      };

      const emailSendInfo = await transporter.sendMail(mailOptions);

      return emailSendInfo;
    }

    if (emailType === "forgotPassword") {
      // Update the user's  forgotPassword verify token and its expiry
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: tokeExpiry,
        },
      });

      //Send reset password email
  
      const emailHtml = render(ResetPasswordEmail({ resetLink: verifyLink, userName: updatedUser.name }), {
        pretty: true,
      });

      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: emailAddress,
        subject: "FixFlow- Reset your password",
        html: emailHtml,
      };

      const emailSendInfo = await transporter.sendMail(mailOptions);

      return emailSendInfo;
    }
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
