import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl
  const token = request.cookies.get('turismo_token')?.value

  if (pathname.startsWith('/municipios') ||
      pathname.startsWith('/turismo-experiencia') ||
      pathname.startsWith('/sabores-culturas') ||
      pathname.startsWith('/eventos') ||
      pathname.startsWith('/newsletters') ||
      pathname.startsWith('/usuarios'))   {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    return NextResponse.next()
  }

  if (pathname === '/auth/login') {
    if (token) {
      return NextResponse.redirect(new URL('/municipios', request.url))
    }
    return NextResponse.next()
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/municipios',
    '/turismo-experiencia',
    '/sabores-culturas',
    '/eventos',
    '/newsletters',
    '/usuarios',
    '/auth/login',
  ],
}