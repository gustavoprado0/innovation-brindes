import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies
  const authStorage = request.cookies.get('auth-storage')?.value;
  let token: string | null = null;

  if (authStorage) {
    try {
      const parsed = JSON.parse(decodeURIComponent(authStorage));
      token = parsed?.state?.token ?? null;
    } catch {
      token = null;
    }
  }

  const isAuthPage = pathname === '/login';
  const isProtectedPage = pathname.startsWith('/products');

  // If not logged in and trying to access protected page → redirect to login
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If logged in and trying to access login page → redirect to products
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/products', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/products/:path*'],
};