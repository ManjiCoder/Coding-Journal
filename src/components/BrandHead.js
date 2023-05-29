import Link from "next/link";

function BrandHead() {
  return (
    <Link
      className="font-bold text-white"
      style={{ textShadow: "1px 1px pink" }}
      href="/"
    >
      Coding-
      <span
        className="font-bold text-[gold]"
        style={{ textShadow: "0.4px 0.4px white" }}
      >
        Journal
      </span>
    </Link>
  );
}

export default BrandHead;
