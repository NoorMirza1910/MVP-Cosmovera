import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if user is authenticated
  const isAuthenticated = request.cookies.get('auth_token') // You'll need to set this cookie when user signs in

  // If trying to access profile page and not authenticated
  if (request.nextUrl.pathname.startsWith('/profile') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/profile/:path*',
} 