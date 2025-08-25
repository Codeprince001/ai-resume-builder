import { NextResponse, NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import { auth } from "@/auth"

const protectedRoutes = ["/tools", "/profile", "/settings"]
const authPages = ["/signin", "/signup", "/forgot-password"]

export async function middleware(req: NextRequest) {
  const { nextUrl } = req
  const pathname = nextUrl.pathname
  const isRoot = nextUrl.pathname === "/"
  
  // Get the JWT token instead of using auth() to avoid Prisma in Edge Runtime
  const token = await getToken({ 
    req, 
    secret: process.env.AUTH_SECRET 
  })
  
  const isAuthenticated = !!token
  

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )
  const isAuthPage = authPages.some((route) => pathname.startsWith(route))

  if (isAuthenticated && isRoot) {
    // Signed in → always land on tools
    return NextResponse.redirect(new URL("/tools", req.url))
  }

  // If user is not signed in and is trying to access a protected page
  if (!isAuthenticated && isProtected) {
    return NextResponse.redirect(new URL("/signin", req.url))
  }

  // If user is signed in and is trying to access an auth page
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/tools", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Exclude API routes, static files, and NextAuth internal routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}