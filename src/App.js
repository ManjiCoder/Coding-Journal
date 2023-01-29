import { Routes, Route } from "react-router-dom";
import Heading from "./components/Heading";
import Navbar from "./components/Navbar";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";
import CardItem from "./components/CardItem";
import AddItem from "./components/AddItem";
import BottomNav from "./components/BottomNav";
import Alert from "./components/Alert";
import UpdateItem from "./components/UpdateItem";
import UseContext from "./components/context/UseContext";
import { useRef } from "react";

function App() {
  let title = "Code-Journal";
  let APIKEY = "3dc8oe7h79s7p";
  // const progress = useRef(null);
  // console.log(progress.current);
  const [progress, setProgress] = useState(20);
  const [alert, setAlert] = useState(null); //  Alert

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
    <UseContext.Provider value={{progress,setProgress}}>
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
      <BottomNav />
    </UseContext.Provider>
  );
}

export default App;
