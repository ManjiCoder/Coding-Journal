import CardItem from "@/components/CardItem";
import { verify } from "@/middleware";
import { cookies } from "next/headers";
import AppInfo from "@/components/AppInfo";
import Link from "next/link";

const title = "Coding-Journal";
async function Home() {
  const isToken = cookies().get("token");
  if (!isToken) {
    return (
      <div class="flex bg-slate-200 flex-col justify-center px-6 py-12 lg:px-8">
        <AppInfo />
      </div>
    );
  }
  const result = await verify(isToken.value, process.env.JWT_PRIVATE_KEY);
  console.log(result.userId.user);
  let headersList = {
    "auth-token": isToken.value,
  };

  let response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/solutions/getall`,
    {
      method: "GET",
      headers: headersList,
      // cache: "no-cache",
      next: {
        tags: ["solutions"],
      },
    }
  );

  let data = await response.json();
  // console.log({ data });
  if (data.solutions.length === 0) {
    return (
      <div className="flex flex-col min-h-[90vh] bg-slate-200  px-6 py-12 lg:px-8">
        <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            {title}
          </span>{" "}
          Scalable App.
        </h1>
        <p className="text-xl font-medium">
          Please Add solutions of your solved questions.
        </p>
        <Link
          href="/add"
          className="bg-slate-800 text-center mt-3 hover:bg-slate-900 p-2.5 text-white text-xl w-full md:max-w-sm font-semibold  border outline-none rounded-md shadow-md shadow-gray-400 cursor-pointer"
        >
          Add Solutions
        </Link>
      </div>
    );
  }

  return (
    <div class="flex min-h-[90vh] bg-slate-200  px-6 py-12 lg:px-8">
      <CardItem data={data.solutions} />
    </div>
  );
}

export default Home;
