/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import HeadingList from "@/components/HeadingList";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
export default function page() {
  const { user, isLoading } = useUser();
  console.log({ user, isLoading });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { loginWithRedirect, isAuthenticated } = useAuth0();
  // const router = useRouter();

  // // console.log({ isAuthenticated });
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.push("/");
  //   } else {
  //     router.push("/login");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAuthenticated]);

  return (
    <main className="min-h-screen">
      <HeadingList />
      <div className="p-3 flex flex-col items-center gap-4 bg-slate-50">
        <Link
          href="/"
          className="w-10/12 lg:max-w-md text-xl shadow-sm shadow-gray-900 h-11 inline-flex items-center justify-center whitespace-nowrap rounded-full border border-transparent bg-indigo-600 px-4 py-2  font-medium text-white hover:bg-indigo-700 "
          onClick={() => loginWithRedirect()}
        >
          LogIn
        </Link>
      </div>
    </main>
  );
}
