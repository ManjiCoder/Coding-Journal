"use client";
import React, { useContext, useState } from "react";
import BrandHead from "../BrandHead";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MenuUI from "../MenuUI";
import { Menu } from "@headlessui/react";
import { FaUserCircle, FaUserPlus } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import NoteContext from "@/context/notes/NoteContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

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
    {
      name: "Login",
      href: "/login",
      current: pathname === "/login" ? true : false,
    },
  ];

  return (
    <header className="bg-slate-800">
      <nav className={`flex items-center px-3 py-4 lg:py-2.5 flex-1 `}>
        <button
          className="md:hidden text-white mr-3 text-2xl"
          onClick={toggleNav}
        >
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
        <div className="px-5 flex-grow  md:flex-grow-0 text-center text-2xl">
          <BrandHead />
        </div>
        {/* Desktop */}
        <ul className={`hidden text-white md:flex md:flex-1 space-x-2`}>
          {navigation.map(({ name, href, current }) => (
            <Link href={href} key={href}>
              <li
                className={`py-1.5 px-7 font-medium rounded-md hover:bg-slate-900 ${
                  current && "bg-slate-900 shadow-md "
                }`}
              >
                {name}
              </li>
            </Link>
          ))}
        </ul>
        {!localStorage.getItem("token") ? (
          <Link
            href="/login"
            className="bg-blue-600 px-2 py-1.5 rounded-md font-medium text-white"
          >
            Login
          </Link>
        ) : (
          <MenuUI
            parent={
              <Menu.Button className="w-9 h-9 flex justify-center items-center bg-indigo-100 ring-yellow-500 rounded-full shadow-md hover:ring-4 focus:ring-4 font-medium">
                {JSON.parse(localStorage.getItem("user")).name[0]}
              </Menu.Button>
            }
          >
            <MenuItems />
          </MenuUI>
        )}

        <button
          className="ml-5 w-7 h-7 flex justify-center items-center bg-white ring-yellow-500 rounded-full shadow-md hover:ring-2 focus:ring-2 font-medium"
          onClick={() => setIsDark(!isDark)}
        >
          {!isDark ? <BsSunFill /> : <BsFillMoonStarsFill />}
        </button>
      </nav>
      {/* Moblie */}
      <ul
        className={`absolute top-16 pt-10 px-7 w-full md:hidden text-white text-xl flex flex-col gap-4 bg-slate-900 min-h-screen transform transition-transform duration-200 ease-out overflow-hidden
          ${isOpen ? "translate-x-0" : " -translate-x-full"}`}
        onClick={(e) => {
          if (e.target.tagName === "LI") {
            setIsOpen(!isOpen);
          }
        }}
      >
        {navigation.map(({ name, href, current }) => (
          <Link href={href} key={href}>
            <li
              className={`p-2 px-7 font-medium rounded-md ${
                current && "bg-slate-800 shadow-md "
              }`}
            >
              {name}
            </li>
          </Link>
        ))}
      </ul>
    </header>
  );
};

export default Navbar;

const MenuItems = () => {
  const { setShowToast } = useContext(NoteContext);
  const router = useRouter();
  const option = [
    {
      icons: <FaUserCircle />,
      name: "Username",
    },
    {
      icons: <FaUserPlus />,
      name: "Add Friends",
    },
    {
      icons: <IoMdLogOut />,
      name: "Logout",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/login");
    setShowToast(toast.success("Logout Successfully"));
  };
  return (
    <>
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${
              active ? "bg-slate-800 text-white" : "text-gray-900"
            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
          >
            <span className="mr-2">{option[0].icons}</span>
            <span className={`${active ? " text-white" : "text-gray-900"} `}>
              {option[0].name}
            </span>
          </button>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <Link
            href="/add-friend"
            className={`${
              active ? "bg-slate-800 text-white" : "text-gray-900"
            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
          >
            <span className="mr-2">{option[1].icons}</span>
            <span className={`${active ? " text-white" : "text-gray-900"} `}>
              {option[1].name}
            </span>
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${
              active ? "bg-slate-800 text-white" : "text-gray-900"
            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            onClick={handleLogout}
          >
            <span className="mr-2">{option[2].icons}</span>
            <span className={`${active ? " text-white" : "text-gray-900"} `}>
              {option[2].name}
            </span>
          </button>
        )}
      </Menu.Item>
    </>
  );
};

export { MenuItems };
