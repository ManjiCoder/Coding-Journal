import Head from "next/head";
import { Inter } from "next/font/google";
import { useSelector } from "react-redux";
import Link from "next/link";
import CardItems from "@/components/CardItems";

const inter = Inter({ subsets: ["latin"] });

const codingPlatfroms = [
  "HackerRank",
  "HackerEarth",
  "LeetCode",
  "CodeChef",
  "CodeForces",
  "GeeksforGeeks",
  "TopCoder",
];

export default function Home({ solutions }) {
  // console.log(solutions);
  const { isAuth, user } = useSelector((state) => state.user);
  const { title } = useSelector((state) => state.static);

  return (
    <>
      <Head>
        <title>{`${isAuth ? user.name + " |" : ""} ${title} `}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main id="main-container">
        {!isAuth ? (
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
        ) : (
          <CardItems solutions={solutions} />
        )}
      </main>
    </>
  );
}

// SSR
export async function getServerSideProps({ req }) {
  const { token, sort, order } = req.cookies;
  // console.log({ token });
  if (token) {
    let headersList = {
      "auth-token": token,
    };

    let response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/solutions/getall?sort=${
        sort || "score"
      }&order=${order || "descending"}`,
      {
        method: "GET",
        headers: headersList,
      }
    );

    var { solutions } = await response.json();
    // console.log(data);
  }
  return { props: { solutions: solutions || "" } };
}