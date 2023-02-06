import { Routes, Route, useLocation } from "react-router-dom";
import Heading from "./components/Heading";
import Navbar from "./components/Navbar";
import LoadingBar from "react-top-loading-bar";
import { useEffect, useState } from "react";
import CardItem from "./components/CardItem";
import AddItem from "./components/AddItem";
import BottomNav from "./components/BottomNav";
import Alert from "./components/Alert";
import UpdateItem from "./components/UpdateItem";
import UseContext from "./components/context/UseContext";
import ScrollToTop from "./components/ScrollToTop";
// import { useRef } from "react";

function App() {

  // Scroll To Top on Roucter Change
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  let title = "Code-Journal";
  let APIKEY = "3dc8oe7h79s7p";

  const [progress, setProgress] = useState(20);
  const [alert, setAlert] = useState(null); //  Alert
  const LangOption = [
    "--select language",
    "javascript",
    "python",
    "java",
    "c++",
  ];
  // To set language
  const [selected, setSelected] = useState(LangOption[0]);
  // Function to set Alert
  const closeAlert = () => {
    setAlert(null);
  };
  const alertTodo = (msg, status) => {
    setAlert({
      msg: msg,
      stauts: status,
    });
    setTimeout(() => {
      closeAlert();
    }, 3100);
  };
  return (
    <UseContext.Provider
      value={{ progress, setProgress, selected, setSelected, LangOption }}
    >
      <Navbar title={title} />
      {/* Top Loading Bar */}
      <LoadingBar
        // ref={progress}
        color="#f11946"
        height={3.4}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Heading title={title} />
      <Alert alert={alert} closeAlert={closeAlert} />
      <Routes>
        <Route
          path="/"
          element={
            <CardItem APIKEY={APIKEY} title={title} alertTodo={alertTodo} />
          }
        />
        <Route
          path="/add"
          element={
            <AddItem APIKEY={APIKEY} title={title} alertTodo={alertTodo} />
          }
        />
        <Route
          path="/update"
          element={
            <UpdateItem APIKEY={APIKEY} title={title} alertTodo={alertTodo} />
          }
        />
      </Routes>

      <ScrollToTop />
      <BottomNav />
    </UseContext.Provider>
  );
}

export default App;
