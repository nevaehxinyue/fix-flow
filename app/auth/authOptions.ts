import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/prisma/client";
import { AuthOptions, Session, User } from "next-auth";
import EmailProvider, { EmailConfig } from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { customEmailProviderEmail } from "@/utils/customEmailProviderEmail";
import { JWT } from "next-auth/jwt";

const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify",
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
      sendVerificationRequest({ identifier, url, provider, theme }) {
        customEmailProviderEmail({ identifier, url, provider });
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text",},
        password: { label: "Password", type: "password"} ,
      },
      async authorize(credentials, req) {
        const formEmail = credentials?.email;
        const formPassword = credentials?.password!;
        console.log(`formEmail: ${formEmail}`)
        console.log(`formPassword: ${formEmail}`)

        const user = await prisma.user.findUnique({
          where: { email: formEmail },
        });
        console.log(`user: ${user}`)

        if (!user) return null;
        if (!user.password) return null;

        const isValidPassword = await bcryptjs.compare(
          formPassword,
          user.password
        );
        if (!isValidPassword) return null;

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {

    async jwt({ user, token }: { user: User; token: JWT }) {
      if (user) {
        token.uid = user.id!;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token?: JWT }) {
      if (session.user && token?.uid) {
        session.user.id = token.uid as string;
      }
      return session;
    },
  },
};

export default authOptions;
