import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|og-image|_next/|images|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. www.bolselkab.go.id, kominfo.localhost:4200)
  const hostname = req.headers
    .get('host')
    ?.replace('.localhost:4200', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // Get the pathname of the request (e.g. /, /berita, /dokumen/id)
  const path = url.pathname;

  if (
    hostname === 'localhost:4200' ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    // rewrite ke www site
    return NextResponse.rewrite(new URL(`/www${path}`, req.url));
  }

  // rewrite ke websites site `/[domain]/[path] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
