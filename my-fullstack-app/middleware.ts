// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET, // ✅ 必須
  });

  const { pathname } = req.nextUrl;
  const isLoggedIn = !!token;

  if (!isLoggedIn && pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};
