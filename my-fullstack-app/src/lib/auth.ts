// src/lib/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "@/lib/db";

export const { auth, handlers } = NextAuth({
  debug: true,

  // ✅ 追加：middleware と同じ秘密鍵で JWT を作る/読む
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,

  // ✅ 追加：Vercel Preview の可変ホストを信頼（これが効くことが多い）
  trustHost: true,

  logger: {
    error(code, meta) {
      console.error("[nextauth][error]", code, meta);
    },
    warn(code) {
      console.warn("[nextauth][warn]", code);
    },
    debug(code, meta) {
      console.log("[nextauth][debug]", code, meta);
    },
  },

  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
        remember: {},
      },

      async authorize(credentials) {
        console.log("[authorize] start", credentials);

        try {
          if (!credentials) {
            console.log("[authorize] no credentials");
            return null;
          }

          const username = String(credentials.username ?? "");
          const password = String(credentials.password ?? "");

          console.log("[authorize] username:", username);

          if (username.length < 3 || password.length < 4) {
            console.log("[authorize] validation failed");
            return null;
          }

          console.log("[authorize] DB query start");

          const user = db
            .prepare("SELECT * FROM users WHERE username = ?")
            .get(username);

          console.log("[authorize] DB result:", user);

          if (!user) {
            console.log("[authorize] user not found");
            return null;
          }

          if (user.password !== password) {
            console.log("[authorize] password mismatch");
            return null;
          }

          console.log("[authorize] success");

          return {
            id: String(user.id),
            name: user.username,
            remember:
              credentials.remember === true || credentials.remember === "true",
          };
        } catch (err) {
          console.error("[authorize][CRASH]", err);
          throw err;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as any).id = (user as any).id;
        token.name = (user as any).name;
        (token as any).remember = (user as any).remember;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = session.user ?? ({} as any);
      (session.user as any).id = (token as any).id;
      session.user.name = (token.name as string) ?? session.user.name;

      (session as any).remember = (token as any).remember;
      return session;
    },
  },
});
