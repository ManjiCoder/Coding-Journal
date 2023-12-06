import { Inter } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import CardItems from '@/components/CardItems';
import { useEffect } from 'react';
import {
  setPage,
  setSolutions,
  setSortByOrder,
  setSortByQuery,
  setTotalResults,
} from '@/redux-slices/Solution';
import Cookies from 'js-cookie';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import { variants } from '@/utils/frammer';

const inter = Inter({ subsets: ['latin'] });

const codingPlatfroms = [
  'HackerRank',
  'HackerEarth',
  'LeetCode',
  'CodeChef',
  'CodeForces',
  'GeeksforGeeks',
  'TopCoder',
];

export default function Home({ solutions, page, totalResults }) {
  // console.log(solutions);
  const dispatch = useDispatch();
  useEffect(() => {
    const isUserSetting = Cookies.get('userSetting');
    if (isUserSetting) {
      const { sort, order } = JSON.parse(isUserSetting);
      dispatch(setSortByQuery(sort));
      dispatch(setSortByOrder(order));
    }
    dispatch(setPage(page));
    dispatch(setTotalResults(totalResults));
    dispatch(setSolutions(solutions));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solutions]);

  const { title } = useSelector((state) => state.static);

  if (!solutions) {
    return (
      <>
        <Header />
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          id="main-container"
          className="p-5 rounded-md shadow-md bg-white dark:bg-gray-900 space-y-7"
        >
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              {title}
            </span>{' '}
            {/* Scalable App. */}
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
        </motion.div>
      </>
    );
  }
  return (
    <>
      <Header />

      <motion.section
        variants={variants}
        initial="hidden"
        animate="visible"
        id="main-container"
        className="min-h-screen pt-3.5"
      >
        <CardItems solutions={solutions} />
        {solutions && solutions.length === 0 && !totalResults && (
          <div className="flex flex-col min-h-[80vh] px-4 items-center justify-center">
            <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                {title}
              </span>{' '}
              Scalable App.
            </h1>
            <p className="text-xl font-medium">
              Please Add solutions of your solved questions.
            </p>
            <Link
              href="/add"
              className="bg-slate-800 text-center mt-3 max-w-xs hover:bg-slate-900 p-2.5 text-white text-xl w-full md:max-w-sm font-semibold  border outline-none rounded-md shadow-md shadow-gray-400 cursor-pointer"
            >
              Add Solutions
            </Link>
          </div>
        )}
      </motion.section>
    </>
  );
}

// SSR
export async function getServerSideProps(context) {
  const page = context.query.page ? parseInt(context.query.page) : 1;
  const limit = context.query.limit ? parseInt(context.query.limit) : 9;
  // console.log(page);
  const { req, res } = context;
  try {
    const { token, userSetting } = req.cookies;
    // console.log({ userSetting });
    var sort = null;
    var order = null;
    if (token) {
      let headersList = {
        'auth-token': token,
      };
      if (userSetting) {
        var { sort, order } = JSON.parse(userSetting);
        if (sort === 'date') sort = 'createdAt';
      }
      // console.log(sort, order);

      let response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/solutions/getall?sort=${
          sort || 'score'
        }&order=${order || 'descending'}&page=${page}&limit=${limit}`,
        {
          method: 'GET',
          headers: headersList,
        }
      );

      var data = await response.json();

      if ((data.totalResults && data.solutions.length === 0) || page < 0) {
        return {
          redirect: {
            destination: '/404',
            permanent: false,
          },
        };
      }
      // console.log(solutions);
    }

    return {
      props: {
        solutions: data.solutions || null,
        page,
        totalResults: data.totalResults,
      },
    };
  } catch (error) {
    // TODO: Delete Cookie
    return { props: { solutions: null } };
  }
}
