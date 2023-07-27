import Link from "next/link";
import cstyle from "@/styles/common.module.css";
function BrandHead() {
  return (
    <Link
      className={`${cstyle.brandTitle} text-xl xs:text-2xl font-bold`}
      href="/"
    >
      Coding- Journal
    </Link>
  );
}

export default BrandHead;
