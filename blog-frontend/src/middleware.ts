import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { hasCookie } from 'cookies-next'
import { cookies } from 'next/headers'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  if (
    (req.nextUrl.pathname.startsWith('/login') ||
      req.nextUrl.pathname.startsWith('/register')) &&
    hasCookie('clientToken', { cookies })
  ) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  return res
}

export const config = {
  matcher: '/:path*'
}
