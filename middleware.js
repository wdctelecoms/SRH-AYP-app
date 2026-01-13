export const config = {
  matcher: [
    '/main.html',
    '/dashboard.html',
    '/search.html',
  ],
};

export default function middleware(request) {
  const authCookie = request.cookies.get('auth');

  // If NOT logged in → redirect
  if (!authCookie) {
    return Response.redirect(
      new URL('/login.html', request.url),
      302
    );
  }

  // ✅ IMPORTANT: DO NOTHING if logged in
  // (do NOT return Response.next)
}
