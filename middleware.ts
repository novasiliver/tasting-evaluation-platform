import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard')

  // Redirect to sign in if not authenticated
  if ((isAdminRoute || isDashboardRoute) && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  // Check if user has admin role for admin routes
  if (isAdminRoute && token?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/auth/signin?error=unauthorized', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}

