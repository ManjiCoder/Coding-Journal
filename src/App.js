import { Routes, Route } from "react-router-dom";
import Heading from "./components/Heading";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";

function App() {
  let title = "Code-Journal";
  const [progress, setProgress] = useState(20);
  const setProgressBar = (UpdateProgress) => {
    setProgress(UpdateProgress);
  };
  return (
    <>
      <Navbar title={title} />
      {/* Top Loading Bar */}
      <LoadingBar color="#f11946" height={3.4} progress={progress} />
      <Heading title={title} />
      <Routes>
        <Route
          path="/"
          element={<Table title={title} setProgressBar={setProgressBar} />}
        />
      </Routes>
    </>
  );
}

export default App;
