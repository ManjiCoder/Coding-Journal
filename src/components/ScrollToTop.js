import React from "react";

function ScrollToTop() {
  return (
    <div className="scroll-smooth text-right fixed bottom-14 right-5">
      <button
        className="cursor-pointer text-4xl fa-solid fa-square-caret-up"
        onClick={() => window.scrollTo(0, 0)}
      ></button>
    </div>
  );
}

export default ScrollToTop;
