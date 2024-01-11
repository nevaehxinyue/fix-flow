import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
    const links = [
        {label: "Dashboard", href: "/dashboard"},
        {label: "Issues", href: "/issues"}
    ];

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center '>
        <Link href="/"><AiFillBug /></Link>
        {links.map((link) => <Link key={link.label} href={link.href} className='text-zinc-400 hover:text-zinc-800 transition-colors'>{link.label}</Link>)}
    </nav>
  )
}

export default NavBar
