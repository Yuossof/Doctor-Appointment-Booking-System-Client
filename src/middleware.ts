import { NextRequest, NextResponse } from "next/server";
import { GetUser } from "./lib/services/auth/GetUser";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
    const user = await GetUser();
    const cookie = await cookies();
    const { pathname, searchParams } = request.nextUrl;
    const emailParams = searchParams.get('email');
    const emailCookie = cookie.get('email');
    
    if (user && user?.role === 'doctor' && !user.clinic_address && pathname.startsWith('/doctor-dashboard/profile')){
        return NextResponse.next();
    }
    
    if (user && user?.role === 'doctor' && !user.clinic_address && !pathname.startsWith('/doctor-dashboard/profile')){
        console.log('annnnnnna')
        return NextResponse.redirect(new URL('/doctor-dashboard/profile', request.url))
    }
    
    if (!user && pathname.startsWith('/verify')) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
    
    if (user && user.email_verified_at && (pathname.startsWith('/contact') ||
    pathname.startsWith('/profile') || pathname.startsWith('/profile/reports') ||
        pathname.startsWith('/my-appointments')
    )) {
        return NextResponse.next();
    }
    
    if (user && user.email_verified_at == null && pathname.startsWith('/verify')) {
        return NextResponse.next();
    }

    if (!emailParams || emailParams != emailCookie?.value && pathname.startsWith('/forgetPassword')) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher:  [
        '/verify',
        '/forgetPassword',
        '/contact',
        '/profile',
        '/profile/reports',
        '/my-appointments',
        '/doctor-dashboard/profile',
        '/doctor-dashboard/:path*' 
    ]
}
