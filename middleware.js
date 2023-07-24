import { NextResponse } from "next/server";
import { verify } from "./utils/server-utils";

export async function middleware(req) {
  // const { pathname } = req.nextUrl;

  try {
    const token = req.headers.get("auth-token");

    const { userId } = await verify(token, process.env.JWT_PRIVATE_KEY);
    // console.log(userId.id);
    const response = NextResponse.next();
    response.headers.set("user-id", userId.id);
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Please authenticate using valid token" },
      { status: 401 }
    );
  }
}

// "Matching Paths"
export const config = {
  matcher: [
    "/api/solutions/getall",
    "/api/solutions/add",
    "/api/solutions/update",
    "/api/solutions/remove",
  ],
};
