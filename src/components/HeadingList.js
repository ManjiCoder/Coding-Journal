"use client";

import React, { useContext } from "react";
import BrandHead from "./BrandHead";
import NoteContext from "@/context/notes/NoteContext";
import Link from "next/link";
const codingPlatfroms = [
  "HackerRank",
  "HackerEarth",
  "LeetCode",
  "CodeChef",
  "CodeForces",
  "GeeksforGeeks",
  "TopCoder",
];
function HeadingList() {
  const { title } = useContext(NoteContext);
  console.log(title);
  return (
    <div className="p-5 bg-slate-50 dark:bg-gray-900 space-y-7">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          {title}
        </span>{" "}
        Scalable App.
      </h1>
      <div className="text-lg font-normal text-gray-600 lg:text-xl dark:text-gray-400">
        <b>{title}</b> is a website made for <b>Coder</b> who are solving
        question on coding platfrom like.
        <ul className="px-5 mt-2 list-disc text-indigo-500">
          {codingPlatfroms.map((item) => {
            return (
              <li key={item}>
                <Link
                  href="/"
                  className="cursor-pointer text-gray-600 font-semibold list-disc"
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="text-lg font-normal text-gray-600 lg:text-xl dark:text-gray-400">
        You can save your Question record in the <b>{title}</b>.
      </p>
      {/* Line */}
      <hr className="h-px  text-center bg-gray-200 border-0 dark:bg-gray-100"></hr>
    </div>
  );
}

export default HeadingList;
