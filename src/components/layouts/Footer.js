"use client";
import Link from "next/link";
import NoteContext from "@/context/notes/NoteContext";
import { useContext } from "react";

function Footer() {
  const { title } = useContext(NoteContext);
  return (
    <footer className="p-4 bg-white sm:p-6 dark:bg-gray-900">
      <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0">
          <Link
            href="https://flowbite.com/"
            rel="noreferrer"
            target="_blank"
            className="flex items-center"
          >
            <span className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              {title}
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Resources
            </h2>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-4">
                <Link
                  href="https://reactjs.org/"
                  rel="noreferrer"
                  target="_blank"
                  className="hover:underline"
                >
                  React
                </Link>
              </li>
              <li>
                <Link
                  href="https://tailwindcss.com/"
                  rel="noreferrer"
                  target="_blank"
                  className="hover:underline"
                >
                  Tailwind CSS
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Follow us
            </h2>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-4">
                <Link
                  href="https://github.com/ManjiCoder/Code-Journal"
                  rel="noreferrer"
                  target="_blank"
                  className="hover:underline "
                >
                  Github
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Legal
            </h2>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <Link href="/" className="hover:underline">
            {title}™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
