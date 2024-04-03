import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const response = NextResponse.next()
    const path = request.nextUrl.pathname
    const isPublicPath = path === "/user/login" || path ==="/user/signup" || path === "/user/verifyemail"
    const token =  cookies().get('token')
    console.log("token",token);
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/user/profile', request.url))
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/user/login', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:['/user/login','/user/signup','/user/profile','/user/verifyemail'],
}