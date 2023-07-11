import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const isValidUser = async (req) => {
  const token = req.headers.get("auth-token");
  if (!token) {
    return false;
  }
  try {
    const { userId } = await verify(token, process.env.JWT_PRIVATE_KEY);
    console.log(userId);
    return userId;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export async function verify(token, secret) {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  // console.log(payload);
  // run some checks on the returned payload, perhaps you expect some specific values

  // if its all good, return it, or perhaps just return a boolean
  return payload;
}

export default async function middleware(request) {
  // console.log(request.nextUrl.pathname);
  if (
    request.nextUrl.pathname === "/api/auth/forgot" ||
    "/api/friends/add" ||
    "/api/friends/remove"
  ) {
    // console.log(await isValidUser(request));
    const result = await isValidUser(request);
    // console.log(result);
    if (result !== false) {
      const response = NextResponse.next({
        headers: new Headers(request.headers),
      });
      response.headers.set("userId", JSON.stringify(result));
      return response;
    } else {
      return NextResponse.json(
        { message: "Please authenticate using valid token" },
        { status: 401 }
      );
    }
  }
  return NextResponse.json(
    { message: "Internal server error" },
    { status: 500 }
  );
}

export const config = {
  matcher: ["/api/auth/forgot", "/api/friends/add", "/api/friends/remove"],
};
