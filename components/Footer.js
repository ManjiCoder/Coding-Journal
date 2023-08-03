import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import BrandHead from "./BrandHead";

import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

const footerLinks = [
  { icon: <AiFillGithub className="h-5 w-5" />, href: "#/" },
  { icon: <FaLinkedinIn className="h-5 w-5" />, href: "#/jk" },
];

export default function Footer() {
  const { title } = useSelector((state) => state.static);
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <div className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          {/* <span className="ml-3 text-xl">{title}</span> */}
          <BrandHead />
        </div>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          {title} © 2022-2023 all rights reserved
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 space-x-3 justify-center sm:justify-start">
          {footerLinks.map(({ href, icon }) => (
            <Link
              key={href}
              href={href}
              className="text-gray-400 hover:text-gray-600"
            >
              {icon}
            </Link>
          ))}
        </span>
      </div>
    </footer>
  );
}
