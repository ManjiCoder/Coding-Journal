import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Tooltip from "./Tooltip";
// import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

function CardItem({ title, setProgressBar, APIKEY, alertTodo }) {
  const [data, setData] = useState([]);
  const [row, setRow] = useState([]);
  const [spinner, setSpinner] = useState(true);
  // const [status, setStatus] = useState(false)

  // GET - REQUEST
  const getRow = async () => {
    // let url = `https://sheetdb.io/api/v1/${APIKEY}`;
    let url = `https://script.google.com/macros/s/AKfycbyerC-F20IUhaCOri76oLGSYJPMj7AsIxVfp2oxTAETi1kAE_qFIcW0nFLT-_6jI1c3aw/exec`;
    console.log(url);
    setProgressBar(30);
    let res = await fetch(url);
    setProgressBar(60);
    if (res.ok) {
      let response = await res.json();
      response.data.shift();
      console.log(response.data);
      setProgressBar(90);
      setSpinner(false);
      setData(data.concat(response.data));
      setProgressBar(100);
    } else {
      throw Error(res.message);
    }
  };

  // DELETE - REQUEST
  const deleteRow = (id) => {
    // console.log(id, APIKEY);
    fetch(`https://sheetdb.io/api/v1/${APIKEY}/ID/${id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    getRow();
    return () => {
      console.log("Component logged out...");
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="pb-7 dark:bg-gray-900">
        <p className="text-3xl mb-4 font-bold text-center text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          {title}
        </p>

        {/* Spinner */}
        {/* <Spinner/> */}
        {spinner && <Spinner />}
        {/* cards */}
        <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {data.map((element) => {
            // console.log(row);
            return (
              <div
                key={element.ID}
                className="w-96 sm:w-96 mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-100"
              >
                <div className="flex mb-4">
                  <img
                    src="https://media.geeksforgeeks.org/wp-content/uploads/20200716222246/Path-219.png"
                    alt="Greeks For Greek"
                  />
                  <span className="ml-4 mb-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {"-"}&nbsp;&nbsp;{element.ID.toString().padStart(2, 0)}
                  </span>
                </div>
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  <blockquote>{element.Title}</blockquote>
                </h5>
                <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                  Status -{" "}
                  <span
                    className={`${
                      element.Status === "Done"
                        ? "text-green-500"
                        : "text-red-600"
                    } font-bold`}
                  >
                    {element.Status}
                  </span>
                </p>
                <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                  Level - <span className={`font-bold`}>{element.Level}</span>
                </p>
                <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                  Accuracy -{" "}
                  <span className={`font-bold`}>{element.Accuracy}%</span>
                </p>
                <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                  Time - <span className={`font-bold`}>{element.Time}</span>
                </p>
                <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                  Code -{" "}
                  <span className={`font-bold`}>
                    <a href="/" className="text-blue-600 cursor-pointer">
                      View
                    </a>
                  </span>
                </p>
                <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                  Date - <span className={`font-bold`}>{element.Date}</span>
                </p>
                <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                  Score -{" "}
                  <span className={`font-bold text-red-700`}>
                    {element.Score}
                  </span>
                </p>
                <a
                  href={element.Link}
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
                {/* Icons */}
                <section className="flex justify-between py-7">
                  <Link to="/update" state={data[element.ID-1]}>
                    <i
                      data-tooltip-target="tooltip-animation-Edit"
                      data-tooltip-placement="bottom"
                      className="text-blue-700 hover:text-blue-500  text-3xl fa-solid fa-pen-to-square cursor-pointer"
                      onClick={() => {
                        console.log(element.ID);
                      }}
                    ></i>
                    <Tooltip text="Edit" />
                  </Link>
                  <i
                    data-tooltip-target="tooltip-animation-Delete"
                    data-tooltip-placement="bottom"
                    className="text-red-700 hover:text-red-500 text-3xl fa-solid fa-eraser cursor-pointer"
                    onClick={() => {
                      deleteRow(element.ID);
                    }}
                  ></i>
                  <Tooltip text="Delete" />
                </section>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}

export default CardItem;
