import Link from "next/link";
import cstyle from "@/styles/common.module.css";
function BrandHead() {
  return (
    <Link className={cstyle.brandTitle} href="/">
      Coding- Journal
    </Link>
  );
}

export default BrandHead;
