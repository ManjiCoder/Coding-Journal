import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          src="https://kit.fontawesome.com/542ea4d2cd.js"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </body>
    </Html>
  );
}
