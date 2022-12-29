import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Table({ title, setProgressBar }) {
  const [row, setRow] = useState([]);

  const getRow = async () => {
    let url = `https://script.google.com/macros/s/AKfycbyH3ItxKNTqbwMRHW3xPT51vVUqomTL1Rq4unEKdaChLTFrwEFsAGtR9NDSnmlOLikm/exec`;
    setProgressBar(30);
    let res = await fetch(url);
    setProgressBar(60);
    if (res.ok) {
      let response = await res.json();
      console.log(response);
      setProgressBar(90);
      setRow(row.concat(response.data));
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
    <div className="overflow-x-auto relative">
      <p className="text-2xl mb-4 font-bold text-center text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
        {title}
      </p>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Sr No.
            </th>
            <th scope="col" className="py-3 px-6">
              Title
            </th>
            <th scope="col" className="py-3 px-6">
              Status
            </th>
            <th scope="col" className="py-3 px-6">
              Level
            </th>
            <th scope="col" className="py-3 px-6">
              Accuracy
            </th>
            <th scope="col" className="py-3 px-6">
              Time
            </th>
            <th scope="col" className="py-3 px-6">
              Code
            </th>
            <th scope="col" className="py-3 px-6">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {row.map((v, i, arr) => {
            if (arr[i + 1] != undefined) {
              return (
                <tr
                  key={arr[i + 1].link}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {i + 1}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {arr[i + 1].title}
                  </td>
                  <td className="text-green-500 py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {arr[i + 1].status}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {arr[i + 1].level}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {arr[i + 1].accuracy}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {arr[i + 1].time}
                  </td>
                  <td className="py-4 text-blue-700 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <a href={arr[i + 1].link} target="_blank" rel="noreferrer">
                      view
                    </a>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {arr[i + 1].date}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
