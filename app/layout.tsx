import type { Metadata } from "next";
import { Inter, Caveat, Oooh_Baby, Dynalight, Akaya_Telivigala, Akronim, Lavishly_Yours } from "next/font/google";
import "./theme-config.css";
import { Box, Theme } from "@radix-ui/themes";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import React from "react";
import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";
import QueryClientProvider from "./QueryClientProvider";
import { ChakraProvider } from "@chakra-ui/react";
import TopBackgroundBox from "./TopBackgroundBox";
import DrawerButton from "./DrawerButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const dynalight = Dynalight({
  subsets: ["latin"],
  variable: '--font-dynalight',
  weight: "400"
});


const metadata: Metadata = {
  title: "Fix Flow",
  description: "An issue tracker app",
};

export default function RootLayout({
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
                  <NavBar />
                  <main className="flex-grow relative z-10 w-full">
                    <DrawerButton />
                    <Box className="m-24">{children}</Box>
                  </main>
                </div>
                {/* <ThemePanel /> */}
              </Theme>
            </ChakraProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
