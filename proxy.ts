import { NextResponse, NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the token from cookies
  const token = request.cookies.get("token")?.value;

  // Pages related to authentication
  const isAuthPage = pathname === "/login" || pathname === "/register";

  // Pages that require the user to be logged in
  const isProtectedPage =
    pathname === "/profile" || pathname.startsWith("/admin");

  // Redirect non-authenticated users trying to access protected pages
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect authenticated users away from login/register pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/profile", "/admin/:path*"],
};
