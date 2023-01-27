import React, { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";

function ViewCodeModal({ lang, code, closeModal }) {
  const [copy, setCopy] = useState(false);
  const [isLineWrap, setIsLineWrap] = useState(false);
  console.log(code);
  const codeString = code;

  // // TO TOGGLE SCROLL
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    // document.getElementById("root").style.filter = "brightness(0.5)";

    return () => {
      document.body.style.overflowY = "scroll";
      // document.getElementById("root").style.filter = "brightness(1)";
    };
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm"
        onClick={closeModal}
      ></div>

      {/* View Modal */}
      <section
        tabIndex="-1"
        className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 overflow-y-scroll"
      >
        <main className="relative w-[80vw] md:max-w-6xl bg-[#23241f] rounded-sm">
          <div className="flex items-center justify-between text-base text-white py-2 px-4">
            <span className="font-medium">Code </span>
            {/* Cancal */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-1 right-2.5 text-gray-100 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
            {/* Copy-To-Clipboard */}
            <div className="absolute top-11 right-4">
              <span>{copy ? "copied!" : ""}</span>
              <i
                className={`ml-2 cursor-pointer text-slate-50 fa-${
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
          </div>

          {/* Line-Wrap */}
          <div className="flex items-center gap-2 absolute top-11">
            <label
              htmlFor="line-wrap"
              className="ml-2 text-sm font-medium dark:text-gray-900 text-gray-200"
            >
              Line-Wrap
            </label>
            <input
              id="line-wrap"
              name="line-wrap"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onClick={() => setIsLineWrap(!isLineWrap)}
              value={isLineWrap}
            />
          </div>

          <SyntaxHighlighter
            language={lang}
            style={monokaiSublime}
            wrapLongLines={isLineWrap}
            customStyle={{ padding: "2rem 1rem", borderRadius: "6px" }}
          >
            {codeString}
          </SyntaxHighlighter>
        </main>
      </section>
    </>
  );
}

export default ViewCodeModal;
