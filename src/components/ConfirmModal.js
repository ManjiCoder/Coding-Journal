import React, { useEffect } from "react";
import reactDom from 'react-dom'

const ConfirmModal = ({ closeModal, deleteCardId,APIKEY }) => {
  
  // TO TOGGLE SCROLL
  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    document.getElementById('root').style.filter = 'blur(2px)'
    document.getElementById('root').style.filter = 'brightness(0.5)'

    return () => {
      document.getElementById('root').style.filter = 'blur(0px)'
      document.getElementById('root').style.filter = 'brightness(1)'
      document.body.style.overflowY = 'scroll'
    }
  }, [])
  
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
    const handleOnDelete = () => {
      closeModal()
      deleteRow(deleteCardId)
    }
    // console.log(deleteCardId);
  return reactDom.createPortal(
    <>
      <div
        id="popup-modal"
        tabIndex="-1"
        className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 p-4"
      >
        <div className="relative w-[20rem] h-full md:w-96 md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="m3 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure?
              </h3>
              <h4 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              You want to delete Card No.{deleteCardId}?
              </h4>
              <button
                data-modal-hide="popup-modal"
                type="button"
                onClick={handleOnDelete}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                onClick={closeModal}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('ParentModalDiv')
  );
};

export default ConfirmModal;
