import React from "react";

function Alert({ alert }) {
  return (
    // If alert is not null
    alert && (
      <div
        id="toast-success"
        className="flex items-center w-full p-4 text-gray-500 bg-white shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div className={`inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-${alert.type}-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200`}>
          <i className="text-2xl fa-solid fa-circle-check"></i>
        </div>
        <div className="ml-3 text-xl font-normal">
          Item {alert.msg} successfully.
        </div>
      </div>
    )
  );
}

export default Alert;
