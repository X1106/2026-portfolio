// src/lib/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        remember: { label: "Remember", type: "checkbox" },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const username = String(credentials.username ?? "");
        const password = String(credentials.password ?? "");

        // サーバー側バリデーション
        if (username.length < 3 || password.length < 4) {
          return null;
        }

        // ✅ 固定ユーザー認証
        if (username !== "test" || password !== "00000") {
          return null;
        }

        return {
          id: "1",
          name: "test",
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
