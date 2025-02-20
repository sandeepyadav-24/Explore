import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

// Add these type declarations
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      token?: string;
      email?: string;
      name?: string;
      image?: string;
    };
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Used for JWT encryption
  session: {
    strategy: "jwt", // Use JWT tokens for authentication
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.userId = token.sub; // Google's unique user ID
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.token = token.accessToken as string;

        // Set cookie using Response API
        const response = new Response();
        response.headers.set(
          "Set-Cookie",
          `auth-token=${token.accessToken}; HttpOnly; Path=/; SameSite=Lax${
            process.env.NODE_ENV === "production" ? "; Secure" : ""
          }`
        );
      }
      return session;
    },
  },
});

export const GET = handler;
export const POST = handler;
