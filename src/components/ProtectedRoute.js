"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  if (!localStorage.getItem("token")) {
    return <div>{children}</div>;
  }

  return router.push("/");
};

export default ProtectedRoute;
