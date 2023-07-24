import { serialize } from "cookie";

// pages/api/hello.ts
export default function handler(req, res) {
  const cookie = serialize("hello-cookie", "api-hello-cookie-value", {
    httpOnly: true,
    path: "/",
    // expires: new Date(new Date().getTime() + 10000), // for logout
  });
  res.setHeader("Set-Cookie", cookie);
  console.log(res.req.cookies);
  res.status(200).json({ message: "Successfully set cookie!" });
}
