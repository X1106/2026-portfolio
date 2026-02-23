// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? "";

  // ✅ どっちか入ってないと絶対に token は取れない
  if (!secret) {
    console.error("[mw] Missing secret (AUTH_SECRET/NEXTAUTH_SECRET)");
    return NextResponse.next();
  }

  const token = await getToken({ req, secret });

  const { pathname } = req.nextUrl;
  const isLoggedIn = !!token;

  console.log("[mw]", {
    pathname,
    isLoggedIn,
    hasToken: !!token,
  });

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
