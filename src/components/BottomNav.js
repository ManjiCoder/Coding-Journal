import React from "react";
import { Link } from "react-router-dom";

function BottomNav() {
  return (
    <div className="sticky shadow-md left-0 bottom-0 bg-slate-100 flex justify-evenly text-2xl py-2 dark:bg-slate-900 text-black dark:text-white">
      <Link to={"/"}>
        <i className="bi bi-house-fill  cursor-pointer"></i>
      </Link>
      <Link to={"/add"}>
        <i className="bi bi-plus-circle-fill cursor-pointer"></i>
      </Link>
      <Link>
        <i className="bi bi-gear-fill cursor-pointer"></i>
      </Link>
    </div>
  );
}

export default BottomNav;
