import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  // const token = request.cookies.get("token")?.value;
  const token = localStorage.getItem("token");

  console.log("PATH:", request.nextUrl.pathname, "TOKEN:", !!token);

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/leads/:path*",
    "/profile/:path*",
    "/business/:path*",
    "/agents/:path*",
    "/setup-business",
  ],
};
