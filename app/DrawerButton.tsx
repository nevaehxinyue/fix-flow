'use client'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Link,
    Flex,
    Heading,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Center,
  } from '@chakra-ui/react'
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { SiGhost } from 'react-icons/si';
import classNames from "classnames";
import { LuLayoutDashboard } from 'react-icons/lu';
import { PiBugDroidBold } from 'react-icons/pi';
import { signOut, useSession } from 'next-auth/react';
import { Skeleton } from './components';
import { RiUser5Line } from "react-icons/ri";
import { Session } from 'next-auth';
import { IoMdLogOut } from "react-icons/io";


const DrawerButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { status, data: session } = useSession();
     if(status === 'unauthenticated' ) return null;
   
    if (status === "loading") return <Skeleton width="3rem"/>;

  return (
    <div className='ml-5 mt-5 w-60 xl:hidden '>
        <button type='button' className='text-white "' onClick={onOpen}>
        <SiGhost size="38" />
        </button>
        <Drawer 
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent >
            <DrawerCloseButton />
            <DrawerHeader></DrawerHeader>
            <DrawerBody>
            <div className="w-60 relative flex flex-col flex-shrink-0 h-auto px-5 py-4  gap-8 ">
            
            <Link _hover={{textDecoration: 'none'}} href="/">
            <Flex gap="3" align="center">
            <SiGhost size="38" />
            <Heading size='lg'>Fix Flow</Heading>
            </Flex>
            </Link>
            <NavLinks session={session} />
           
            </div>
            </DrawerBody>
            <DrawerFooter>
                <button className='text-3xl' onClick={() => {signOut({callbackUrl: '/'})}}>
                <IoMdLogOut />
                </button>

            </DrawerFooter>
                
            </DrawerContent>
        </Drawer>
      
    </div>
  )
}
const NavLinks = ({session}: {session: Session | null }) => {
  
    const links = [
      { label: "Dashboard", href: "/" , icon: <LuLayoutDashboard />},
      { label: "Issues", href: "/issues/list", icon: <PiBugDroidBold /> },
      { label: "Edit profile", href: `/users/${session?.user.id}/profile`, icon: <RiUser5Line />}
    ];
  
    const pathname = usePathname();
  
    return (
      <ul className="flex space-x-5">
        <Flex direction="column" gap="5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
            _hover={{color: 'gray.500', textDecoration: 'none'}}
              href={link.href}
              className={classNames({
                "nav-link": true,
                "!text-zinc-800": link.href === pathname,
              })}
            >
              <Heading size='md'>
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

export default DrawerButton
