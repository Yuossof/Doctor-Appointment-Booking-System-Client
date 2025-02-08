import { NextRequest, NextResponse } from "next/server";
import { GetUser } from "./components/GetUser/GetUser";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest){
    const user = await GetUser();
    const cookie = await cookies();
    const { pathname, searchParams } = request.nextUrl;
    const emailParams = searchParams.get('email');
    const emailCookie = cookie.get('email')
    const verify = cookie.get('verify');

    if(!user && pathname.startsWith('/verify')){
        const response = NextResponse.redirect(new URL('/', request.nextUrl));
        cookie.set('message', 'You are not authorized to visit this route.');
        return response;
    } 

    if(user && user.email_verified_at == null && verify && pathname.startsWith('/verify')){
        return NextResponse.next();
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
