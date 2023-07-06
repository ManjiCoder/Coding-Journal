"use client";
import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";

function AuthProvider({ children }) {
  return <UserProvider>{children}</UserProvider>;
}

export default AuthProvider;
