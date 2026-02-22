// src/lib/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "@/lib/db";

export const { auth, handlers } = NextAuth({
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
        if (!credentials) return null;

        const username = String(credentials.username);
        const password = String(credentials.password);

        // ✅ サーバー側バリデーション
        if (username.length < 3 || password.length < 4) {
          return null;
        }

        // ✅ DB参照
        const user = db
          .prepare("SELECT * FROM users WHERE username = ?")
          .get(username);

        if (!user) return null;
        if (user.password !== password) return null; // 学習用（本番はハッシュ）

        return {
          id: String(user.id),
          name: user.username,
          remember:
            credentials.remember === true || credentials.remember === "true",
        };
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
