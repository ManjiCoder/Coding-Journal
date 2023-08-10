import React, { useState } from "react";
import Image from "next/image";
import ShareButton from "@/components/ShareButton";
import ViewCodeModal from "@/components/ViewCodeModal";
import BrandHead from "@/components/BrandHead";
import Header from "@/components/Header";
import { useSelector } from "react-redux";

export default function Slug({ element }) {
  const { title } = useSelector((state) => state.static);
  const [viewCode, setViewCode] = useState(false);

  const closeViewCode = () => setViewCode(false);

  return (
    <>
      <Header title={`${element.title} - ${title}`} />
      <div id="main-container" className="my-5 mb-10 min-h-screen ">
        <h1 className="text-center mb-5">
          <BrandHead />
        </h1>
        <div className="cursor-pointer w-4/5 max-w-md p-5 sm:w-96 mx-auto sm:p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-700 border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-100">
          <div className="flex mb-4 justify-between">
            <div className="flex">
              <Image
                src="https://media.geeksforgeeks.org/wp-content/uploads/20200716222246/Path-219.png"
                alt="Greeks For Greek"
                height={90}
                width={90}
              />
              <span className="ml-4 mb-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {"-"}&nbsp;&nbsp; 01
              </span>
            </div>
            <ShareButton solution={element} />
          </div>

          <h5 className="mb-2 capitalize text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {element.title}
          </h5>

          <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
            Status -{" "}
            <span
              className={`${
                element.status === "Done" ? "text-green-500" : "text-red-600"
              } font-bold`}
            >
              {element.status}
            </span>
          </p>
          <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
            Level - <span className={`font-bold`}>{element.level}</span>
          </p>
          <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
            Language -{" "}
            <span className="font-bold capitalize">{element.language}</span>
          </p>
          <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
            Accuracy -{" "}
            <span className={`font-bold`}>
              {Math.floor(100 / element.accuracy) ===
              Math.ceil(100 / element.accuracy)
                ? 100 / element.accuracy
                : (100 / element.accuracy).toFixed(2)}
              {/* {element.accuracy} */}%
            </span>
          </p>
          <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
            Time - <span className={`font-bold`}>{element.time}</span>
          </p>
          <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
            Code -{" "}
            <span className="pointer-events-auto font-bold">
              <button
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  setViewCode(true);
                }}
              >
                View
              </button>
            </span>
          </p>
          <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
            Date -{" "}
            <span className={`font-bold`}>
              {`${new Date(element.createdAt).toDateString()}`}
            </span>
          </p>

          <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
            Score -{" "}
            <span className={`font-bold text-red-700`}>{element.score}</span>
          </p>
          <a
            href={element.link}
            target="_blank"
            rel="noreferrer"
            className="pointer-events-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read More
            <svg
              className="w-5 h-5 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
            </svg>
          </a>
          {/* ViewCode-Modal */}
          {viewCode && (
            <ViewCodeModal
              lang={element.language}
              code={element.code.trim()}
              closeModal={closeViewCode}
            />
          )}
        </div>
      </div>
    </>
  );
}

// SSR
export async function getServerSideProps(context) {
  const { slug } = context.query;
  // console.log(context.query);
  try {
    const arr = slug.split("&");
    // console.log(arr);
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/solutions/share?title=${arr[0]}&createdAt=${arr[1]}`
    );

    let data = await response.json();
    // console.log(data);
    if (data.solutions) {
      return { props: { element: data.solutions } };
    }
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
