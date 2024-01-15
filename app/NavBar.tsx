"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { Box, Container, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues/list" },
  ];

  const pathname = usePathname();

  const { status, data: session } = useSession();
  console.log(session);

  return (
    <nav className="border-b mb-5 px-5 py-4 ">
      <Container>
      <Flex justify="between">
        <Flex gap="3" align="center">
          <Link href="/">
            <AiFillBug />
          </Link>
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={classNames({
                "text-zinc-900": link.href === pathname,
                "text-zinc-500": link.href !== pathname,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          ))}
        </Flex>
        <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Log out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Sign in</Link>
        )}
      </Box>
      </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
