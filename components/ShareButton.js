import Link from "next/link";
import React from "react";
import { FaShare } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RWebShare } from "react-web-share";

export default function ShareButton({ solution }) {
  const { user } = useSelector((state) => state.user);
  return (
    <RWebShare
      data={{
        text: solution.title,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${user.name}/${
          solution.title
        }&${new Date(solution.createdAt).getTime()}`,
        title: solution.title,
      }}
      onClick={() =>
        console.log(
          {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/${user.name}/${
              solution.title
            }&${new Date(solution.createdAt).getTime()}`,
          },
          "shared successfully!"
        )
      }
    >
      {/* <Link href={`${user.name}/${solution.title}`}> */}
      <FaShare className="pointer-events-auto text-blue-600 hover:text-blue-500 text-3xl cursor-pointer" />
      {/* </Link> */}
    </RWebShare>
  );
}
