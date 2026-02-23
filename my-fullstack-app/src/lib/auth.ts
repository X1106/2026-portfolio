// src/lib/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "@/lib/db";

export const { auth, handlers } = NextAuth({
  debug: true, // ✅ 追加（重要）

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

          // サーバー側バリデーション
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
          throw err; // ← これが server configuration error の正体を出す
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.remember = (user as any).remember;
      }
      return token;
    },

    async session({ session, token }) {
      (session as any).remember = token.remember;
      return session;
    },
  },
});
