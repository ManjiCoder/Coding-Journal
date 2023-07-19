import React from "react";
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
function AppInfo() {
  const title = "Coding-Journal";
  return (
    <div className="p-5 rounded-md shadow-md bg-white dark:bg-gray-900 space-y-7">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          {title}
        </span>{" "}
        Scalable App.
      </h1>
      <div className="text-lg font-normal text-gray-600 lg:text-xl dark:text-gray-400">
        <b>{title}</b> is a website made for <b>Coder</b> who are solving
        question on coding platfrom like.
        <ul className="px-5 mt-2 list-disc text-slate-900">
          {codingPlatfroms.map((item) => {
            return (
              <li key={item}>
                <Link
                  href="/"
                  className="cursor-pointer text-green-600 font-semibold list-disc"
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
      <h2 className="font-medium"> It&apos;s absolutly free!</h2>

      <div className="flex flex-col text-center md:items-center gap-y-2 font-medium">
        <Link
          href="/login"
          className="bg-slate-800 text-center hover:bg-slate-900 p-2.5 text-white text-xl w-full md:max-w-sm font-semibold  border outline-none rounded-md shadow-md shadow-gray-400 cursor-pointer"
        >
          Login
        </Link>
        OR
        <Link
          href="/sign-up"
          className="bg-slate-800 text-center hover:bg-slate-900 p-2.5 text-white text-xl w-full md:max-w-sm font-semibold  border outline-none rounded-md shadow-md shadow-gray-400 cursor-pointer"
        >
          Sign-up
        </Link>
      </div>
    </div>
  );
}

export default AppInfo;
