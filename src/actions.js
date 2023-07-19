"use server";

export const login = async (email, password) => {
  console.log({ email, password });

  try {
    let response = await fetch(`${process.env.BASE_URL}api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    // if (response.ok) {
    //   return redirect("/");
    // }
    console.log({ data });
  } catch (error) {
    console.log({ error });
  }
};
