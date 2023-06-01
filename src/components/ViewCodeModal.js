"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function ViewCodeModal({ lang, code, closeModal }) {
  const [copy, setCopy] = useState(false);
  const codeString = code;
  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full md:max-w-2xl lg:max-w-screen-md transform overflow-hidden rounded-2xl bg-slate-50 p-4 text-left align-middle shadow-xl transition-all dark:bg-slate-400">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-2"
                  >
                    Code :
                  </Dialog.Title>
                  {/* Copy-To-Clipboard */}
                  <div className="absolute top-14 right-9 text-slate-50 hover:text-slate-200">
                    <span>{copy ? "copied!" : ""}</span>
                    <i
                      className={`ml-2 cursor-pointer fa-${
                        copy ? "solid" : "regular"
                      } fa-${copy ? "check" : "clone"}`}
                      onClick={() => {
                        setCopy(true);
                        navigator.clipboard.writeText(codeString);
                        // CleanUP
                        setTimeout(() => {
                          setCopy(false);
                        }, 1500);
                      }}
                    ></i>
                  </div>
                  {/* Code - Highlighter */}
                  <div className="overflow-auto">
                    <SyntaxHighlighter
                      language={lang}
                      style={monokai}
                      customStyle={{
                        padding: "2rem 1rem",
                        borderRadius: "6px",
                      }}
                      showLineNumbers
                      // lineNumberStyle={{ color: "greenyellow" }}
                    >
                      {codeString}
                    </SyntaxHighlighter>
                  </div>
                  <div className="mt-4">
                    {/* Cancel */}
                    <button
                      type="button"
                      onClick={closeModal}
                      className="absolute top-2 right-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
