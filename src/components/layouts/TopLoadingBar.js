"use client";
import React, { useContext } from "react";
import LoadingBar from "react-top-loading-bar";
import NoteContext from "@/context/notes/NoteContext";

const TopLoadingBar = () => {
  const { progress, setProgress } = useContext(NoteContext);
  return (
    <LoadingBar
      color="#f11946"
      progress={progress}
      height={2.5}
      onLoaderFinished={() => setProgress(0)}
    />
  );
};

export default TopLoadingBar;
