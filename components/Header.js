// SEO IMP Component
import Head from "next/head";
import React from "react";

export default function Header({ title, description }) {
  return (
    <Head>
      {title ? <title>{title}</title> : <title>Coding Journal </title>}

      {!description ? (
        <meta
          name="description"
          content="Coding Journal for Coders made by a Coder!"
        />
      ) : (
        <meta name="description" content={description} />
      )}
      <meta
        name="keywords"
        content="Next.Js, React.Js, Coding-Journal, Redux"
      />
      <meta name="authur" content="Manji coder" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
}

