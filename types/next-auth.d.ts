import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // attach the user ID from Auth.js
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
  }
}
