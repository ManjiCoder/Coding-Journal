import React, { useEffect, useState } from "react";
import Link from "next/link";
import BrandHead from "./BrandHead";
import MenuUI from "./headlessUI/MenuUI";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "@headlessui/react";

import { AiOutlineClose, AiOutlineMenu, AiFillSetting } from "react-icons/ai";
// import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import { FaUserCircle, FaUserPlus } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { logOut } from "@/redux-slices/User";
import { toast } from "react-toastify";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isDark, setIsDark] = useState(false);

  const { isAuth, user } = useSelector((state) => state.user);
  const router = useRouter();
  const { pathname } = router;

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    let main = document.getElementById("main-container");
    if (main) {
      main.addEventListener("click", closeNav);
      return () => main.removeEventListener("click", closeNav);
    }
  }, [isOpen]);

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
      <nav
        className={`flex justify-between items-center px-3 py-4 lg:py-2.5 flex-1 `}
      >
        <button
          className="md:hidden text-white mr-3 text-2xl z-50"
          onClick={toggleNav}
        >
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
        <div
          className={`${
            isAuth ? "hidden sm:block sm:justify-end" : "block"
          }  px-5 flex-grow  md:flex-grow-0 text-center text-2xl`}
        >
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

        {isAuth && <SearchBar />}

        {/* UserIcon */}
        {!isAuth ? (
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
                {user.name[0]}
              </Menu.Button>
            }
          >
            <MenuItems />
          </MenuUI>
        )}

        {/* <button
          className="ml-5 w-7 h-7 flex justify-center items-center bg-white ring-yellow-500 rounded-full shadow-md hover:ring-2 focus:ring-2 font-medium"
          onClick={() => setIsDark(!isDark)}
        >
          {!isDark ? <BsSunFill /> : <BsFillMoonStarsFill />}
        </button> */}
      </nav>
      {/* Moblie */}
      {/* {isOpen &&
        createPortal( */}
      <ul
        className={`shadow-lg shadow-black fixed h-screen z-10 top-0 pt-16 px-7 w-3/4 max-w-xs md:hidden text-white text-xl flex flex-col gap-4 bg-slate-800 min-h-screen transform transition-transform duration-200 ease-out overflow-hidden
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
                current && "bg-slate-900"
              }`}
            >
              {name}
            </li>
          </Link>
        ))}
      </ul>
      {/* , // document.body // )} */}
    </header>
  );
};

export default Navbar;

const MenuItems = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const userLoginTime =
    new Date(user.updatedAt).toDateString() +
    ", " +
    new Date(user.updatedAt).toLocaleTimeString();

  const option = [
    {
      icons: <FaUserCircle />,
      name: "Welcome, " + user.name,
    },
    {
      icons: <FaUserPlus />,
      name: "Add Friends",
    },
    {
      icons: <IoMdLogOut />,
      name: "Logout",
    },
    {
      icons: <AiFillSetting />,
      name: "Setting",
    },
    {
      icons: null,
      name: `Last Login: ${userLoginTime}`,
    },
  ];

  const handleLogout = () => {
    toast.success("Logout Successfully");
    Cookies.remove("token");
    dispatch(logOut());
    localStorage.removeItem("user");
    router.replace("/login");
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
            href="#"
            className={`${
              active ? "bg-slate-800 text-white" : "text-gray-900"
            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
          >
            <span className="mr-2">{option[1].icons}</span>
            <span className={`${active ? " text-white" : "text-gray-900"} `}>
              {option[1].name} -
              <span className="text-xs font-medium mr-2"> Coming soon</span>
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
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${
              active ? "bg-slate-800 text-white" : "text-gray-900"
            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
          >
            <span className="mr-2">{option[3].icons}</span>
            <span className={`${active ? " text-white" : "text-gray-900"}`}>
              {option[3].name}
            </span>
          </button>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${
              active ? "bg-slate-800 text-white" : "text-gray-900"
            } group flex w-full items-center text-left rounded-md px-2 py-2 text-sm font-medium`}
          >
            <span className="mr-2">{option[4]?.icons}</span>
            <span
              className={`${
                active ? " text-white" : "text-gray-900"
              } text-[10px]`}
            >
              {option[4]?.name}
            </span>
          </button>
        )}
      </Menu.Item>
    </>
  );
};
