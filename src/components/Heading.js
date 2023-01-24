import React from "react";

function Heading({title}) {
  return (
    <div className="p-5 bg-slate-50 dark:bg-gray-900 space-y-7">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          {title}
        </span>{" "}
        Scalable App.
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Here at <b>{title}</b> we focus on markets where technology, innovation, and
        capital can unlock long-term value and drive economic growth.
      </p>
      {/* Line */}
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-100 mr-4"></hr>
    </div>
  );
}

export default Heading;
