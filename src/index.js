import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools"; /* FOR DEV */

// Create a client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ErrorBoundary>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-1320wqpts1u13uah.us.auth0.com"
        clientId="WlwjEkLD8RtM0uHgLq1QvmY8LZCqjeA9"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <App />
          {/* FOR DEV */}
          {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
      </Auth0Provider>
    </BrowserRouter>
  </ErrorBoundary>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
