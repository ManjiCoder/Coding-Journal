"use client";
import React, { useState } from "react";
import BrandHead from "../BrandHead";
import { FaBars } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const navigation = [
    { name: "Home", href: "/", current: pathname === "/" ? true : false },
    { name: "Add", href: "/add", current: pathname === "/add" ? true : false },
    {
      name: "About",
      href: "/about",
      current: pathname === "/about" ? true : false,
    },
    {
      name: "Contact",
      href: "/contact",
      current: pathname === "/contact" ? true : false,
    },
  ];
  return (
    <header className="bg-slate-800">
      <nav className={`flex items-center px-3 py-4 flex-1 `}>
        {isOpen ? (
          <AiOutlineCloseCircle
            onClick={toggleNav}
            className="md:hidden text-white mr-3 text-xl"
          />
        ) : (
          <FaBars
            className="md:hidden text-white mr-3 text-xl"
            onClick={toggleNav}
          />
        )}
        <div className="px-5 flex-grow  md:flex-grow-0 text-center text-2xl">
          <BrandHead />
        </div>
        <ul className={`hidden text-white md:flex md:flex-1`}>
          {navigation.map(({ name, href }) => (
            <li
              className="hover:bg-slate-900 rounded-md p-2 px-5 mx-3 font-medium"
              key={href}
            >
              {name}
            </li>
          ))}
        </ul>
        <Link
          href="/login"
          className="bg-blue-600 px-2 py-1.5 rounded-md font-medium text-white"
        >
          Login
        </Link>
      </nav>
      {isOpen && (
        <ul
          className={`absolute top-16 pt-10 w-full text-white text-xl flex flex-col gap-4 bg-slate-900 min-h-screen ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-[translate] duration-1000`}
        >
          {navigation.map(({ name, href }) => (
            <li className="p-2 px-7 font-medium" key={href}>
              {name}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
