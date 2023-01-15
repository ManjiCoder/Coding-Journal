import React, { useState } from "react";
import axios from "axios";

function AddItem(props) {
  const [link, setLink] = useState(
    "https://practice.geeksforgeeks.org/problems/plus-one/1?page=7&difficulty[]=-1&difficulty[]=0&status[]=unsolved&category[]=Data%20Structures&sortBy=submissions"
  );
  const [title, setTitle] = useState("Plus One");
  const [status, setStatus] = useState("Done");
  const [level, setLevel] = useState("2");
  const [accuracy, setAccuracy] = useState("14");
  const [time, setTime] = useState("14m");
  const [code, setCode] = useState("");
  const [date, setDate] = useState("");
  const handleOnSumbit = async (e) => {
    e.preventDefault();
    setDate(new Date().getTime());
    console.log(link, title, status, level, accuracy, time, code, date);

    let row = {
      link: link,
      title: title,
      status: status,
      level: level,
      accuracy: accuracy,
      time: time,
      code: code,
      date: new Date().toDateString(),
      score: 560,
    };
    console.log(JSON.stringify(row));
    const options = {
      method: 'POST',
      url: 'https://script.google.com/macros/s/AKfycbyH3ItxKNTqbwMRHW3xPT51vVUqomTL1Rq4unEKdaChLTFrwEFsAGtR9NDSnmlOLikm/exec',
      params: {action: "doPost"},
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      data: JSON.stringify(row)
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

  };
  return (
    <div className="w-full mb-7 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto">
      <form
        className="space-y-6"
        onSubmit={handleOnSumbit}
      >
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Add Data To <b>{props.title}</b>
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
            name="link"
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
            name="title"
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
              name="status"
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
              name="status"
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
              name="level"
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
              name="level"
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
              name="level"
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
              name="level"
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
              name="level"
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
            name="accuracy"
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
            name="time"
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
        {/* code */}
        <div>
          <label
            htmlFor="time"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Code
          </label>
          <textarea
            name="code"
            id="code"
            cols="40"
            rows="7"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste the code here!"
            value={code}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddItem;
