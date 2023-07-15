"use client";
import React, { useState } from "react";
import NoteContext from "./NoteContext";

function NoteState(props) {
  const title = "Coding Journal";
  const LangOption = [
    "--select language",
    "javascript",
    "python",
    "java",
    "c++",
  ];
  const [showToast, setShowToast] = useState(false);
  const [progress, setProgress] = useState(20);
  const [alert, setAlert] = useState(null); //  Alert
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
    <NoteContext.Provider
      value={{
        title,
        progress,
        setProgress,
        selected,
        setSelected,
        LangOption,
        alertTodo,
        showToast,
        setShowToast,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
