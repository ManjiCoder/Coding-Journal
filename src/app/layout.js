import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import NoteState from "@/context/notes/NoteState";

import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import TopLoadingBar from "@/components/layouts/TopLoadingBar";
import Toast from "@/components/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Coding Journal",
  description: "Coding Journal is a webapp build for coders by the coders",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        src="https://kit.fontawesome.com/542ea4d2cd.js"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      <body className={inter.className}>
        <NoteState>
          <TopLoadingBar />
          <Navbar />
          <Toast />
          {children}
          <Footer />
        </NoteState>
      </body>
    </html>
  );
}
