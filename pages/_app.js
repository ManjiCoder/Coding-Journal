import "@/styles/globals.css";
import store, { persistor } from "../store";
import Navbar from "@/components/Navbar";
import Toast from "@/components/Toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navbar />
        <Component {...pageProps} />
        <Toast />
      </PersistGate>
    </Provider>
  );
}
