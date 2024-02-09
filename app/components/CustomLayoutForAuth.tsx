import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "@/app/theme-config.css";
import { Box, Theme } from "@radix-ui/themes";
import "@/app/globals.css";
import React from "react";
import AuthProvider from "@/app/auth/Provider";
import QueryClientProvider from "@/app/QueryClientProvider";
import { ChakraProvider } from '@chakra-ui/react'
import TopBackgroundBox from "@/app/TopBackgroundBox";
import DrawerButton from "@/app/DrawerButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Fix Flow",
  description: "An issue tracker app",
};

export default function CustomLayoutForAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
          <ChakraProvider>
            <Theme accentColor="gray">
              <div className="flex min-h-screen bg-neutral-100">
                <TopBackgroundBox />
                <main className="flex-grow p-5 relative z-10">
                <DrawerButton />
                  <Box className="m-24">{children}</Box>
                </main>
              </div>
            </Theme>
            </ChakraProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
