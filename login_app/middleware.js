import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === "/user/login" || path ==="/user/signup" || path === "/user/verifyemail"
    const token = request.cookies.get("token")?.value || ""

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/user/profile', request.url))
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/user/login', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:['/','/user/login','/user/signup','/user/profile','/user/verifyemail'],
}
