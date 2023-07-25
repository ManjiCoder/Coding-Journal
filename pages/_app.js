import "@/styles/globals.css";
import store, { persistor } from "../store";
import Navbar from "@/components/Navbar";
import Toast from "@/components/Toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Start showing the loading indicator when navigating to a new route
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    // Clean up the event listeners on unmount
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navbar />
        {isLoading ? <Loading /> : null}
        <Component {...pageProps} />
        <Toast />
      </PersistGate>
    </Provider>
  );
}
