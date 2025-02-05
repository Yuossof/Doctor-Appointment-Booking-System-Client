import { NextRequest, NextResponse } from "next/server";
import { GetUser } from "./components/GetUser/GetUser";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest){
    const user = await GetUser();
    const cookie = await cookies();
    const { pathname, searchParams } = request.nextUrl;
    const fromLogin = searchParams.get("from") === "login";
    const emailParams = searchParams.get('email');
    const emailCookie = cookie.get('email')
    // console.log(forgetPassword);

    if(!user && pathname.startsWith('/verify')){
        const response = NextResponse.redirect(new URL('/', request.nextUrl));
        cookie.set('message', 'You are not authorized to visit this route.');
        return response;
    } 
    
    if(user && user.email_verified_at == null && pathname.startsWith('/verify') && !fromLogin){
        const response = NextResponse.redirect(new URL('/', request.nextUrl));
        cookie.set('message', 'You are not authorized to visit this route.');
        return response;
    }else if(user && user.email_verified_at == null && pathname.startsWith('/verify') && fromLogin){
        const response =  NextResponse.next();
        cookie.set('message', 'You must verify your email.');
        return response;
    }

    if(!emailParams || emailParams !== emailCookie?.value && pathname.startsWith('/forgetPassword')){
        const response = NextResponse.redirect(new URL('/', request.nextUrl));
        cookie.set('message', 'You are not authorized to visit this route.');
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher : ['/verify', '/forgetPassword']
}