"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SiGhost } from "react-icons/si";
import classNames from "classnames";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "@/app/components";
import axios from "axios";

const NavBar = () => {
  // const {data: session} = useSession();
  // if(!session?.user.name){
  //   const generatedUsername = session?.user.email?.split("@")[0];
  //   console.log(generatedUsername)
  //   try {
  //      axios.patch('/api/user/' + session?.user.id, {name: generatedUsername })
  //   }catch(error){
  //     console.log('Username cannot be generated')

  //   }
  // }
  return (
    <nav className="border-b mb-5 px-5 py-4 ">
      <Container>
        <Flex justify="between" align="center">
          <Flex gap="3" align="center">
            <Link href="/">
            <SiGhost size="22" />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  const pathname = usePathname();

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className={classNames({
              "nav-link": true,
              "!text-zinc-900": link.href === pathname,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem"/>;

  if (status === "unauthenticated")
    return (
      <Link href="/auth/signin" className="nav-link">
        Log in
      </Link>
    );

  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user!.image ? session.user!.image : '/user_avatar.svg'}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <button onClick={() => signOut({callbackUrl: "/"})}>Log out</button>
              {/* <Link href="/api/auth/signout">Log out</Link> */}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

export default NavBar;
