export const config = {
  matcher: [
    '/main.html',
    '/dashboard.html',
    '/search.html',
  ],
};

export default function middleware(request) {
  const authCookie = request.cookies.get('auth');

  if (!authCookie) {
    return Response.redirect(
      new URL('/login.html', request.url),
      302
    );
  }

  return Response.next();
}
