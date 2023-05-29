"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ViewCodeModal from "./ViewCodeModal";
import ConfirmModal from "./ConfirmModal";
import AddIcon from "./AddIcon";
import NoteContext from "@/context/notes/NoteContext";

function Cards({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [viewCode, setViewCode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [lang, setLang] = useState("");

  const { setTargetQuestion } = useContext(NoteContext);

  useEffect(() => {
    setProgress(100); // eslint-disable-next-line
  }, []);
  //  Funtion to close Modal
  const closeModal = () => setShowModal(false);
  const closeViewCode = () => setViewCode(false);

  return (
    <>
      <main className="mt-7 pointer-events-none grid md:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3 gap-4">
        {data?.map((element, index) => {
          return (
            <section
              id={element.ID}
              key={element.ID}
              className="cursor-pointer w-96 sm:w-96 mx-auto p-6 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-900 dark:to-slate-700 border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-100"
              data-aos="fade-in"
            >
              <div className="flex mb-4">
                <Image
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20200716222246/Path-219.png"
                  alt="Greeks For Greek"
                  height={90}
                  width={90}
                  className="h-auto w-auto"
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
                Language -{" "}
                <span className="font-bold capitalize">{element.Lang}</span>
              </p>
              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Accuracy -{" "}
                <span className={`font-bold`}>
                  {Math.floor(100 / element.Accuracy) ===
                  Math.ceil(100 / element.Accuracy)
                    ? 100 / element.Accuracy
                    : (100 / element.Accuracy).toFixed(2)}
                  %
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
                      setLang(element.Lang);
                    }}
                  >
                    View
                  </button>
                </span>
              </p>
              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Date -{" "}
                <span className={`font-bold`}>
                  {`${new Date(element.Date).toDateString()}, ${new Date(
                    element.Date
                  ).toLocaleTimeString()}`}
                </span>
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
                {/* Update */}
                <Link href="/update">
                  <i
                    className="pointer-events-auto text-blue-700 hover:text-blue-500  text-3xl fa-solid fa-pen-to-square cursor-pointer"
                    onClick={() => {
                      console.log(setTargetQuestion(element));
                    }}
                  ></i>
                </Link>
                {/* Delete */}
                <i
                  className="pointer-events-auto text-red-700 hover:text-red-500 text-3xl fa-solid fa-eraser cursor-pointer"
                  onClick={() => {
                    setShowModal(true);
                    setCurrentId(element.ID);
                    console.log(element.ID);
                  }}
                ></i>
              </section>
            </section>
          );
        })}

        {/* Delete-Modal */}
        {showModal && (
          <ConfirmModal
            deleteCardId={currentId}
            showModal={showModal}
            closeModal={closeModal}
          />
        )}

        {/* ViewCode-Modal */}
        {viewCode && (
          <ViewCodeModal
            lang={lang}
            code={currentId}
            closeModal={closeViewCode}
          />
        )}
      </main>
      <AddIcon />
    </>
  );
}

export default Cards;
