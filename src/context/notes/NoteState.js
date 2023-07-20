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
  const [user, setUser] = useState({
    isAuthenticated: false,
    user: {},
  });
  // To set language
  const [selected, setSelected] = useState(LangOption[0]);

  return (
    <NoteContext.Provider
      value={{
        title,
        progress,
        setProgress,
        selected,
        setSelected,
        LangOption,
        showToast,
        setShowToast,
        user,
        setUser,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
