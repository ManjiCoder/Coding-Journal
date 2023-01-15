import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

function CardItem({ title, setProgressBar }) {
  const [row, setRow] = useState([]);
  const [spinner, setSpinner] = useState(true);

  const getRow = async () => {
    let url = `https://script.google.com/macros/s/AKfycbyH3ItxKNTqbwMRHW3xPT51vVUqomTL1Rq4unEKdaChLTFrwEFsAGtR9NDSnmlOLikm/exec`;
    setProgressBar(30);
    let res = await fetch(url);
    setProgressBar(60);
    if (res.ok) {
      let response = await res.json();
      console.log(response);
      setProgressBar(90);
      setSpinner(false)
      setRow(row.concat(response.data));
      // row.shift();
      setProgressBar(100);
    } else {
      throw Error(res.message);
    }
  };

  useEffect(() => {
    getRow();
    return () => {
      console.log("Component logged out...");
    };
    // eslint-disable-next-line
  }, []);
  // row.shift(); // for dev only

  return (
    <div className="mb-7 dark:bg-gray-900">
      <p className="text-3xl mb-4 font-bold text-center text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
        {title}
      </p>

      {/* Spinner */}
      {/* <Spinner/> */}
      {spinner && <Spinner/>}
      {/* cards */}
      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {row.map((element, i) => {
          console.log(row);
          return (
            <div
              key={element.link}
              className="w-96 sm:w-96 mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-100"
            >
              <div className="flex mb-4">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20200716222246/Path-219.png"
                  alt="Greeks For Greek"
                />
                <span className="ml-4 mb-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {"-"}&nbsp;&nbsp;{(i + 1).toString().padStart(2, 0)}
                </span>
              </div>
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                <blockquote>{element.title}</blockquote>
              </h5>
              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Status -{" "}
                <span
                  className={`${
                    element.status === "Done"
                      ? "text-green-500"
                      : "text-red-600"
                  } font-bold`}
                >
                  {element.status}
                </span>
              </p>
              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Level - <span className={`font-bold`}>{element.level}</span>
              </p>
              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Accuracy -{" "}
                <span className={`font-bold`}>{element.accuracy}%</span>
              </p>
              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Time - <span className={`font-bold`}>{element.time}</span>
              </p>
              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Code -{" "}
                <span className={`font-bold`}>
                  <a href="#" className="text-blue-600 cursor-pointer">
                    View
                  </a>
                </span>
              </p>
              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Date - <span className={`font-bold`}>{element.date}</span>
              </p>
              <a
                href={element.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default CardItem;
