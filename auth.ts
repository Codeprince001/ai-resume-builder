// auth.ts - More reliable approach for profile creation
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
      console.log("📝 Creating profile for user:", userId);
      
      const profile = await prisma.profile.create({
        data: {
          userId,
          headline: "",
          bio: "",
        },
      });
      
      console.log("✅ Profile created successfully:", profile.id);
      return profile;
    } else {
      console.log("👤 Profile already exists for user:", userId);
      return existingProfile;
    }
  } catch (error) {
    console.error("❌ Profile creation error:", error);
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
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (!user || !user.password) return null;

          const isValid = await bcrypt.compare(credentials.password as string, user.password);
          if (!isValid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  adapter: PrismaAdapter(prisma),
  
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("🚀 SignIn callback:", { 
        userId: user.id,
        email: user.email,
        provider: account?.provider
      });

      try {
        // Always ensure profile exists on every sign-in
        await ensureProfileExists(user.id!, user.email!);
        return true;
      } catch (error) {
        console.error("❌ SignIn callback error:", error);
        // You can choose to return false here to prevent sign-in if profile creation fails
        return true;
      }
    },

    async session({ session, user }) {
      console.log("📋 Session callback:", {
        sessionUserId: session.user?.id,
        dbUserId: user?.id
      });
      
      if (session.user && user) {
        session.user.id = user.id;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  
  events: {
    // This event fires when a new user is created
    async createUser({ user }) {
      console.log("🆕 New user created event:", user.id, user.email);
      
      try {
        // Create profile immediately when user is created
        await ensureProfileExists(user.id, user.email!);
      } catch (error) {
        console.error("❌ Error in createUser event:", error);
      }
    },
    
    async signIn({ user, account, profile, isNewUser }) {
      console.log("🔐 SignIn event:", {
        userId: user.id,
        provider: account?.provider,
        isNewUser
      });
    },

    async session({ session, token }) {
      console.log("📋 Session event:", {
        userId: session.user?.id || token.id
      });
    },
  },
  
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  
  debug: process.env.NODE_ENV === "development",
  secret: process.env.AUTH_SECRET,
});