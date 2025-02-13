import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {

    const token = req.cookies.get('token')?.value;
 
    if (!token && req.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

// Apply the middleware to protect all routes except `/login`
export const config = {
    matcher: ['/', '/map', '/profile', '/posts'],
};
