import { NextResponse } from "next/server"
import { auth } from "@/auth"

export default auth((req) => {
  const { nextUrl } = req
  const isAuthPage = nextUrl.pathname.startsWith("/signin")

  // if (!req.auth && !isAuthPage) {
  //   // Not signed in, trying to access protected page
  //   return NextResponse.redirect(new URL("/signin", req.url))
  // }

  // if (req.auth && isAuthPage) {
  //   // Signed in, but trying to access /signin
  //   return NextResponse.redirect(new URL("/dashboard", req.url))
  // }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/signin",
  ],
}
