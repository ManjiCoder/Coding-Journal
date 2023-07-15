"use client";
import NoteContext from "@/context/notes/NoteContext";
import React, { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Toast() {
  const { showToast } = useContext(NoteContext);
  console.log(showToast);
  useEffect(() => {
    if (showToast !== false) {
      toast(showToast);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (showToast === false) {
    return null;
  }
  return (
    <>
      <ToastContainer />
    </>
  );
}
export default Toast;
