import React, {useState } from "react";
import { useLocation } from "react-router-dom";
function UpdateItem({ APIKEY }) {
  const location = useLocation();
//   const [updateDate] = location.state;
  const updateData = location.state
//   console.log(updateData);
  const [link, setLink] = useState(updateData.Link);
  const [title, setTitle] = useState(updateData.Title);
  const [status, setStatus] = useState(updateData.Status);
  const [level, setLevel] = useState(updateData.Level);
  const [accuracy, setAccuracy] = useState(updateData.Accuracy);
  const [time, setTime] = useState(updateData.Time);
  const [code, setCode] = useState(updateData.Code);
  const [score, setScore] = useState(updateData.Code);
  const handleOnSumbit = async (e) => {
    e.preventDefault();
    let row = {
      ID: updateData.ID,
      Link: link,
      Title: title,
      Status: status,
      Level: level,
      Accuracy: accuracy,
      Time: time,
      Code: code,
      Date: updateData.Date,
      Score: 560,
    };
    console.log(JSON.stringify(row));

    fetch(`https://sheetdb.io/api/v1/${APIKEY}/ID/${updateData.ID}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [row],
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div className="dark:bg-slate-900 py-4">
      <div className="w-full mb-7 max-w-sm p-4 dark:bg-slate-800  border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:border-slate-100 mx-auto">
        <form className="space-y-6" onSubmit={handleOnSumbit}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Add Data To <b>Code-Journal</b>
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
                name="entry.584125227"
                value="Done"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="done"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Done
              </label>
            </div>

            <div className="flex items-center pl-5 mb-4">
              <input
                id="wrong"
                type="radio"
                name="entry.584125227"
                value="Wrong"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              />
              <label
                htmlFor="wrong"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
                name="entry.813669578"
                value="0"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
              />
              <label
                htmlFor="zero"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                0
              </label>
            </div>

            <div className="flex items-center pl-5 mb-4">
              <input
                id="one"
                type="radio"
                name="entry.813669578"
                value="1"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
              />
              <label
                htmlFor="one"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                1
              </label>
            </div>

            <div className="flex items-center pl-5 mb-4">
              <input
                id="two"
                type="radio"
                name="entry.813669578"
                value="2"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
              />
              <label
                htmlFor="two"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                2
              </label>
            </div>
            <div className="flex items-center pl-5 mb-4">
              <input
                id="four"
                type="radio"
                name="entry.813669578"
                value="4"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
              />
              <label
                htmlFor="four"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                4
              </label>
            </div>
            <div className="flex items-center pl-5 mb-4">
              <input
                id="eight"
                type="radio"
                name="entry.813669578"
                value="8"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
              />
              <label
                htmlFor="eight"
                className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
              Accuracy
            </label>
            <input
              type="number"
              name="entry.182705387"
              id="accuracy"
              placeholder="Enter the time like : 10m 11s"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
              placeholder="Enter the time like : 10m 11s"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              onChange={(e) => {
                setTime(e.target.value);
              }}
              required
              value={time}
            />
          </div>
          {/* Code */}
          <div>
            <label
              htmlFor="time"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Code
            </label>
            <textarea
              name="entry.1433191799"
              id="code"
              cols="40"
              rows="7"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste the code here!"
              value={code}
            ></textarea>
          </div>
          {/* Score */}
          <div>
            <label
              htmlFor="score"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              score
            </label>
            <input
              type="number"
              name="entry.1173418001"
              id="score"
              placeholder="Enter the score"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              onChange={(e) => {
                setScore(e.target.value);
              }}
              required
              value={score}
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateItem;