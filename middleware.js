import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect these pages
  const protectedPages = [
    '/main.html',
    '/dashboard.html',
    '/search.html'
  ];

  const isProtected = protectedPages.includes(pathname);

  // Read auth cookie
  const authCookie = request.cookies.get('auth');

  if (isProtected && !authCookie) {
    return NextResponse.redirect(
      new URL('/login.html', request.url)
    );
  }

  return NextResponse.next();
}
