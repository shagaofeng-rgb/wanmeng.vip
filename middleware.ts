import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * The upstream publishing platform validates a "domain" by POSTing directly
 * to `/`. Keep the public homepage on GET while routing root POST requests to
 * the canonical article webhook.
 */
export function middleware(request: NextRequest) {
  if (request.method === 'POST') {
    return NextResponse.rewrite(new URL('/api/webhook/send_article', request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: '/' };
