"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
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
import EditProfileButton from "./EditProfileButton";
import { useMenuDialogStore } from "./store";

const NavBar = () => {


  return (
    <nav className="border-b mb-5 px-5 py-4 bg-neutral-100">
  
        <Flex justify="between" align="center" className="ml-24 mr-24 ">
          <Flex gap="3" align="center">
            <Link href="/">
            <SiGhost size="22" />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
     
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
    <ul className="flex space-x-5">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className={classNames({
              "nav-link": true,
              "!text-zinc-800": link.href === pathname,
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

  const { isMenuOpen, setIsMenuOpen } = useMenuDialogStore();  

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
        <DropdownMenu.Root  open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenu.Trigger onClick={()=> setIsMenuOpen(true)}>
            <Avatar
              src={session.user!.image ? session.user!.image : '/user_avatar2.svg'}
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
              <button className="w-full flex justify-start" onClick={() => signOut({callbackUrl: "/"})}>Log out</button>
              {/* <Link href="/api/auth/signout">Log out</Link> */}
            </DropdownMenu.Item >
      
           <DropdownMenu.Item onSelect={(event) => event.preventDefault()}>
           
           <EditProfileButton />
           </DropdownMenu.Item>
           
            
          
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

export default NavBar;
