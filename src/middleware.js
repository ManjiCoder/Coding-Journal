import { NextResponse } from "next/server";

export default function middleware(request) {
  if ((request.nextUrl.pathname = "/api/auth/login")) {
    // return NextResponse.next();
  }
}

export const config = {
  matcher: ["/api/auth/login"],
};
