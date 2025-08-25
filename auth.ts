// auth.ts - Fixed configuration
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

// Helper function to ensure profile exists
async function ensureProfileExists(userId: string, userEmail: string) {
  try {
    const existingProfile = await prisma.profile.findUnique({
      where: { userId }
    });

    if (!existingProfile) {
      
      const profile = await prisma.profile.create({
        data: {
          userId,
          headline: "",
          bio: "",
        },
      });
      
      return profile;
    } else {
      return existingProfile;
    }
  } catch (error) {
    throw error;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "johndoe@gmail.com" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials) {
    
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          console.log("👤 User found:", { 
            userId: user?.id,
            email: user?.email,
            hasPassword: !!user?.password 
          });

          if (!user || !user.password) {
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password as string, user.password);

          if (!isValid) {
            return null;
          }

          const returnUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };

          return returnUser;
        } catch (error) {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  
  // Use JWT sessions for middleware compatibility
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  adapter: PrismaAdapter(prisma),
  
  callbacks: {
    async signIn({ user, account, profile }) {

      // Don't create profile here - let the createUser event handle it
      // Just return true to allow sign-in
      return true;
    },

    // JWT callback with better user ID handling
    async jwt({ token, user, account, profile, trigger }) {
 
      
      // During initial sign in, user object will be available
      if (user) {
        token.id = user.id;
        token.userId = user.id; // Add backup field
      }
      
      // Ensure we always have a user ID in the token
      if (!token.id && token.sub) {
        token.id = token.sub;
      }
      
      return token;
    },

    async session({ session, token }) {

      
      if (session.user && token) {
        // Try multiple fallbacks for user ID
        const userId = token.id || token.userId || token.sub;
        session.user.id = userId as string;
      }
      return session;
    },

    // Fixed redirect callback
    async redirect({ url, baseUrl }) {
      
      // If the URL is trying to redirect to auth pages, redirect to tools instead
      if (url.includes('/signin') || url.includes('/signup') || url.includes('/auth')) {
        return `${baseUrl}/tools`;
      }
      
      // Handle relative URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      
      // Handle same-origin URLs
      if (new URL(url).origin === baseUrl) {
        return url;
      }
      
      // Default to tools for external URLs
      return `${baseUrl}/tools`;
    },
  },
  
  events: {
    async createUser({ user }) {
      
      try {
        await ensureProfileExists(user.id, user.email!);
      } catch (error) {
        console.error("❌ Error in createUser event:", error);
      }
    },
  },
  
  pages: {
    signIn: "/signin",
    error: "/auth/error",
  },
  
  debug: process.env.NODE_ENV === "development",
  secret: process.env.AUTH_SECRET,
});