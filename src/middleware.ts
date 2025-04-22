import { NextRequest, NextResponse } from "next/server";
import { GetUser } from "./lib/services/auth/GetUser";
import { cookies } from "next/headers";
import { IUser } from "./types/UserInformation";

export async function middleware(request: NextRequest) {
    const user: IUser = await GetUser();
    const cookie = await cookies();
    const { pathname, searchParams } = request.nextUrl;
    const emailParams = searchParams.get('email');
    const emailCookie = cookie.get('email');

    const pathSegments = pathname.split('/');  
    const userId = pathSegments[pathSegments.length - 1];  

    const doctorRoutes = [
        '/admin',
        '/admin/doctors',
        '/admin/users',
        '/profile',
        '/register',
        '/login',
        '/forgetPassword',
        '/verify'
    ];

    const userRoutes = [
        '/admin',
        '/admin/doctors',
        '/admin/users',
        '/doctor-dashboard',
        '/doctor-dashboard/profile',
        '/doctor-dashboard/all-reservations',
        '/doctor-dashboard/availability',
        '/doctor-dashboard/users-table',
        `/doctor-dashboard/users-table/report/${userId}`,
        '/register',
        '/login',
        '/forgetPassword',
        '/verify'
    ]

    const adminRoutes = [
        '/doctor-dashboard',
        '/doctor-dashboard/profile',
        '/doctor-dashboard/all-reservations',
        '/doctor-dashboard/availability',
        '/doctor-dashboard/users-table',
        `/doctor-dashboard/users-table/report/${userId}`,
        '/profile',
        '/register',
        '/login',
        '/forgetPassword',
        '/verify'
    ];

    const allowed = [
        '/verify',
        '/login',
        '/register',
        '/',
        '/forgetPassword'
    ]
        
    if (user && user?.role === 'doctor' && pathname.startsWith('/doctor-dashboard/profile')) {
        return NextResponse.next();
    } else if (user && user?.role === 'doctor' && !user.clinic_address && !pathname.startsWith('/doctor-dashboard/profile')) {
        return NextResponse.redirect(new URL('/doctor-dashboard/profile', request.url))
    }

    if (user && user.role === 'doctor' && user.clinic_address && doctorRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    } else if (user && user.role === 'user' && user.email_verified_at && userRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    } 
    
    if (user && user?.role === 'admin' && pathname.startsWith('/admin')){
        return NextResponse.next();
    }
    else if (user && user.role === 'admin' && user.email_verified_at && adminRoutes.includes(pathname)){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if (!user && !allowed.includes(pathname)) {
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

    if (!user && pathname.startsWith('/forgetPassword')) {
        if (!emailParams || emailParams != emailCookie?.value) {
            return NextResponse.redirect(new URL('/', request.nextUrl));
        }
    }

    if (!user && pathname.startsWith('/contact')) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/verify',
        '/login',
        '/register',
        '/forgetPassword',
        '/contact',
        '/profile',
        '/profile/reports',
        '/my-appointments',
        '/doctor-dashboard/:path*',
        '/admin/:path*'
    ]
}
