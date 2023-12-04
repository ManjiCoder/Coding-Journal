import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import ListBoxUI from './headlessUI/ListBoxUI';
import ConfirmModal from './ConfirmModal';
import ViewCodeModal from './ViewCodeModal';

import {
  FaEraser,
  FaEdit,
  FaArrowAltCircleUp,
  FaArrowAltCircleDown,
} from 'react-icons/fa';

import {
  setSortByOrder,
  setSortByQuery,
  sortSolution,
} from '@/redux-slices/Solution';
import BrandHead from './BrandHead';
import ShareButton from './ShareButton';
import { animate, motion } from 'framer-motion';
import { variants } from '@/utils/frammer';

export default function CardItems() {
  let solutionState = useSelector((state) => state.solutions);
  let {
    searchQuery,
    page,
    limit,
    sortByQuery,
    solutions,
    sortByOrder,
    searchSolution,
  } = solutionState;

  const len = solutions ? solutions.length : 0;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [viewCode, setViewCode] = useState(false);

  const [selectedElement, setSelectedElement] = useState(null);

  // ListBox State
  const languageOption = ['score', 'accuracy', 'level', 'date'];
  const changeSeleted = (query) => {
    dispatch(sortSolution(query));
    dispatch(setSortByQuery(query));

    // Saving User-Setting in cookies
    Cookies.set(
      'userSetting',
      JSON.stringify({
        sort: query,
        order: sortByOrder,
      })
    );
  };

  //  Funtion to close Modal
  const closeModal = () => setShowModal(false);
  const closeViewCode = () => setViewCode(false);

  const handleSortingOrder = (order) => {
    dispatch(setSortByOrder(order));
    dispatch(sortSolution(sortByQuery));

    // Saving User-Setting in cookies
    Cookies.set(
      'userSetting',
      JSON.stringify({
        sort: sortByQuery,
        order: order,
      })
    );
  };

  solutions = searchSolution.length === 0 ? solutions : searchSolution;

  return (
    <main>
      <div className="flex flex-col sm:flex sm:justify-around md:justify-center items-center md:first-line:pr-4">
        <h1>
          <BrandHead />
        </h1>

        {searchSolution.length === 0 && (
          <section className="flex ml-auto sm:ml-auto justify-end sm:absolute sm:right-4 scale-75 sm:scale-90 md:scale-100 -mt-2 sm:w-56 space-x-1.5 place-items-center">
            <h2 className="font-medium mt-2.5 text-sm">Sort by</h2>
            <div className="flex-1">
              {/* Lang */}
              <ListBoxUI
                listBoxTitle={``}
                selected={sortByQuery}
                setSelected={changeSeleted}
                options={languageOption}
              />
            </div>
            <div className="flex items-center mt-2.5 space-x-1">
              <button
                className={`${
                  sortByOrder === 'ascending'
                    ? 'text-gray-600'
                    : 'text-gray-400'
                }`}
                onClick={() => handleSortingOrder('ascending')}
              >
                <FaArrowAltCircleUp />
              </button>
              <button
                className={`${
                  sortByOrder === 'descending'
                    ? 'text-gray-600'
                    : 'text-gray-400'
                }`}
                onClick={() => handleSortingOrder('descending')}
              >
                <FaArrowAltCircleDown />
              </button>
            </div>
          </section>
        )}
      </div>

      <section
        className="mt-3 pointer-events-none grid md:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3 gap-4"
        // onClick={(e) => {
        //   if (e.target.classList.contains("view-code")) {
        //     setViewCode(true);
        //     // setSelectedElement(element);
        //   }
        // }}
      >
        {solutions.map((element, index, arr) => {
          // index =
          //   sortByOrder === 'ascending'
          //     ? (len + index - len + 1).toString().padStart(2, 0)
          //     : (len - index).toString().padStart(2, 0);

          return (
            <motion.div
              id={element._id}
              key={element._id}
              className="cursor-pointer w-3/4 max-w-md xs:w-10/12 p-4 sm:w-96 mx-auto sm:p-6 bg-gradient-to-br from-white to-slate-200 dark:from-slate-900 dark:to-slate-700 border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-100"
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{
                delay: index * 0.25,
                ease: 'easeInOut',
                duration: 0.5,
              }}
              viewport={{ amount: 0 }}
            >
              <div className="flex mb-4 justify-between">
                <div className="flex">
                  {' '}
                  <Image
                    src="https://media.geeksforgeeks.org/wp-content/uploads/20200716222246/Path-219.png"
                    alt="Greeks For Greek"
                    height={90}
                    width={90}
                  />
                  <span className="ml-4 mb-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {'-'}&nbsp;&nbsp;
                    {(page * limit - index).toString().padStart(2, '0')}
                  </span>
                </div>
                <ShareButton solution={element} />
              </div>

              {searchSolution.length === 0 ? (
                <h5 className="mb-2 text-2xl capitalize font-semibold tracking-tight text-gray-900 dark:text-white">
                  {element.title}
                </h5>
              ) : (
                <h5
                  className="mb-2 capitalize text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
                  dangerouslySetInnerHTML={{
                    __html: `<p>${element.title
                      .toLowerCase()
                      .replace(
                        searchQuery,
                        `<mark>${searchQuery}</mark>`
                      )}</p>`,
                  }}
                />
              )}
              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Status -{' '}
                <span
                  className={`${
                    element.status === 'Done'
                      ? 'text-green-500'
                      : 'text-red-600'
                  } font-bold`}
                >
                  {element.status}
                </span>
              </p>
              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Level - <span className={`font-bold`}>{element.level}</span>
              </p>
              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Language -{' '}
                <span className="font-bold capitalize">{element.language}</span>
              </p>
              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Accuracy -{' '}
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
                Code -{' '}
                <span className="pointer-events-auto font-bold">
                  <button
                    className="text-blue-600 cursor-pointer view-code"
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
                Date -{' '}
                <span className={`font-bold`}>
                  {`${new Date(element.createdAt).toDateString()}, ${new Date(
                    element.createdAt
                  ).toLocaleTimeString()}`}
                  {/* {element.createdAt} */}
                </span>
              </p>

              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Score -{' '}
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
                    pathname: '/update',
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
                    setSelectedElement({ ...element, index });
                  }}
                />
              </section>
            </motion.div>
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
      </section>
    </main>
  );
}
