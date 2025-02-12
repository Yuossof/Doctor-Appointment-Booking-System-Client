'use server'
import { NextRequest, NextResponse } from "next/server";
import { GetUser } from "./components/GetUser/GetUser";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest){
    const user = await GetUser();
    const cookie = await cookies();
    const { pathname, searchParams } = request.nextUrl;
    const emailParams = searchParams.get('email');
    const emailCookie = cookie.get('email');

    if(!user && pathname.startsWith('/verify')){
        return NextResponse.redirect(new URL('/', request.nextUrl));
    } 

    if(user && user.email_verified_at == null && pathname.startsWith('/verify')){
        return NextResponse.next();
    }

    if(!emailParams || emailParams != emailCookie?.value && pathname.startsWith('/forgetPassword')){
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher : ['/verify','/forgetPassword']
}
