import "./globals.css";
import { Inter } from "next/font/google";
import NoteState from "@/context/notes/NoteState";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import AuthProvider from "@/components/AuthProvider";
import Script from "next/script";

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
        <AuthProvider>
          <NoteState>
            <Navbar />
            {children}
            <Footer />
          </NoteState>
        </AuthProvider>
      </body>
    </html>
  );
}
