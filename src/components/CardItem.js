import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Tooltip from "./Tooltip";
// import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import ConfirmModal from "../components/modals/ConfirmModal";
import ViewCodeModal from "./modals/ViewCodeModal";
function CardItem({ title, setProgressBar, APIKEY, alertTodo }) {
  const [data, setData] = useState([]);
  // const [row, setRow] = useState([]);
  const [spinner, setSpinner] = useState(false);
  // const [status, setStatus] = useState(false)

  const [showModal, setShowModal] = useState(false);
  const [viewCode, setViewCode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  //  Funtion to close Modal
  const closeModal = () => setShowModal(false);
  const closeViewCode = () => setViewCode(false)
  // GET - REQUEST
  const getRow = async () => {
    // let url = `https://sheetdb.io/api/v1/${APIKEY}`;
    let url = `https://script.google.com/macros/s/AKfycbyerC-F20IUhaCOri76oLGSYJPMj7AsIxVfp2oxTAETi1kAE_qFIcW0nFLT-_6jI1c3aw/exec`;
    console.log(url);
    setProgressBar(30);
    let res = await fetch(url);
    setProgressBar(60);
    alertTodo("Fetch", res.ok);
    if (res.ok) {
      let response = await res.json();
      console.log(response);
      setProgressBar(90);
      setSpinner(false);
      setData(data.concat(response));
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

  return (
    <>
      <div className="pb-7 bg-slate-50 dark:bg-gray-900">
        <p className="text-3xl mb-4 font-bold text-center text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          {title}
        </p>

        {/* Spinner */}
        {/* <Spinner/> */}
        {spinner && <Spinner />}
        {/* cards */}
        <section className="pointer-events-none grid md:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3 gap-4">
          {data.map((element, index) => {
            return (
              <div
                id={element.ID}
                key={element.ID}
                className="focus:bg-black focus:scale-105 cursor-pointer w-96 sm:w-96 mx-auto p-6 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-900 dark:to-slate-700 border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-100"
              >
                <div className="flex mb-4">
                  <img
                    src="https://media.geeksforgeeks.org/wp-content/uploads/20200716222246/Path-219.png"
                    alt="Greeks For Greek"
                  />
                  <span className="ml-4 mb-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {"-"}&nbsp;&nbsp;
                    {(data.length - index).toString().padStart(2, 0)}
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
                  <span className={`font-bold`}>
                    {(100 / element.Accuracy).toFixed(2)}%
                  </span>
                </p>
                <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                  Time - <span className={`font-bold`}>{element.Time}</span>
                </p>
                <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                  Code -{" "}
                  <span className="pointer-events-auto font-bold">
                    <button
                      className="text-blue-600 cursor-pointer"
                      onClick={() => {
                        setViewCode(true);
                        setCurrentId(element.Code);
                      }}
                    >
                      View
                    </button>
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
                {/* Icons */}
                <section className="flex justify-between py-7">
                  <Link to="/update" state={data[element.ID - 1]}>
                    <i
                      data-tooltip-target="tooltip-animation-Edit"
                      data-tooltip-placement="bottom"
                      className="pointer-events-auto text-blue-700 hover:text-blue-500  text-3xl fa-solid fa-pen-to-square cursor-pointer"
                      onClick={() => {
                        console.log(element.ID);
                      }}
                    ></i>
                    <Tooltip text="Edit" />
                  </Link>
                  <i
                    data-tooltip-target="tooltip-animation-Delete"
                    data-tooltip-placement="bottom"
                    className="pointer-events-auto text-red-700 hover:text-red-500 text-3xl fa-solid fa-eraser cursor-pointer"
                    onClick={() => {
                      setShowModal(true);
                      setCurrentId(element.ID);
                      console.log(element.ID);
                    }}
                  ></i>
                  <Tooltip text="Delete" />
                </section>
              </div>
            );
          })}
        </section>
        {/* <Modal/> */}
        {showModal && (
          <ConfirmModal
            APIKEY={APIKEY}
            deleteCardId={currentId}
            closeModal={closeModal}
          />
        )}

        {viewCode && (
          <ViewCodeModal
            lang={"javascript"}
            code={currentId}
            closeModal={closeViewCode}
          />
        )}
      </div>
    </>
  );
}

export default CardItem;
