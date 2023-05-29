"use client";
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

function AuthProvider({ children }) {
  return (
    <Auth0Provider
      domain="dev-1320wqpts1u13uah.us.auth0.com"
      clientId="WlwjEkLD8RtM0uHgLq1QvmY8LZCqjeA9"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  );
}

export default AuthProvider;
