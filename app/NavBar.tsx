"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues/list" },
  ];

  const pathname = usePathname();

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center ">
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
    </nav>
  );
};

export default NavBar;
