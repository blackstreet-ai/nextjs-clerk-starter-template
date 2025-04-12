import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default clerkMiddleware((auth, req) => {
  // Check if the route is public
  const publicRoutes = ["/", "/api/webhook", "/login", "/signup", "/sso-callback", "/verify-email"];
  const isPublic = publicRoutes.some(route => req.nextUrl.pathname.startsWith(route));
  
  // If the route is public or the user is authenticated, allow access
  if (isPublic) {
    return NextResponse.next();
  }
  
  // For protected routes, check authentication
  return auth().then(({ userId }) => {
    if (userId) {
      // Redirect from /dashboard to /dashboard/home
      if (req.nextUrl.pathname === "/dashboard") {
        return NextResponse.redirect(new URL("/dashboard/home", req.url));
      }
      return NextResponse.next();
    }
    
    // Redirect to login if not authenticated
    const signInUrl = new URL('/login', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  });
});

export const config = {
  // Protects all routes, including api/trpc
  // Skip middleware for static files and favicon
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
