// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? "";

  // ✅ secret が無いと復号できない
  if (!secret) {
    console.error("[mw] Missing secret (AUTH_SECRET/NEXTAUTH_SECRET)");
    return NextResponse.next();
  }

  // ✅ Auth.js(v5) は cookie 名が authjs.* になることがある
  //   Vercel/HTTPS だと __Secure- プレフィックスが付くことも多い
  const token =
    (await getToken({
      req,
      secret,
      cookieName: "__Secure-authjs.session-token",
    })) ??
    (await getToken({
      req,
      secret,
      cookieName: "authjs.session-token",
    })) ??
    // ✅ 念のため v4系もフォールバック（移行/混在対策）
    (await getToken({
      req,
      secret,
      cookieName: "__Secure-next-auth.session-token",
    })) ??
    (await getToken({
      req,
      secret,
      cookieName: "next-auth.session-token",
    })) ??
    // ✅ 最後にデフォルト推測も試す（環境依存の差を吸収）
    (await getToken({ req, secret }));

  const { pathname } = req.nextUrl;
  const isLoggedIn = !!token;

  console.log("[mw]", {
    pathname,
    isLoggedIn,
    hasToken: !!token,
  });

  // 未ログインでトップはログインへ
  if (!isLoggedIn && pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ログイン済みで /login はトップへ
  if (isLoggedIn && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};
