import ListBoxUI from "@/components/headlessUI/ListBoxUI";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Update() {
  // const solution = query.data;
  // console.log(query);
  const router = useRouter();
  const solution = JSON.parse(router.query.data || null);

  const { title: mainTitle, toastDuration } = useSelector(
    (state) => state.static
  );

  const [link, setLink] = useState(solution.link || "");
  const [title, setTitle] = useState(solution.title || "");
  const [status, setStatus] = useState(solution.status || "");
  const [level, setLevel] = useState(solution.level || "");
  const [accuracy, setAccuracy] = useState(solution.accuracy || "");
  const [time, setTime] = useState(solution.time || "");
  const [code, setCode] = useState(solution.code || "");
  const [score, setScore] = useState(solution.score || "");

  // ListBox State
  const [selected, setSelected] = useState(solution.language);
  const languageOption = ["javascript", "python", "java", "c++", "c"];

  const HandleOnSumbit = async (e) => {
    const toastId = toast.loading("Please wait...");
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/solutions/update`,
        {
          method: "PUT",
          body: JSON.stringify({
            id: solution._id,
            link,
            title,
            status,
            level,
            accuracy,
            language: selected,
            time,
            code,
            score,
          }),
          headers: {
            "Content-Type": "application/json",
            "auth-token": Cookies.get("token"),
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        router.replace("/");
        toast.update(toastId, {
          render: data.message,
          type: "success",
          isLoading: false,
          autoClose: toastDuration,
          closeButton: true,
          closeOnClick: true,
        });
        router.replace("/");
        return;
      }
      console.log(data);
      toast.update(toastId, {
        render: data.message,
        type: "error",
        isLoading: false,
        autoClose: toastDuration,
        closeButton: true,
        closeOnClick: true,
      });
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Internal server error",
        type: "error",
        closeButton: true,
        closeOnClick: true,
      });
      console.log({ error });
    }
  };

  return (
    <div className="dark:bg-slate-900 py-4">
      <Head>
        <title>{mainTitle}</title>
      </Head>
      <div className="w-11/12 md:w-full mb-7 max-w-sm p-4 bg-gradient-to-br from-white to-slate-200 dark:from-slate-900 dark:to-slate-700 border border-gray-300 rounded-lg shadow-md sm:p-6 md:p-8 dark:border-slate-100 mx-auto">
        <form className="space-y-6" onSubmit={HandleOnSumbit}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Update Data To <b>{mainTitle}</b>
          </h5>
          {/* Link */}
          <div>
            <label
              htmlFor="link"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Link
            </label>
            <input
              type="text"
              name="entry.314843673"
              id="link"
              className="bg-gray-50 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white text-sm rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-0 focus:ring-opacity-75 focus:ring-offset-2 focus:ring-offset-blue-500 shadow-md block w-full p-2.5 dark:bg-gray-600  dark:placeholder-gray-400 "
              placeholder="Paste the link"
              onChange={(e) => {
                setLink(e.target.value);
              }}
              required
              value={link}
            />
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              name="entry.1254029356"
              id="title"
              placeholder="Enter the title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-0 focus:ring-opacity-75 focus:ring-offset-2 focus:ring-offset-blue-500 shadow-md block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
              value={title}
            />
          </div>
          {/* Status */}
          <div className="flex">
            <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mr-5">
              Status
            </div>
            <div className="flex items-center mb-4">
              <input
                id="done"
                type="radio"
                name="status"
                value="Done"
                checked={status === "Done"}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                className="cursor-pointer w-4 h-4"
                required
              />
              <label
                htmlFor="done"
                className="cursor-pointer block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Done
              </label>
            </div>

            <div className="flex items-center pl-5 mb-4">
              <input
                id="wrong"
                type="radio"
                name="status"
                value="Wrong"
                checked={status === "Wrong"}
                className="cursor-pointer w-4 h-4"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                required
              />
              <label
                htmlFor="wrong"
                className="cursor-pointer block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Wrong
              </label>
            </div>

            <div className="flex items-center pl-5 mb-4">
              <input
                id="TLE"
                type="radio"
                name="status"
                value="TLE"
                checked={status === "TLE"}
                className="cursor-pointer w-4 h-4"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                required
              />
              <label
                htmlFor="TLE"
                className="cursor-pointer block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                TimeOut
              </label>
            </div>
          </div>
          {/* Level */}
          <div className="flex">
            <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mr-5">
              Level
            </div>
            <div className="flex items-center mb-4">
              <input
                id="zero"
                type="radio"
                name="level"
                value="0"
                checked={level === "0"}
                className="cursor-pointer w-4 h-4"
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
                required
              />
              <label
                htmlFor="zero"
                className="cursor-pointer block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                0
              </label>
            </div>

            <div className="flex items-center pl-5 mb-4">
              <input
                id="one"
                type="radio"
                name="level"
                value="1"
                checked={level == "1"}
                className="cursor-pointer w-4 h-4 "
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
                required
              />
              <label
                htmlFor="one"
                className="cursor-pointer block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                1
              </label>
            </div>

            <div className="flex items-center pl-5 mb-4">
              <input
                id="two"
                type="radio"
                name="level"
                value="2"
                checked={level == "2"}
                className="cursor-pointer w-4 h-4"
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
                required
              />
              <label
                htmlFor="two"
                className="cursor-pointer block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                2
              </label>
            </div>
            <div className="flex items-center pl-5 mb-4">
              <input
                id="four"
                type="radio"
                name="level"
                value="4"
                checked={level == "4"}
                className="cursor-pointer w-4 h-4"
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
                required
              />
              <label
                htmlFor="four"
                className="cursor-pointer block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                4
              </label>
            </div>
            <div className="flex items-center pl-5 mb-4">
              <input
                id="eight"
                type="radio"
                name="level"
                value="8"
                checked={level == "8"}
                className="cursor-pointer w-4 h-4"
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
                required
              />
              <label
                htmlFor="eight"
                className="cursor-pointer block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                8
              </label>
            </div>
          </div>
          {/* Accuracy */}
          <div>
            <label
              htmlFor="accuracy"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Attempt
            </label>
            <input
              type="number"
              name="entry.182705387"
              id="accuracy"
              placeholder="Enter the number of attempt."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-0 focus:ring-opacity-75 focus:ring-offset-2 focus:ring-offset-blue-500 shadow-md block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              onChange={(e) => {
                setAccuracy(e.target.value);
              }}
              required
              min="0"
              max="100"
              value={accuracy}
            />
          </div>
          {/* Time */}
          <div>
            <label
              htmlFor="time"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Time
            </label>
            <input
              type="text"
              name="entry.1772415540"
              id="time"
              placeholder="Enter the time like 10m or 0."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-0 focus:ring-opacity-75 focus:ring-offset-2 focus:ring-offset-blue-500 shadow-md block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              onChange={(e) => {
                setTime(e.target.value);
              }}
              required
              value={time}
            />
          </div>

          {/* Lang */}
          <ListBoxUI
            listBoxTitle={"Language"}
            selected={selected}
            setSelected={setSelected}
            options={languageOption}
          />

          {/* Code */}
          <div>
            <label
              htmlFor="code"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Code
            </label>
            <textarea
              name="entry.1433191799"
              id="code"
              cols="40"
              rows="4"
              className="shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-0 focus:ring-opacity-75 focus:ring-offset-2 focus:ring-offset-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste the code here!"
              value={code}
              required
            ></textarea>
          </div>
          {/* Score */}
          <div>
            <label
              htmlFor="score"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Score
            </label>
            <input
              type="number"
              name="entry.1173418001"
              id="score"
              placeholder="Enter the score"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-0 focus:ring-opacity-75 focus:ring-offset-2 focus:ring-offset-blue-500 shadow-md block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              onChange={(e) => {
                setScore(e.target.value);
              }}
              required
              value={score}
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

// Update.getInitialProps = ({ query }) => {
//   // console.log(query);
//   return query;
// };
