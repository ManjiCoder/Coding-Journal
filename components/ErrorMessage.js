import React from "react";

export default function ErrorMessage({ error }) {
  if (!error) return null;
  return (
    <p className="text-right px-3 text-red-500 my-1.5 font-semibold text-xs">
      {error}
    </p>
  );
}
