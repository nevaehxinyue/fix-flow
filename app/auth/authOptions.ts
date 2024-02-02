import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/prisma/client";
import { AuthOptions } from "next-auth";
import EmailProvider from 'next-auth/providers/email';
import nodemailer from 'nodemailer';


const authOptions: AuthOptions  = {
  pages: {
    signIn: "/auth/signin",
  },
    adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,

      })



       
    ],
    
    session: {
        strategy: 'jwt',
    }, 
  }

  export default authOptions;