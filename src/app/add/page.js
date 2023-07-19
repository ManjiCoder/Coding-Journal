import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SolutionForm from "@/components/layouts/SolutionForm";
const Add = () => {
  const isToken = cookies().get("token");
  if (!isToken) {
    return redirect("/");
  }
  return <SolutionForm />;
};

export default Add;
