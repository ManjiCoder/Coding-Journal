"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const removeCard = async (id) => {
  let headersList = {
    "auth-token": cookies().get("token").value,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    id,
  });

  let response = await fetch("http://localhost:3000/api/solutions/remove", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  revalidateTag("solutions");
  console.log(data);
};
