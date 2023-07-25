import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ConfirmModal from "./ConfirmModal";
import ViewCodeModal from "./ViewCodeModal";

import { FaEraser, FaEdit } from "react-icons/fa";
import ListBox from "./ListBox";

export default function CardItems({ solutions }) {
  const len = solutions.length;
  const { title } = useSelector((state) => state.static);
  const [showModal, setShowModal] = useState(false);
  const [viewCode, setViewCode] = useState(false);

  const [selectedElement, setSelectedElement] = useState(null);

  // ListBox State
  const [selected, setSelected] = useState("score");
  const languageOption = [
    "score",
    "accuracy",
    "level",
    "Created-Date",
    "Updated-Date",
  ];

  //  Funtion to close Modal
  const closeModal = () => setShowModal(false);
  const closeViewCode = () => setViewCode(false);

  if (solutions.length === 0) {
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
    <main>
      <div className="flex flex-col w-44 mx-auto mr-5">
        {/* <h2>Sort</h2> */}
        {/* Lang */}
        <ListBox
          listBoxTitle={``}
          selected={selected}
          setSelected={setSelected}
          options={languageOption}
        />
      </div>

      <div className="mt-7 pointer-events-none grid md:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3 gap-4">
        {solutions.map((element, index) => {
          return (
            <section
              id={element._id}
              key={element._id}
              className="cursor-pointer w-96 sm:w-96 mx-auto p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-700 border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-100"
              data-aos="fade-in"
            >
              <div className="flex mb-4">
                <Image
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20200716222246/Path-219.png"
                  alt="Greeks For Greek"
                  height={90}
                  width={90}
                />
                <span className="ml-4 mb-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {"-"}&nbsp;&nbsp;
                  {(len - index).toString().padStart(2, 0)}
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
                      setSelectedElement(element);
                    }}
                  >
                    View
                  </button>
                </span>
              </p>
              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Date -{" "}
                <span className={`font-bold`}>
                  {`${new Date(element.createdAt).toDateString()}, ${new Date(
                    element.createdAt
                  ).toLocaleTimeString()}`}
                </span>
              </p>

              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Score -{" "}
                <span className={`font-bold text-red-700`}>
                  {element.score}
                </span>
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
              {/* Icons */}
              <section className="flex justify-between py-7">
                {/* Update */}
                <Link
                  href={{
                    pathname: "/update",
                    query: {
                      data: JSON.stringify(element),
                    },
                  }}
                >
                  <FaEdit className="pointer-events-auto text-blue-700 hover:text-blue-500  text-3xl fa-solid fa-pen-to-square cursor-pointer" />
                </Link>
                {/* Delete */}
                <FaEraser
                  className="pointer-events-auto text-red-700 hover:text-red-500 text-3xl fa-solid fa-eraser cursor-pointer"
                  onClick={() => {
                    setShowModal(true);
                    element.index = solutions.length - index;
                    setSelectedElement(element);
                  }}
                />
              </section>
            </section>
          );
        })}

        {/* Delete-Modal */}
        {showModal && (
          <ConfirmModal
            deleteCard={selectedElement}
            showModal={showModal}
            closeModal={closeModal}
          />
        )}

        {/* ViewCode-Modal */}
        {viewCode && (
          <ViewCodeModal
            lang={selectedElement.language}
            code={selectedElement.code.trim()}
            closeModal={closeViewCode}
          />
        )}
      </div>
    </main>
  );
}