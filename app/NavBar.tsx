"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SiGhost } from "react-icons/si";
import classNames from "classnames";
import {
  Avatar,
  DropdownMenu,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "@/app/components";
import EditProfileButton from "./EditProfileButton";
import { useMenuDialogStore } from "./store";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiBugDroidBold } from "react-icons/pi";

const NavBar = () => {


  return (
    <nav className="w-60 relative flex flex-col flex-shrink-0 h-auto border-b px-5 py-4 bg-white gap-8 shadow-lg border-0">
        {/* <Flex justify="between" align="center" className="ml-24 mr-24 "> */}
          {/* <Flex gap="3" align="center"> */}
            <Link href="/">
              <Flex gap="3" align="center">
            <SiGhost size="38" />
            <Heading>Fix Flow</Heading>
            </Flex>
            </Link>
            <NavLinks />
          {/* </Flex> */}
          <AuthStatus />
        {/* </Flex>   */}
    </nav>
  );
};

const NavLinks = () => {
  const links = [
    { label: "Dashboard", href: "/" , icon: <LuLayoutDashboard />},
    { label: "Issues", href: "/issues/list", icon: <PiBugDroidBold /> },
  ];

  const pathname = usePathname();

  return (
    <ul className="flex space-x-5">
      <Flex direction="column" gap="5">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className={classNames({
              "nav-link": true,
              "!text-zinc-800": link.href === pathname,
            })}
          >
            <Heading size="4">
          <Flex align="center" gap="3">
           {link.icon} {link.label}
           </Flex>
            </Heading>
          </Link>
        </li>
      ))}
      </Flex>
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  const { isMenuOpen, setIsMenuOpen } = useMenuDialogStore();  

  if (status === "loading") return <Skeleton width="3rem"/>;
  
  return (
    <Flex gap="2">
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
      <Text size="3" className="font-semibold">{session?.user!.name}</Text>
    </Flex>
  );
};

export default NavBar;
