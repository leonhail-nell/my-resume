import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const adminUsername = process.env.ADMIN_GITHUB_USERNAME?.toLowerCase();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!adminUsername) {
        console.error("ADMIN_GITHUB_USERNAME is not set; rejecting sign-in.");
        return false;
      }
      const login = (profile?.login as string | undefined)?.toLowerCase();
      return login === adminUsername;
    },
    async session({ session, token }) {
      if (token?.login) {
        (session as unknown as { login?: string }).login = token.login as string;
      }
      return session;
    },
    async jwt({ token, profile }) {
      if (profile?.login) {
        token.login = profile.login;
      }
      return token;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
});
