import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UpdateForm from "@/components/UpdateForm";
const Update = () => {
  const isToken = cookies().get("token");
  if (!isToken) {
    return redirect("/");
  }
  return <UpdateForm />;
};

export default Update;
