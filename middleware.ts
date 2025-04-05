import { type NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const url = req.nextUrl
  const hostname = req.headers.get("host") || ""
  const path = url.pathname

  // Skip middleware for API routes during development
  if (path.startsWith("/api/") && process.env.NODE_ENV === "development") {
    return NextResponse.next()
  }

  // Check if it's a subdomain
  const subdomain = getSubdomain(hostname)

  // Handle admin routes protection
  if (path.startsWith("/admin")) {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!session) {
      console.log("No session found, redirecting to login")
      return NextResponse.redirect(new URL("/login", req.url))
    }

    console.log("Session found for admin route:", {
      email: session.email,
      schoolId: session.schoolId,
    })

    // If we have a subdomain, verify the user belongs to this school
    if (subdomain) {
      // This would be implemented with proper school-user relationship check
      // For now, we'll just allow access
    }

    return NextResponse.next()
  }

  // Handle subdomain routing
  if (subdomain) {
    console.log(`Subdomain detected: ${subdomain}, rewriting to /schools/${subdomain}${path}`)
    // Rewrite to /schools/[subdomain]/page
    return NextResponse.rewrite(new URL(`/schools/${subdomain}${path}`, req.url))
  }

  return NextResponse.next()
}

// Helper function to get subdomain
function getSubdomain(hostname: string): string | null {
  console.log("Checking hostname:", hostname)

  // For local development with .localhost domains
  if (hostname.includes(".localhost:")) {
    const subdomain = hostname.split(".localhost:")[0]
    if (subdomain !== "localhost" && subdomain !== "www") {
      return subdomain
    }
  }

  // For production with actual domains
  const parts = hostname.split(".")
  if (parts.length > 2) {
    const subdomain = parts[0]
    if (subdomain !== "www") {
      return subdomain
    }
  }

  return null
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}

